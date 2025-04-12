import { create } from "zustand";
import { CdvqView } from "@/types/cdvq-view.enum";

export interface CdvqStates {
  view: CdvqView;
  setView: (view: CdvqView) => void;

  timeLeft: number;
  setTimeLeft: (timeLeft: number) => void;

  answered: boolean;
  setAnswered: (answered: boolean) => void;
}

export const useCdvqStore = create<CdvqStates>((set) => ({
  view: CdvqView.Ready,
  setView: (view: CdvqView) => {
    set(() => ({
      view,
    }));
  },

  timeLeft: 0,
  setTimeLeft: (timeLeft) => {
    set(() => ({
      timeLeft,
    }));
  },

  answered: false,
  setAnswered: (answered) => {
    set(() => ({
      answered,
    }));
  },
}));
