import { create } from "zustand/index";
import { Question, QuestionType } from "@/types/question.types";

export interface QuestionState {
  question: Question;
  setQuestion: (question: Question) => void;
  chosenAnswer: string | null;
  setChosenAnswer: (answer: string) => void;
}

export const useCdvqQuestionStore = create<QuestionState>((set) => ({
  question: {
    content: "What is the capital of Vietnam?",
    answers: [
      "Hanoi",
      "Ho Chi Minh City, Southern. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
      "Da Nang",
      "Hue",
    ],
    correctAnswer: "Hanoi",
    type: QuestionType.MultipleChoices,
  },

  chosenAnswer: null,

  setQuestion(question: Question) {
    set((state) => ({
      ...state,
      question,
    }));
  },

  setChosenAnswer: (answer) => {
    set((state) => ({
      ...state,
      chosenAnswer: answer,
    }));
  },
}));
