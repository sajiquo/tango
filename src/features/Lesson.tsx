import { api } from "~/utils/api";

type Props = {
  lessonId: string;
}
export const Lesson = ({lessonId}:Props) => {
  const {data, isLoading, isError} = api.word.getAllByLesson.useQuery({lessonId: Number(lessonId)})

  if (isLoading || isError) return null;

  return (
    <ul>
      {data.map((word) => (<li key={word.id}>{ word.name }</li>))}
    </ul>
  )



}
