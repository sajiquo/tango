import { randomize } from "../../../utils/array";
import type { Quiz } from "~/server/domain/quiz";
import { type Words, assureFourSelects, nonNullable } from "./misc";

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
              Array.from(
                new Set(
                  randomized
                    .flatMap((word) => word.sentences)
                    .map((s) => s.inflection)
                )
              ).filter((word) => word !== answer)
            ).slice(0, 3),
          ])
        ),
      };
    })
    .filter(nonNullable);
};
