import { createSentenceQuizzes } from "./createSentenceQuizzes";
import { createMeaningQuizzes } from "./createMeaningQuizzes";
import { randomize } from "~/utils/array";
import type { WordRepository } from "~/server/repository/word";
import type { Quiz } from "~/server/domain/quiz";
import { type GetQuizzesParams } from "~/server/api/routers/quiz";

type QuizUseCaseInit = {
  wordRepository: WordRepository;
};

export const createQuizUseCase = ({ wordRepository }: QuizUseCaseInit) => ({
  getSentenceQuizzes: async ({ lessonId }: GetQuizzesParams): Promise<Quiz[]> =>
    createSentenceQuizzes(await wordRepository.getAllByLesson({ lessonId })),
  getMeaningQuizzes: async ({ lessonId }: GetQuizzesParams): Promise<Quiz[]> =>
    createMeaningQuizzes(await wordRepository.getAllByLesson({ lessonId })),
  getQuizzes: async ({
    lessonId,
    limit,
  }: GetQuizzesParams): Promise<Quiz[]> => {
    const allWords = await wordRepository.getAllByLesson({ lessonId });
    return randomize([
      ...createMeaningQuizzes(allWords),
      ...createSentenceQuizzes(allWords),
    ]).slice(0, limit);
  },
});
