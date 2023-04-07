import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { lessonRouter } from "./routers/lesson";
import { langaugeRouter } from "./routers/language";
import { wordRouter } from "./routers/word";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  lesson: lessonRouter,
  word: wordRouter,
  language: langaugeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
