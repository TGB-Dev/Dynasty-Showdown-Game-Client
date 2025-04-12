import { create } from "zustand";
import { TgoRoundStage } from "@/types/games/tgo.enum";

export interface TGOStates {
  stage: TgoRoundStage;
  setStage: (stage: TgoRoundStage) => void;

  timeLeft: number;
  setTimeLeft: (time: number) => void;

  answered: boolean;
  setAnswered: (answered: boolean) => void;
}

export const useTheGrandOrderStore = create<TGOStates>((set) => ({
  stage: TgoRoundStage.WAITING,
  setStage: (stage) => {
    set(() => ({
      stage,
    }));
  },

  timeLeft: 0,
  setTimeLeft: (time) => {
    set(() => ({
      timeLeft: time,
    }));
  },

  answered: false,
  setAnswered: (answered) => {
    set(() => ({
      answered,
    }));
  },
}));
