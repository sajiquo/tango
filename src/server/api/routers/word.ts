import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const wordRouter = createTRPCRouter({
  getAllByLesson: publicProcedure
    .input(z.object({ lessonId: z.coerce.number().int() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.word.findMany({
        where: { lessonId: input.lessonId },
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
            level: true
            }
          },
        },
      });
    }),
});
