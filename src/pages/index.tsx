import { type NextPage } from "next";
import Head from "next/head";
import { LessonList } from "~/features/LessonList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>tango</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <LessonList />
      </main>
    </>
  );
};

export default Home;
