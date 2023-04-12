import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  createPrismaWordRepository,
  ByLessonIdParamsSchema,
} from "~/server/repository/word";
import { createQuizUseCase } from "~/server/usecases/quiz";

export const quizRouter = createTRPCRouter({
  getAllByLesson: publicProcedure
    .input(ByLessonIdParamsSchema)
    .query(({ input, ctx }) =>
      createQuizUseCase({
        wordRepository: createPrismaWordRepository(ctx.prisma),
      }).getQuizzes(input)
    ),
});
