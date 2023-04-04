import { PrismaClient } from "@prisma/client";
import { week1 } from "./week1";

type WordInit = {
  name: string;
  meaning: string;
  sentences: { text: string; inflection: string }[];
};

type WordCreate = {
  name: string;
  meaning: string;
  sentences: {
    create: {
      text: string;
      inflection: string;
    }[];
  };
  proficiency: {
    create: Record<string, never>;
  };
};

const createNewWord = (init: WordInit): WordCreate => {
  return {
    name: init.name,
    meaning: init.meaning,
    sentences: {
      create: init.sentences,
    },
    proficiency: { create: {} },
  };
};

export type LessonInit = {
  name: string;
  words: WordInit[];
};

const createNewLesson = (init: LessonInit) => ({
  where: { name: init.name },
  update: {},
  create: {
    name: init.name,
    words: {
      create: init.words.map(createNewWord),
    },
  },
});

const prisma = new PrismaClient();

const lessons: LessonInit[] = [week1];

async function main() {
  await prisma.$transaction(
    lessons.map((lesson) => prisma.lesson.upsert(createNewLesson(lesson)))
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
