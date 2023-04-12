import { useRouter } from "next/router";
import { Lesson } from "~/features/Lesson";

const LessonPage = () => {
  const query = useRouter().query;
  const id = query.id;
  if (typeof id !== "string") return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <Lesson lessonId={parseInt(id)} />
    </main>
  );
};

export default LessonPage;
