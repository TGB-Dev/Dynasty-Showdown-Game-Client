import { Question, QuestionType } from "@/types/question.types";
import { create } from "zustand";

export enum GameViews {
  Question,
  Results,
}
export interface GameViewsStates {
  view: GameViews;
  nextView: () => void;
}

export const useGameView = create<GameViewsStates>((set) => ({
  view: GameViews.Question,
  nextView: () => {
    set((state) => ({
      view:
        state.view === GameViews.Question
          ? GameViews.Results
          : GameViews.Question,
    }));
  },
}));

interface QuestionState {
  question: Question;
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
    type: QuestionType.MultipleChoices,
  },
}));
