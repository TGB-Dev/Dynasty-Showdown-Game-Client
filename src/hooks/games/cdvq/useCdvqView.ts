import { create } from "zustand";
import { CdvqView } from "@/types/cdvq-view.enum";

export interface GameViewsStates {
  view: CdvqView;
  nextView: () => void;
}

export const useCdvqView = create<GameViewsStates>((set) => ({
  view: CdvqView.Question,

  nextView: () => {
    set((state) => ({
      view:
        state.view === CdvqView.Question ? CdvqView.Results : CdvqView.Question,
    }));
  },
}));
