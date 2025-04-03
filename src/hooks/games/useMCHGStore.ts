import { InputQuestion } from "@/types/questions.types";
import { create } from "zustand";

export interface MCHGStates {
  view: number;
  questions: InputQuestion[];
  answer: string;
  baseTime: number;
  timeLeft: number;
  score: number;

  setView: (view: number) => void;
  setQuestions: (questions: InputQuestion[]) => void;
  setAnswer: (answer: string) => void;
  setBaseTime: (time: number) => void;
  setTimeLeft: (time: number) => void;
  addScore: (score: number) => void;
  minusScore: (score: number) => void;
}

export const useMCHGStore = create<MCHGStates>((set) => ({
  view: 1,
  questions: [
    {
      id: "1",
      content: "What is the capital of Vietnam?",
      correctAnswer: "Hanoi",
    },
    {
      id: "2",
      content: "What is the capital of the USA?",
      correctAnswer: "Hanoiiiiiiiiii",
    },
    {
      id: "3",
      content: "What is the capital of Canada?",
      correctAnswer: "Hanoi",
    },
  ],
  answer: "",
  baseTime: 1,
  timeLeft: 1,
  score: 0,

  setView: (view) => {
    set((state) => ({
      view: (state.view = view),
    }));
  },
  setQuestions: (questions) => {
    set((state) => ({
      questions: (state.questions = questions),
    }));
  },
  setAnswer: (answer) => {
    set((state) => ({
      answer: (state.answer = answer),
    }));
  },
  setTimeLeft: (timeLeft) => {
    set((state) => ({
      timeLeft: (state.timeLeft = timeLeft),
    }));
  },
  setBaseTime: (baseTime) => {
    set((state) => ({
      baseTime: (state.baseTime = baseTime),
    }));
  },
  addScore: (score) => {
    set((state) => ({
      score: state.score + score,
    }));
  },
  minusScore: (score) => {
    set((state) => ({
      score: state.score - score,
    }));
  },
}));
