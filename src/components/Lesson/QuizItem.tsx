import { useId, useState } from "react";
import { type Quiz } from "./query";

type Props = {
  quiz: Quiz;
  onSolved: () => void;
  onFlawed: () => void;
};

const neumorphismCardStyle =
  "shadow-[5px_5px_10px_rgba(0,0,0,0.7),_-5px_-5px_10px_#ffffff10]";
const neumorphismCardInvertedStyle =
  "shadow-[-5px_-5px_10px_rgba(10,10,10,0.7),_5px_5px_10px_#fafafa10]";

type Phase = "beforeAnswer" | "solved" | "flawed";

export const QuizItem = ({ quiz, onFlawed, onSolved }: Props) => {
  const id = useId();
  const [val, setVal] = useState("");
  const [phase, setPhase] = useState<Phase>("beforeAnswer");

  const onControl = () => {
    switch (phase) {
      case "beforeAnswer":
        return val === quiz.answer ? setPhase("solved") : setPhase("flawed");
      case "solved":
        return onSolved();
      case "flawed":
        return onFlawed();
    }
  };

  return (
    <div className="box-content grid h-[80vh] w-[80vw] grid-cols-1 grid-rows-[20vh_50vh_10vh] px-[5vw] py-[5vh]">
      <p className="flex items-center text-3xl">{quiz.question}</p>
      <div
        className="grid grid-cols-2 grid-rows-2 items-center gap-6"
        role="radiogroup"
      >
        {quiz.selects.map((select) => {
          const isSelected = val === select;
          return (
            <button
              key={id + select}
              className={`flex h-full w-full items-center justify-center rounded-2xl text-2xl font-bold ${
                isSelected ? neumorphismCardInvertedStyle : neumorphismCardStyle
              }`}
              aria-checked={isSelected}
              onClick={() => setVal(isSelected ? "" : select)}
              role="radio"
              disabled={phase !== "beforeAnswer"}
            >
              {select}
            </button>
          );
        })}
      </div>
      <div className="flex items-end justify-between">
        <span className="h-10 leading-10">
          {phase === "beforeAnswer"
            ? ""
            : phase === "solved"
            ? "Correct!"
            : `Incorrect. Hint: ${quiz.hint}`}
        </span>
        <button
          className={`box-content h-10 w-20 rounded-xl ${neumorphismCardStyle} disabled:text-neutral-600 ${
            phase === "beforeAnswer"
              ? "hover:text-blue-300"
              : phase === "solved"
              ? "hover:text-green-300"
              : "hover:text-red-300"
          }`}
          disabled={!val}
          onClick={onControl}
        >
          <span className="h-6 py-2">
            {phase === "beforeAnswer" ? "Answer" : "Next"}
          </span>{" "}
        </button>
      </div>
    </div>
  );
};
