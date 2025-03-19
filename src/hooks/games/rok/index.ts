import { getMatrix } from "@/lib/games/rok";
import { create } from "zustand";

export interface ROKState {
  scene: string;
  setScene: (scene: string) => void;
  matrix: number[][];
  getMatrix: () => void;
  setMatrix: (matrix: number[][]) => void;
}

export const useROKStore = create<ROKState>((set) => ({
  scene: "game",
  setScene: (scene) => set({ scene }),
  matrix: [],
  getMatrix: async () => {
    const matrix = await getMatrix();
    set({ matrix });
  },
  setMatrix: (matrix) => set({ matrix }),
}));
