"use client";

import { Box, Show } from "@chakra-ui/react";
import { AnimatePresence, motion } from "motion/react";
import QuestionView from "@/components/games/cuoc-dua-vuong-quyen/views/QuestionView";
import WaitingView from "@/components/games/cuoc-dua-vuong-quyen/views/WaitingView";
import { create } from "zustand/index";

export enum GameViews {
  Question,
  Waiting,
}

export interface GameViewState {
  view: GameViews;
  nextView: () => void;
}

export const useGameView = create<GameViewState>((set) => ({
  view: GameViews.Question,

  nextView: () => {
    set((state) => ({
      view:
        state.view === GameViews.Question
          ? GameViews.Waiting
          : GameViews.Question,
    }));
  },
}));

export default function GameView() {
  const { view } = useGameView((state) => state);

  return (
    <AnimatePresence>
      <Box as={motion.div}>
        <Show when={view === GameViews.Question}>
          <QuestionView />
        </Show>

        <Show when={view === GameViews.Waiting}>
          <WaitingView />
        </Show>
      </Box>
    </AnimatePresence>
  );
}
