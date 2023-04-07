import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const lessonRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.lesson.findUnique({ where: { id: input.id } });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.lesson.findMany();
  }),
});
