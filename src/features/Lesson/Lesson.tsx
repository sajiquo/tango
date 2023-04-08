import { useWordsByLesson } from "./useWordsByLesson";
import { createSentenceQuizzes } from "./createSentenceQuizzes";
import { QuizQueue } from "./QuizQueue";

type Props = {
  lessonId: string;
};

export const Lesson = ({ lessonId }: Props) => {
  const { data, isLoading, isError } = useWordsByLesson({
    lessonId: Number(lessonId),
  });

  if (isLoading || isError) return null;

  return <QuizQueue quizzes={createSentenceQuizzes(data)} />;
};
