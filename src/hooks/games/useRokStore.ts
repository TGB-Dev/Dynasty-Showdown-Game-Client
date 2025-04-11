import { create } from "zustand";
import { RokStage } from "@/types/games/rok/rok-stage.enum";
import { RokCity } from "@/types/games/rok/rok-city.types";

interface RokState {
  stage: RokStage;
  setStage: (scene: RokStage) => void;
}

export const useRokStore = create<RokState>((set) => ({
  stage: RokStage.CHOOSE_CITY,
  setStage: (stage: RokStage) => set({ stage }),
}));
