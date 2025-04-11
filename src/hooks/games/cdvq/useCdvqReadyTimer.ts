import { create } from "zustand";

export interface CdvqReadyTimerState {
  time: number;
  setTime: (value: number) => void;
}

export const useCdvqReadyTimer = create<CdvqReadyTimerState>((set) => ({
  time: 0,
  setTime: (value: number) => {
    set((state) => ({
      ...state,
      time: value,
    }));
  },
}));
