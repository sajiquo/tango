import type { Quiz } from "~/server/domain/quiz";
import { randomize } from "../../../utils/array";
import { assureFourSelects, nonNullable, type Words } from "./misc";

export const createMeaningQuizzes = (words: Words): Quiz[] => {
  const randomized = randomize(words);
  if (!randomized.length) return [];
  return randomized
    .map((word) => {
      const answer = word.meaning;
      return {
        wordId: word.id,
        answer,
        question: `which is the meaning of ${word.name}`,
        hint: randomize(word.sentences)[0]?.text ?? "",
        selects: assureFourSelects(
          randomize([
            answer,
            ...randomize(
              Array.from(new Set(randomized.map((s) => s.meaning))).filter(
                (meaning) => meaning !== answer
              )
            ).slice(0, 3),
          ])
        ),
      };
    })
    .filter(nonNullable);
};
