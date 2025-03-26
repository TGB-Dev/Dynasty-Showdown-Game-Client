import React from "react";
import { create } from "zustand";

interface City {
  resources: number;
  ownedBy: string | null;
}

interface SelectedCity {
  row: number;
  col: number;
}
interface Success {
  attack: boolean;
  defend: boolean;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

interface ROKState {
  scene: string;
  setScene: (scene: string) => void;
  success: Success;
  setSuccess: (success: React.SetStateAction<Success>) => void;
  question: Question[];
  setQuestion: (question: Question[]) => void;
  questionIndex: number;
  setQuestionIndex: (value: React.SetStateAction<number>) => void;
  matrix: number[][];
  cities: City[][];
  selectedCity: SelectedCity | null;
  setSelectedCity: (selectedCity: SelectedCity | null) => void;
  turn: number;
  setTurn: (turn: number) => void;
  setCities: (cities: City[][]) => void;
  attackCity: () => void;
  currentTeam: string; // Add current team state
  setCurrentTeam: (team: string) => void; // Add setter for current team
}

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
  matrix: Array(9).fill(Array(9).fill(0)),
  cities: INITIAL_CITIES,
  selectedCity: null,
  turn: 1,
  setTurn: (turn: number) => set({ turn }),
  setCities: (cities: City[][]) => set({ cities }),
  setSelectedCity: (selectedCity: SelectedCity | null) => set({ selectedCity }),
  currentTeam: "Team 1",
  setCurrentTeam: (team: string) => set({ currentTeam: team }),

  attackCity: () =>
    set((state) => {
      const { selectedCity, cities, currentTeam, turn } = state;
      if (selectedCity) {
        const updatedCities = [...cities];
        updatedCities[selectedCity.row][selectedCity.col].ownedBy = currentTeam; // Assign city to current team
        return {
          cities: updatedCities,
          selectedCity: null,
          turn: turn + 1,
        };
      }
      return state;
    }),
}));