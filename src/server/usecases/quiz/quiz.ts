import { createSentenceQuizzes } from "./createSentenceQuizzes";
import type {
  ByLessonIdParams,
  WordRepository,
} from "~/server/repository/word";
import type { Quiz } from "~/server/domain/quiz";

type QuizUseCaseInit = {
  wordRepository: WordRepository;
};

export const createQuizUseCase = ({ wordRepository }: QuizUseCaseInit) => {
  return {
    getQuizzes: async (params: ByLessonIdParams): Promise<Quiz[]> =>
      createSentenceQuizzes(await wordRepository.getAllByLesson(params)),
  };
};
