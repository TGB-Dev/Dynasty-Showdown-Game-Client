import { create } from "zustand";

export interface CdvqTimer {
  timeLeft: number;
  setTimeLeft: (timeLeft: number) => void;
}

export const useCdvqTimer = create<CdvqTimer>((set) => ({
  timeLeft: 0,

  setTimeLeft: (timeLeft) => {
    set(() => ({
      timeLeft,
    }));
  },
}));
