import React from "react";
import { create } from "zustand";

export interface ROKState {
  scene: string;
  setScene: (scene: string) => void;
  question: Question[];
  setQuestion: (question: Question[]) => void;
  questionIndex: number;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  success: Success;
  setSuccess: React.Dispatch<React.SetStateAction<Success>>;
  matrix: number[][];
}

export const useROKStore = create<ROKState>((set) => ({
  scene: "attacker",
  setScene: (scene: string) => set({ scene }),

  question: [{ id: "", question: "", options: [], answer: "" }],
  setQuestion: (question: Question[]) => set({ question }),

  questionIndex: 0,
  setQuestionIndex: (value: React.SetStateAction<number>) =>
    set((state) => ({
      questionIndex:
        typeof value === "function" ? (value as (prevState: number) => number)(state.questionIndex) : value,
    })),

  success: { attack: false, defend: false },
  setSuccess: (success: React.SetStateAction<Success>) =>
    set((state) => ({
      success:
        typeof success === "function"
          ? (success as (prevState: Success) => Success)(state.success)
          : success,
    })),

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
