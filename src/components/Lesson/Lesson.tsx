import { api } from "~/utils/api";
import { useQuizQueueReducer } from "./useQuizQueueReducer";
import { QuizItem } from "./QuizItem";
import { type Quiz } from "./query";

const LIMIT = 10;

type Props = {
  lessonId: number;
};

type InnerProps = {
  quizzes: Quiz[];
};
const LessonInner = ({ quizzes }: InnerProps) => {
  const { current, solvedCount, dispatch } = useQuizQueueReducer(quizzes);

  if (!current) {
    return <div>end</div>;
  }

  return (
    <>
      <p>{solvedCount}/{quizzes.length}</p>
      <QuizItem
        key={current.wordId}
        quiz={current}
        onSolved={() => dispatch({ type: "solved" })}
        onFlawed={() => dispatch({ type: "flawed" })}
      />
    </>
  );
};

export const Lesson = ({ lessonId }: Props) => {
  const { data, isLoading, isError } = api.quiz.getByLesson.useQuery({
    lessonId,
    limit: LIMIT
  });
  if (isLoading || isError) return null;
  return <LessonInner quizzes={data} />;
};
