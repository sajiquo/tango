import { api } from "~/utils/api";
import { QuizQueue } from "./QuizQueue";

type Props = {
  lessonId: number;
};

export const Lesson = ({ lessonId }: Props) => {
  const { data, isLoading, isError } = api.quiz.getAllByLesson.useQuery({ lessonId });
  if (isLoading || isError) return null;
  return <QuizQueue quizzes={data} />;
};
