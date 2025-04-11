"use client";

import { Box, Show } from "@chakra-ui/react";
import { AnimatePresence, motion } from "motion/react";
import QuestionView from "@/components/games/cuoc-dua-vuong-quyen/views/QuestionView";
import WaitingView from "@/components/games/cuoc-dua-vuong-quyen/views/ResultsView";
import ResultsView from "@/components/games/cuoc-dua-vuong-quyen/views/ResultsView";
import { useCdvqView } from "@/hooks/games/cdvq/useCdvqView";
import { CdvqView } from "@/types/cdvq-view.enum";
import { useEffect } from "react";
import { socket } from "@/lib/socket";
import type { Socket } from "socket.io-client";
import { useCdvqTimer } from "@/hooks/games/cdvq/useCdvqTimer";
import { useCdvqQuestionStore } from "@/hooks/games/cdvq/useCdvqQuestionStore";
import { requests } from "@/lib/requests";
import { AnswerResponseDto, QuestionResponseDto } from "@/types/dtos/cdvq.dto";
import { useCdvqReadyTimer } from "@/hooks/games/cdvq/useCdvqReadyTimer";
import ReadyView from "@/components/games/cuoc-dua-vuong-quyen/views/ReadyView";
import { useCdvqAnswer } from "@/hooks/games/cdvq/useCdvqAnswer";
import AnswerView from "@/components/games/cuoc-dua-vuong-quyen/views/AnswerView";

const CdvqSocketHandlers = {
  timerUpdate: (timeLeft: number) => {
    const { setTimeLeft } = useCdvqTimer.getState();

    setTimeLeft(timeLeft);
  },

  gameEnded: () => {
    console.log("Game Ended!");
  },

  gamePaused: () => {},
  gameResumed: () => {},

  question: async () => {
    const { setView } = useCdvqView.getState();
    const { setQuestion } = useCdvqQuestionStore.getState();

    setView(CdvqView.Question);

    const question = await requests
      .get<QuestionResponseDto>("/cdvq/questions/current")
      .then((res) => res.data);

    setQuestion({
      ...question,
      answers: question.options,
      content: question.questionText,
    });
  },

  answer: async () => {
    const { setView } = useCdvqView.getState();
    const { setAnswer } = useCdvqAnswer.getState();

    setView(CdvqView.Answer);

    const answer = await requests
      .get<AnswerResponseDto>("/cdvq/game/answer")
      .then((res) => res.data);

    setAnswer({
      answer: answer.answer,
      isCorrect: answer.correct,
    });
  },

  result: () => {
    const { setView } = useCdvqView.getState();

    setView(CdvqView.Results);
  },

  readyTimer: (timeLeft: number) => {
    const { setView } = useCdvqView.getState();
    const { setTime } = useCdvqReadyTimer.getState();

    setView(CdvqView.Ready);
    setTime(timeLeft + 1);
  },

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
