import React from "react";
import { create } from "zustand";

const INITIAL_CITIES: City[][] = Array.from({ length: 9 }, () =>
  Array.from({ length: 9 }, () => ({
    resources: Math.floor(Math.random() * 100),
    ownedBy: null,
  }))
);

export const useROKStore = create<ROKState>((set) => ({
  scene: "main",
  setScene: (scene: string) => set({ scene }),
  success: { attack: false, defend: false },
  setSuccess: (success: React.SetStateAction<Success>) =>
    set((state) => ({
      success:
        typeof success === "function"
          ? (success as (prevState: Success) => Success)(state.success)
          : success,
    })),
  question: [{ id: "", question: "", options: [], answer: "" }],
  setQuestion: (question: Question[]) => set({ question }),
  questionIndex: 0,
  setQuestionIndex: (value: React.SetStateAction<number>) =>
    set((state) => ({
      questionIndex:
        typeof value === "function"
          ? (value as (prevState: number) => number)(state.questionIndex)
          : value,
    })),
  matrix: Array(9).fill(Array(9).fill(0)), // Keeping existing matrix for other uses
  cities: INITIAL_CITIES,
  selectedCity: null,
  turn: 1,
  setTurn: (turn: number) => set({ turn }),
  setCities: (cities: City[][]) => set({ cities }),
  setSelectedCity: (selectedCity: SelectedCity | null) => set({ selectedCity }),
  attackCity: () =>
    set((state) => {
      const { selectedCity, cities, turn } = state;
      if (selectedCity) {
        const updatedCities = [...cities];
        updatedCities[selectedCity.row][selectedCity.col].ownedBy = "Player 1";
        return { cities: updatedCities, selectedCity: null, turn: turn + 1 };
      }
      return state;
    }),
}));
