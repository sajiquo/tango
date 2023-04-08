import { type RouterOutputs, api } from "~/utils/api";

export type Words = RouterOutputs["word"]["getAllByLesson"];

export const useWordsByLesson = api.word.getAllByLesson.useQuery;
