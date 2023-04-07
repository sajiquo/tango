import { api } from "~/utils/api";

export const Lessons = () => {
  const { data, isLoading, isError } = api.lesson.getAll.useQuery();

  if (isLoading || isError) return null;
  return (
    <ul>
      {data.map((lesson) => (
        <li key={lesson.id}>
          <p>{lesson.name}</p>
        </li>
      ))}
    </ul>
  );
};
