import { create } from "zustand/index";
import { Question } from "@/types/question.types";

export interface QuestionState {
  isAnswered: boolean;
  question: Question | null;
  setQuestion: (question: Question) => void;
  setAnswered: (isAnswered: boolean) => void;
}

export const useCdvqQuestionStore = create<QuestionState>((set) => ({
  isAnswered: false,
  question: null,

  setQuestion(question: Question) {
    set((state) => ({
      ...state,
      isAnswered: false,
      question,
    }));
  },

  setAnswered: (isAnswered: boolean) => {
    set((state) => ({
      ...state,
      isAnswered,
    }));
  },
}));
