import { useReducer } from "react";
import { type Quiz } from "./quiz";
import { type Reducer } from "react";
import { QuizItem } from "./QuizItem";
import { randomize } from "./utils";

type Props = {
  quizzes: Quiz[];
};

type State = {
  current: Quiz | null;
  _solved: Set<Quiz>;
};

type Action = {
  type: "solved" | "flawed";
};

const createReducer = (quizzes: readonly Quiz[]): Reducer<State, Action> => {
  return (prev, action) => {
    const pick = () =>
      randomize(quizzes).find((quiz) => !prev._solved.has(quiz)) ?? null;
    if (action.type === "solved") {
      prev.current && prev._solved.add(prev.current);
    }
    console.log("set", Array.from(prev._solved));
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

export const QuizQueue = ({ quizzes }: Props) => {
  const [{ current }, dispatch] = useReducer(
    createReducer(quizzes),
    createInitial(quizzes)
  );

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