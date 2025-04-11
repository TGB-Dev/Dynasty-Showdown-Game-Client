import { create } from "zustand";
import { CdvqView } from "@/types/cdvq-view.enum";

export interface GameViewsStates {
  view: CdvqView;
  nextView: () => void;
  setView: (view: CdvqView) => void;
}

export const useCdvqView = create<GameViewsStates>((set) => ({
  view: CdvqView.Ready,

  nextView: () => {
    set((state) => ({
      view:
        state.view === CdvqView.Question ? CdvqView.Results : CdvqView.Question,
    }));
  },

  setView: (view: CdvqView) => {
    set((state) => ({
      ...state,
      view,
    }));
  },
}));
