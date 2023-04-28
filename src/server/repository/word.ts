import type { prisma } from "~/server/db";
import { type LessonIdParams } from "../api/routers/quiz";
export type WordRepository = ReturnType<typeof createPrismaWordRepository>;

export const createPrismaWordRepository = (client: typeof prisma) => ({
  getAllByLesson: async ({ lessonId }: LessonIdParams) =>
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
