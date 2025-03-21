import { create } from "zustand";

export interface City {
  resources: number;
  ownedBy: string | null;
}

export interface SelectedCity {
  row: number;
  col: number;
}

const INITIAL_CITIES: City[][] = Array.from({ length: 9 }, () =>
  Array.from({ length: 9 }, () => ({
    resources: Math.floor(Math.random() * 100),
    ownedBy: null,
  }))
);

export interface ROKState {
  scene: string;
  setScene: (scene: string) => void;
  question: Question[];
  setQuestion: (question: Question[]) => void;
  questionIndex: number;
  setQuestionIndex: (questionIndex: number) => void;
  matrix: number[][];
  cities: City[][];
  selectedCity: SelectedCity | null;
  turn: number;
  setTurn: (turn: number) => void;
  setCities: (cities: City[][]) => void;
  setSelectedCity: (selectedCity: SelectedCity | null) => void;
  attackCity: () => void;
}

export const useROKStore = create<ROKState>((set) => ({
  scene: "pick",
  setScene: (scene: string) => set({ scene }),
  question: [{ id: "", question: "", options: [], answer: "" }],
  setQuestion: (question: Question[]) => set({ question }),
  questionIndex: 0,
  setQuestionIndex: (questionIndex: number) => set({ questionIndex }),
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
