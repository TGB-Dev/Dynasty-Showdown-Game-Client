"use client";

import { Box, Show } from "@chakra-ui/react";
import { AnimatePresence, motion } from "motion/react";
import QuestionView from "@/components/games/cuoc-dua-vuong-quyen/views/QuestionView";
import WaitingView from "@/components/games/cuoc-dua-vuong-quyen/views/ResultsView";
import { useCdvqView } from "@/hooks/games/cdvq/useCdvqView";
import { CdvqView } from "@/types/cdvq-view.enum";
import { useEffect } from "react";
import { socket } from "@/lib/socket";
import type { Socket } from "socket.io-client";
import { useCdvqTimer } from "@/hooks/games/cdvq/useCdvqTimer";
import { useCdvqQuestionStore } from "@/hooks/games/cdvq/useCdvqQuestionStore";
import { requests } from "@/lib/requests";
import { QuestionResposeDto } from "@/types/dtos/cdvq.dto";

const CdvqSocketHandlers = {
  timerUpdate: (timeLeft: number) => {
    const { setTimeLeft } = useCdvqTimer.getState();

    setTimeLeft(timeLeft);
  },

  gameEnded: () => {},
  gamePaused: () => {},
  gameResumed: () => {},

  question: async () => {
    const { setQuestion } = useCdvqQuestionStore.getState();

    const question = await requests
      .get<QuestionResposeDto>("/cdvq/question/current")
      .then((res) => res.data);

    setQuestion({
      ...question,
      content: question.questionText,
    });
  },

  answer: (answer: string) => {
    const { setChosenAnswer } = useCdvqQuestionStore.getState();

    setChosenAnswer(answer);
  },

  result: () => {},

  readyTimer: () => {},

  message: () => {},
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
  const { view } = useCdvqView((state) => state);

  useEffect(() => {
    registerHandlers(socket, CdvqSocketHandlers);

    return () => {
      unregisterHandlers(socket, CdvqSocketHandlers);
    };
  }, []);

  return (
    <AnimatePresence>
      <Box as={motion.div}>
        <Show when={view === CdvqView.Question}>
          <QuestionView />
        </Show>

        <Show when={view === CdvqView.Results}>
          <WaitingView />
        </Show>
      </Box>
    </AnimatePresence>
  );
}
