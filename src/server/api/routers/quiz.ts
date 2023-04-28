import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createPrismaWordRepository } from "~/server/repository/word";
import { createQuizUseCase } from "~/server/usecases/quiz";

const LessonIdSchema = z.object({
  lessonId: z.coerce.number().int(),
});
export type LessonIdParams = z.infer<typeof LessonIdSchema>;

const OptionalSchema = z.object({
  limit: z.number().int().optional(),
});

const GetQuizzesParamsSchema = z.intersection(LessonIdSchema, OptionalSchema);
export type GetQuizzesParams = z.infer<typeof GetQuizzesParamsSchema>;

export const quizRouter = createTRPCRouter({
  getAllByLesson: publicProcedure
    .input(LessonIdSchema)
    .query(({ input, ctx }) =>
      createQuizUseCase({
        wordRepository: createPrismaWordRepository(ctx.prisma),
      }).getQuizzes(input)
    ),
  getByLesson: publicProcedure
    .input(GetQuizzesParamsSchema)
    .query(({ input, ctx }) =>
      createQuizUseCase({
        wordRepository: createPrismaWordRepository(ctx.prisma),
      }).getQuizzes(input)
    ),
});
