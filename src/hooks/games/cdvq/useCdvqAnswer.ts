import { create } from "zustand";

export interface CdvqAnswerState {
  answer: string;
  isCorrect: boolean;

  setAnswer: ({
    answer,
    isCorrect,
  }: {
    answer: string;
    isCorrect: boolean;
  }) => void;
}

export const useCdvqAnswer = create<CdvqAnswerState>((set) => ({
  answer: "",
  isCorrect: false,

  setAnswer: ({ answer, isCorrect }) => {
    set((state) => ({
      ...state,
      answer,
      isCorrect,
    }));
  },
}));
