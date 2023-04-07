import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const wordRouter = createTRPCRouter({
  getAllByLesson: publicProcedure
    .input(z.object({ lessonId: z.coerce.number().int() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.word.findMany({where: {lessonId: input.lessonId}})
    }),
});
