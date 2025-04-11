import { create } from "zustand";
import { MchgView } from "@/types/mchg-view.enum";

export interface MCHGStates {
  score: number;
  view: MchgView;
  timeLeft: number;

  setView: (view: MchgView) => void;
  setTimeLeft: (time: number) => void;
}

export const useMchgStore = create<MCHGStates>((set) => ({
  timeLeft: 0,
  score: 0,
  view: MchgView.SHOWING_SUB_QUESTION_ANSWER,

  setView: (view: MchgView) => set({ view }),
  setTimeLeft: (timeLeft: number) => set({ timeLeft }),
}));
