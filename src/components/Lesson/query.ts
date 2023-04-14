import { type RouterInputs, type RouterOutputs, api } from "~/utils/api";

export type Quiz = RouterOutputs["quiz"]["getAllByLesson"][number];
export type QuizInput = RouterInputs["quiz"]["getAllByLesson"];

export const useQuizzes = (input: QuizInput) =>
  api.quiz.getAllByLesson.useQuery(input);
