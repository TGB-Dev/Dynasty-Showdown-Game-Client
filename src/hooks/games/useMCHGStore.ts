import { InputQuestion, MCHGObstacle } from "@/types/questions.types";
import { create } from "zustand";

export interface MCHGStates {
  view: number;
  obstacle: MCHGObstacle;
  questions: InputQuestion[];
  answers: Partial<null | string>[];
  baseTime: number;
  timeLeft: number;
  score: number;

  setView: (view: number) => void;
  setQuestions: (questions: InputQuestion[]) => void;
  setAnswers: (answers: Partial<null | string>[]) => void;
  setBaseTime: (time: number) => void;
  setTimeLeft: (time: number) => void;
  addScore: (score: number) => void;
  minusScore: (score: number) => void;
}

export const useMCHGStore = create<MCHGStates>((set) => ({
  view: 1,
  obstacle: {
    length: 3,
    correctAnswer: "TGB",
  },
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
  answers: ["", "", "", "", "", ""],
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
  setAnswers: (answers) => {
    set((state) => ({
      answers: (state.answers = answers),
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
