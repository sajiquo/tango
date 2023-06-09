import { useReducer } from "react";
import { type Reducer } from "react";
import { type Quiz } from "./query";
import { randomize } from "../../utils/array";

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

export const useQuizQueueReducer = (quizzes: readonly Quiz[]) => {
  const [state, dispatch] = useReducer(createReducer(quizzes), createInitial(quizzes));
  return {
    current: state.current,
    solvedCount: state._solved.size,
    dispatch
  }
}
