"use client";

import { Box, Show } from "@chakra-ui/react";
import { AnimatePresence, motion } from "motion/react";
import QuestionView from "@/components/games/cuoc-dua-vuong-quyen/views/QuestionView";
import WaitingView from "@/components/games/cuoc-dua-vuong-quyen/views/ResultsView";
import { GameViews, useGameView } from "@/hooks/games/useCDVQStore";

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
