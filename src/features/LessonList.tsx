import { api } from "~/utils/api";
import Link from "next/link"

export const LessonList = () => {
  const { data, isLoading, isError } = api.language.getAll.useQuery();

  if (isLoading || isError) return null;
  return (
    <>
      {data.map((lang) => (
        <section key={lang.id}>
          <h2>{lang.name}</h2>
          <ul>
            {lang.Lesson.map((les) => (
              <li key={les.id}><Link href={`lesson/${les.id}`}>{les.name}</Link></li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
};
