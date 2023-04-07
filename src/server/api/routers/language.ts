
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const langaugeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.language.findMany({
      include: {
        Lesson: true,
      },
    });
  }),
});
