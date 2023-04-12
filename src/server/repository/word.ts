import { z } from "zod";
import type { prisma } from "~/server/db";

export const ByLessonIdParamsSchema = z.object({
  lessonId: z.coerce.number().int(),
});

export type ByLessonIdParams = z.infer<typeof ByLessonIdParamsSchema>;
export type WordRepository = ReturnType<typeof createPrismaWordRepository>;

export const createPrismaWordRepository = (client: typeof prisma) => ({
  getAllByLesson: async ({ lessonId }: ByLessonIdParams) =>
    client.word.findMany({
      where: { lessonId },
      select: {
        id: true,
        name: true,
        meaning: true,
        sentences: {
          select: {
            id: true,
            text: true,
            inflection: true,
          },
        },
        proficiency: {
          select: {
            id: true,
            level: true,
          },
        },
      },
    }),
});
