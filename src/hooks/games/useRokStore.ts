import { create } from "zustand";
import { RokStage } from "@/types/games/rok/rok-stage.enum";

interface RokState {
  stage: RokStage;
  setStage: (scene: RokStage) => void;
}

export const useRokStore = create<RokState>((set) => ({
  stage: RokStage.CHOOSE_CITY,
  setStage: (stage: RokStage) => set({ stage }),
}));
