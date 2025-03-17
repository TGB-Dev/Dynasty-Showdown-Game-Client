import { Question } from "@/types/questions.types";
import { create } from "zustand";

export interface GameValues {
  view: number;
  questions: Question[];
  answers: string[];
  baseTime: number;
  timeLeft: number;

  setView: (view: number) => void;
  setQuestions: (questions: Question[]) => void;
  setAnswers: (answers: string[]) => void;
  setBaseTime: (time: number) => void;
  setTimeLeft: (time: number) => void;
}

export const useTheGrandOrderStore = create<GameValues>((set) => ({
  view: 1,
  questions: [],
  answers: [],
  baseTime: 1,
  timeLeft: 1,

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
}));
