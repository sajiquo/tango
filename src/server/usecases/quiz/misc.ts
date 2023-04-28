import type { WordRepository } from "~/server/repository/word";
import type { FourSelects } from "~/server/domain/quiz";

export const nonNullable = <T>(arg: T): arg is NonNullable<T> => !!arg;

export const INVALID_SELECT = "<invalid>";
export const assureFourSelects = (maybeFs: readonly string[]): FourSelects => [
  maybeFs[0] ?? INVALID_SELECT,
  maybeFs[1] ?? INVALID_SELECT,
  maybeFs[2] ?? INVALID_SELECT,
  maybeFs[3] ?? INVALID_SELECT,
];

export type Words = Awaited<ReturnType<WordRepository["getAllByLesson"]>>;
