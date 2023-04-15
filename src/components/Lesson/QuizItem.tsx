import { useId, useState } from "react";
import { type Quiz } from "./query";

type Props = {
  quiz: Quiz;
  onSolved: () => void;
  onFlawed: () => void;
};
export const QuizItem = ({ quiz, onFlawed, onSolved }: Props) => {
  const id = useId();
  const [val, setVal] = useState("");

  const onAnswer = () => {
    val === quiz.answer ? onSolved() : onFlawed
  }
  return (
    <div className="box-content grid h-[80vh] w-[80vw] grid-cols-1 grid-rows-[20vh_50vh_10vh] bg-slate-200/20 p-10">
      <p className="flex items-center text-3xl">{quiz.question}</p>
      <div
        className="grid grid-cols-2 grid-rows-2 items-center gap-6"
        role="radiogroup"
      >
        {quiz.selects.map((select) => {
          const isSelected = val === select
          return (
            <div
              key={id + select}
              className={`flex h-full w-full items-center justify-center rounded-lg border-4 border-solid border-slate-400 text-2xl font-bold cursor-pointer ${isSelected ? "bg-slate-200" : "bg-slate-500"} `}
              aria-checked={isSelected}
              onClick={() => setVal(isSelected ? "" : select)}
              role="radio"
            >
              {select}
            </div>
          )
        })}
      </div>
      <div className="flex items-end">
        <div>
          <button disabled={!val} onClick={onAnswer}>Answer</button>
        </div>
      </div>
    </div >
  );
};
