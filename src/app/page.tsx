"use client";

import SelectableButtons from "@/components/SelectableButtons";
import Image from "next/image";
import { useEffect, useState } from "react";

const shuffleArray = (): string => {
  const shuffledArray = [1, 2, 3, 4];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray.join(" ");
};

export default function Home() {
  const gameDuration = 60; // 60 seconds
  const [choices1, setChoices1] = useState<string[]>([]);
  const [choices2, setChoices2] = useState<string[]>([]);

  const [ans1, setAns1] = useState<string>("");
  const [ans2, setAns2] = useState<string>("");

  const [selectedChoices, setSelectedChoices] = useState<(string | null)[]>([
    null,
    null,
  ]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [icon, setIcon] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [emoji, setEmoji] = useState<string[]>(["🚨", "🥬", "🩳", "🌎"]);

  const [score, setScore] = useState<number>(0);
  const [incorrect, setIncorrect] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isEndChallenge, setIsEndChallenge] = useState<boolean>(false);

  useEffect(() => {
    const newChoices1 = [shuffleArray(), shuffleArray(), shuffleArray()];
    const newChoices2 = [shuffleArray(), shuffleArray(), shuffleArray()];
    setChoices1(newChoices1);
    setChoices2(newChoices2);
  }, []);

  useEffect(() => {
    if (choices1.length > 0 && choices2.length > 0) {
      setAns1(choices1[Math.floor(Math.random() * 3)]);
      setAns2(choices2[Math.floor(Math.random() * 3)]);
    }
  }, [choices1, choices2]);

  useEffect(() => {
    if (ans1 && ans2) {
      const ans1Indexes = ans1.split(" ").map(Number);

      const newEmoji = ans2
        .split(" ")
        .map(Number)
        .map((index) => emoji[ans1Indexes[index - 1] - 1]);

      setEmoji(newEmoji);
    }
  }, [ans1, ans2]);

  useEffect(() => {
    if (isGameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsEndChallenge(true);
      setIsGameStarted(false);
      setIsModalOpen(true);
      setIcon("⏰");
      setResult(`Time's up! Your score: ${score}`);
    }
  }, [isGameStarted, timeLeft]);

  const handleStart = () => {
    setIsGameStarted(true);
    setTimeLeft(gameDuration);
    setScore(0);
    setIncorrect(0);
    setIsModalOpen(false);
    const newChoices1 = [shuffleArray(), shuffleArray(), shuffleArray()];
    const newChoices2 = [shuffleArray(), shuffleArray(), shuffleArray()];
    setChoices1(newChoices1);
    setChoices2(newChoices2);
    setAns1(newChoices1[Math.floor(Math.random() * 3)]);
    setAns2(newChoices2[Math.floor(Math.random() * 3)]);
    setSelectedChoices([null, null]);
    setErrorMessage("");
  };

  const handleStop = () => {
    setIsGameStarted(false);

    const newChoices1 = [shuffleArray(), shuffleArray(), shuffleArray()];
    const newChoices2 = [shuffleArray(), shuffleArray(), shuffleArray()];
    setChoices1(newChoices1);
    setChoices2(newChoices2);
    setAns1(newChoices1[Math.floor(Math.random() * 3)]);
    setAns2(newChoices2[Math.floor(Math.random() * 3)]);
    setSelectedChoices([null, null]);
    setErrorMessage("");
  };

  const handleSelect = (rowIndex: number, choice: string) => {
    const updatedChoices = [...selectedChoices];
    updatedChoices[rowIndex] = choice;
    setSelectedChoices(updatedChoices);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedChoices.includes(null)) {
      setErrorMessage("Please select before submit");
    } else {
      setErrorMessage("");
      if (selectedChoices[0] === ans1 && selectedChoices[1] === ans2) {
        setIcon("✅");
        setResult("Good Job!");
        setScore(score + 1);
      } else {
        setIcon("❌");
        setResult("Try again");
        setIncorrect(incorrect + 1);
      }

      setSelectedChoices([null, null]); // Reset selections
      if (!isGameStarted) {
        setIsModalOpen(true);
        setIsEndChallenge(false);
      } else {
        handleNext();
      }
    }
  };

  const handleTutorial = () => {
    setIsTutorialOpen(true);
  };

  const handleNext = () => {
    const newChoices1 = [shuffleArray(), shuffleArray(), shuffleArray()];
    const newChoices2 = [shuffleArray(), shuffleArray(), shuffleArray()];
    setChoices1(newChoices1);
    setChoices2(newChoices2);

    setAns1(newChoices1[Math.floor(Math.random() * 3)]);
    setAns2(newChoices2[Math.floor(Math.random() * 3)]);

    setSelectedChoices([null, null]); // Reset selections
    setErrorMessage("");
    setIsModalOpen(false);
  };

  const handleGotIt = () => {
    setIsTutorialOpen(false);
  };

  return (
    <div className="pt-10 px-10 h-screen bg-black">
      <div className="flex justify-center ">
        <Image src="/icon.png" width={80} height={0} alt="Light Switch" />
      </div>
      <div className="text-center text-3xl font-bold">SwuidGame</div>
      <div className="text-center text-xs pb-4 text-white">
        Created by ChillFloat
      </div>

      {!isGameStarted && (
        <>
          <div className="flex justify-center">
            <button
              onClick={handleStart}
              className="mb-3 w-56 pt-1.5 pb-2 text-white text-xl font-extrabold bg-blue-600 rounded-xl hover:bg-blue-500"
            >
              Start 60s Challenge
            </button>
          </div>

          <div className="flex justify-center pb-8">
            <button
              onClick={handleTutorial}
              className="text-white underline text-lg"
            >
              How to play?
            </button>
          </div>
        </>
      )}

      {isGameStarted && (
        <>
          <div className="flex justify-center ">
            <button
              className="mb-3 w-56 pt-1.5 pb-2 text-white text-xl font-extrabold bg-red-600 rounded-xl"
              onClick={handleStop}
            >
              {timeLeft} second left
            </button>
          </div>

          <div className="flex justify-center pb-8 gap-x-6">
            <div>✅ : {score}</div>
            <div>❌ : {incorrect}</div>
          </div>
        </>
      )}

      <div className="flex justify-center gap-x-10">
        <div className="text-5xl">🚨</div>
        <div className="text-5xl">🥬</div>
        <div className="text-5xl">🩳</div>
        <div className="text-5xl">🌎</div>
      </div>

      <div className="text-center p-2 text-2xl">↓</div>

      <SelectableButtons
        choices={choices1}
        onSelect={(choice) => handleSelect(0, choice)}
        selectedIndex={choices1.indexOf(selectedChoices[0] || "")}
      />

      <div className="text-center p-2 text-2xl">↓</div>

      <SelectableButtons
        choices={choices2}
        onSelect={(choice) => handleSelect(1, choice)}
        selectedIndex={choices2.indexOf(selectedChoices[1] || "")}
      />

      <div className="text-center p-2 text-2xl">↓</div>

      <div className="flex justify-center gap-x-10">
        <div className="text-5xl">{emoji[0]}</div>
        <div className="text-5xl">{emoji[1]}</div>
        <div className="text-5xl">{emoji[2]}</div>
        <div className="text-5xl">{emoji[3]}</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mt-9">
          <button
            type="submit"
            className="py-3 px-5 text-white text-2xl font-extrabold bg-green-600 rounded-xl hover:bg-green-500"
          >
            SUBMIT
          </button>
        </div>

        {errorMessage && (
          <div className="text-center mt-5 text-red-600 font-bold text-lg">
            {errorMessage}
          </div>
        )}
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center text-black">
          <div className="bg-white p-10 pb-5 rounded-xl shadow-lg w-auto">
            <div className="text-center text-5xl pb-4">{icon}</div>

            {!isEndChallenge && (
              <>
                <div className="text-center text-2xl font-extrabold mb-5">
                  {result}
                </div>
                <div className="text-center mb-5">
                  <div className="underline pb-3">Answer</div>
                  <div>First Row: {ans1}</div>
                  <div>Second Row: {ans2}</div>
                </div>
              </>
            )}

            {isEndChallenge && (
              <>
                <div className="text-center text-2xl font-extrabold">
                  Time's Up
                </div>
                <div className="text-center mb-10 text-xl">
                  SwuidGame 60s Challenge
                </div>

                <div className="flex justify-center gap-x-4 mb-10 text-3xl font-extrabold">
                  <div>✅ {score}</div>
                  <div>❌ {incorrect}</div>
                </div>
              </>
            )}
            <div className="text-center">
              <button
                onClick={handleNext}
                className="py-2 px-5 bg-blue-600 text-white rounded-xl"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {isTutorialOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center text-black">
          <div className="bg-white px-10 py-5 rounded-xl shadow-lg w-auto max-w-2xl mx-4">
            <div className="text-center text-3xl pb-4 font-extrabold">
              Way to Play
            </div>

            <div className="text-center mb-5">
              Look at the two rows of shuffled numbers. Select one sequence from
              each row by clicking the patterns. Arrange the emojis according to
              the first row, then check the result using the second row. Press
              Submit to see if your answers are correct.
            </div>
            <div className="text-center">
              <button
                onClick={handleGotIt}
                className="py-2 px-5 bg-black text-white rounded-xl"
              >
                I got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
