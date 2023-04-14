import { type Quiz } from "./query";

type Props = {
  quiz: Quiz;
  onSolved: () => void;
  onFlawed: () => void;
};
export const QuizItem = ({ quiz, onFlawed, onSolved }: Props) => {
  return (
    <div className="w-[80vw] h-[80vh] border-box  grid grid-cols-1 grid-rows-[20vh_50vh_10vh] bg-slate-200/20 ">
      <p className="text-3xl">{quiz.question}</p>
      <div className="grid grid-cols-2 grid-rows-2" role="radiogroup">
        {quiz.selects.map(select => <div key={select} className="flex items-center justify-center text-2xl font-bold w-full aspect-[2/1] border-lime-700  " aria-checked={false} role="radio">{select}</div>)}
      </div>
      <div>
        <p>{quiz.hint}</p>
        <button onClick={onSolved}>Send</button>
        <button onClick={onFlawed}>flawed</button>
      </div>
    </div>
  );
};
