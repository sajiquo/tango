import { useRouter } from "next/router";
import { Lesson } from "~/components/Lesson";
import { Main } from "~/components/Main";

const LessonPage = () => {
  const query = useRouter().query;
  const id = query.id;
  if (typeof id !== "string") return null;

  return (
    <Main>
      <Lesson lessonId={parseInt(id)} />
    </Main>
  );
};

export default LessonPage;
