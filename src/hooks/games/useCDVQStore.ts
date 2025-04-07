import { Question, QuestionType } from "@/types/question.types";
import { create } from "zustand";

export enum GameViews {
  Question,
  Results,
}
export interface GameViewsStates {
  timeLeft: number;
  view: GameViews;
  nextView: () => void;
  setTimeLeft: (time: number) => void;
}

export const useGameView = create<GameViewsStates>((set) => ({
  timeLeft: 0,
  view: GameViews.Question,
  nextView: () => {
    set((state) => ({
      view:
        state.view === GameViews.Question
          ? GameViews.Results
          : GameViews.Question,
    }));
  },
  setTimeLeft: (time) => {
    set((state) => ({
      timeLeft: time,
    }));
  },
}));

interface QuestionState {
  question: Question;
  chosenAnswer: string | null;
  setChosenAnswer: (answer: string) => void;
}

export const useQuestionStore = create<QuestionState>((set) => ({
  question: {
    id: "1",
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
  setChosenAnswer: (answer) => {
    set((state) => ({
      chosenAnswer: answer,
    }));
  },
}));
