import { useReducer } from "react";
import { type Quiz } from "./quiz";
import { type Reducer } from "react";
import { QuizItem } from "./QuizItem";
import { randomize } from "./utils";

type Props = {
  quizzes: Quiz[];
};

type State = StrugglingState | AllSolvedState;

type StrugglingState = {
  current: Quiz;
} & StatePrivates;
type AllSolvedState = {
  current: null;
} & StatePrivates;
type StatePrivates = {
  _solved: Set<Quiz>;
};

type Action = {
  type: "solved" | "flawed";
};

const createReducer = (quizzes: readonly Quiz[]): Reducer<State, Action> => {
  return (prev, action) => {
    const pick = () =>
      randomize(quizzes).find((quiz) => !prev._solved.has(quiz)) ?? null;
    if (action.type === "solved" && prev.current) {
      prev._solved.add(prev.current);
    }
    return {
      ...prev,
      current: pick(),
    };
  };
};

const createInitial = (quizzes: readonly Quiz[]): State => {
  return {
    current: randomize(quizzes)[0] ?? null,
    _solved: new Set(),
  };
};

const useQuizQueueReducer = (quizzes: readonly Quiz[]) =>
  useReducer(createReducer(quizzes), createInitial(quizzes));

export const QuizQueue = ({ quizzes }: Props) => {
  const [{ current }, dispatch] = useQuizQueueReducer(quizzes);

  if (!current) {
    return (
      <>
        <div>end</div>
      </>
    );
  }

  return (
    <div>
      <p>id: {current.wordId}</p>
      <QuizItem
        quiz={current}
        onSolved={() => dispatch({ type: "solved" })}
        onFlawed={() => dispatch({ type: "flawed" })}
      />
    </div>
  );
};
