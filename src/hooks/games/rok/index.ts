import { create } from "zustand";

export interface ROKState {
  scene: string;
  setScene: (scene: string) => void;
  question: Question[];
  setQuestion: (question: Question[]) => void;
  questionIndex: number;
  setQuestionIndex: (questionIndex: number) => void;
  matrix: number[][];
}

export const useROKStore = create<ROKState>((set) => ({
  scene: "attacker",
  setScene: (scene: string) => set({ scene }),
  question: [{ id: "", question: "", options: [], answer: "" }],
  setQuestion: (question: Question[]) => set({ question }),
  questionIndex: 0,
  setQuestionIndex: (questionIndex: number) => set({ questionIndex }),
  matrix: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
}));
