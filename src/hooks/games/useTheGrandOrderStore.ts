import { Question } from "@/types/questions.types";
import { create } from "zustand";

export interface GameValues {
  view: number;
  questions: Question[];
  answers: string[];
  time: number;

  setView: (view: number) => void;
  setQuestions: (questions: Question[]) => void;
  setAnswers: (answers: string[]) => void;
  setTime: (time: number) => void;
}

export const useTheGrandOrderStore = create<GameValues>((set) => ({
  view: 1,
  questions: [],
  answers: [],
  time: 0,

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
  setTime: (time) => {
    set((state) => ({
      time: (state.time = time),
    }));
  },
}));
