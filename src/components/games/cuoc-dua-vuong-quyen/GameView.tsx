"use client";

import { Box, Show } from "@chakra-ui/react";
import { AnimatePresence, motion } from "motion/react";
import QuestionView from "@/components/games/cuoc-dua-vuong-quyen/views/QuestionView";
import ResultsView from "@/components/games/cuoc-dua-vuong-quyen/views/ResultsView";
import { useCdvqStore } from "@/hooks/games/cdvq/useCdvqStore";
import { CdvqView } from "@/types/cdvq-view.enum";
import { useEffect } from "react";
import { socket } from "@/lib/socket";
import type { Socket } from "socket.io-client";
import ReadyView from "@/components/games/cuoc-dua-vuong-quyen/views/ReadyView";
import AnswerView from "@/components/games/cuoc-dua-vuong-quyen/views/AnswerView";

const CdvqSocketHandlers = {
  timerUpdate: (timeLeft: number) => {
    const { setTimeLeft } = useCdvqStore.getState();
    setTimeLeft(timeLeft);
  },

  gameEnded: () => {},

  question: async () => {
    const { setView, setAnswered } = useCdvqStore.getState();
    setAnswered(false);
    setView(CdvqView.Question);
  },

  answer: async () => {
    const { setView } = useCdvqStore.getState();
    setView(CdvqView.Answer);
  },

  result: () => {
    const { setView } = useCdvqStore.getState();
    setView(CdvqView.Results);
  },
};

function registerHandlers(socket: Socket, handlers: typeof CdvqSocketHandlers) {
  for (const [event, handler] of Object.entries(handlers)) {
    socket.on(event, handler);
  }
}

function unregisterHandlers(
  socket: Socket,
  handlers: typeof CdvqSocketHandlers,
) {
  for (const event of Object.keys(handlers)) {
    socket.off(event);
  }
}

export default function GameView() {
  const { view } = useCdvqStore((state) => state);

  useEffect(() => {
    registerHandlers(socket, CdvqSocketHandlers);

    return () => {
      unregisterHandlers(socket, CdvqSocketHandlers);
    };
  }, []);

  return (
    <AnimatePresence>
      <Box as={motion.div}>
        <Show when={view === CdvqView.Ready}>
          <ReadyView />
        </Show>

        <Show when={view === CdvqView.Question}>
          <QuestionView />
        </Show>

        <Show when={view === CdvqView.Answer}>
          <AnswerView />
        </Show>

        <Show when={view === CdvqView.Results}>
          <ResultsView />
        </Show>
      </Box>
    </AnimatePresence>
  );
}
