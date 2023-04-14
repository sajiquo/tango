import { api } from "~/utils/api";
import Link from "next/link";

export const LessonList = () => {
  const { data, isLoading, isError } = api.language.getAll.useQuery();

  if (isLoading || isError) return null;
  return (
    <article className="flex flex-row gap-10 text-4xl">
      {data.map((lang) => (
        <section key={lang.id}>
          <h2 className="text-base font-bold text-yellow-900">{lang.name}</h2>
          <ul>
            {lang.Lesson.map((les) => (
              <li key={les.id} className="hover:text-gray-500">
                <Link href={`lesson/${les.id}`}>{les.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
};
