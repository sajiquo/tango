import { type Words } from "./useWordsByLesson";
import type { FourSelects, Quiz } from "./quiz";
import { randomize } from "./utils";

const nonNullable = <T>(arg: T): arg is NonNullable<T> => !!arg;

const INVALID_SELECT = "<invalid>";
const assureFourSelects = (maybeFs: readonly string[]): FourSelects => [
  maybeFs[0] ?? INVALID_SELECT,
  maybeFs[1] ?? INVALID_SELECT,
  maybeFs[2] ?? INVALID_SELECT,
  maybeFs[3] ?? INVALID_SELECT,
];

export const createSentenceQuizzes = (words: Words): Quiz[] => {
  const randomized = randomize(words);
  if (!randomized.length) return [];
  return randomized
    .map((word) => {
      const sentence = randomize(word.sentences)[0];
      if (!sentence) return null;
      const answer = sentence.inflection;
      return {
        wordId: word.id,
        answer,
        question: sentence.text.replace(answer, "_".repeat(answer.length)),
        hint: word.meaning,
        selects: assureFourSelects(
          randomize([
            answer,
            ...randomize(
              Array.from(new Set(randomized.flatMap((word) => word.sentences)))
                .map((s) => s.inflection)
                .filter((word) => word !== answer)
            ).slice(0, 3),
          ])
        ),
      };
    })
    .filter(nonNullable);
};
