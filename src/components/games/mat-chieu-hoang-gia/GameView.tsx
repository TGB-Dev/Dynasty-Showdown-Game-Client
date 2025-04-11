"use client";

import {
  ButtonProps,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Progress,
  Show,
} from "@chakra-ui/react";
import ImageGridView from "./views/ImageGridView";
import { useMchgStore } from "@/hooks/games/useMchgStore";
import { MchgView } from "@/types/mchg-view.enum";
import AnswerMainQuestionView from "./views/AnswerMainQuestionView";
import AnswerSubQuestionView from "./views/AnswerSubQuestionView";
import SubQuestionAnswer from "./views/SubQuestionAnswer";
import RoundResult from "./views/RoundResult";
import type { Socket } from "socket.io-client";
import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { FaRegBell } from "react-icons/fa";
import { requestMainQuestion } from "@/lib/games/mchg";

const mchgSocketHandlers = {
  endGame: () => {},
  message: () => {},
  answerMainAnswer: () => {},

  updateStage: (stage: MchgView) => {
    const { setView } = useMchgStore.getState();
    setView(stage);
  },

  updateRunGameTimer: () => {},

  updateTimer: (timeLeft: number) => {
    const { setTimeLeft } = useMchgStore.getState();
    setTimeLeft(timeLeft);
  },

  updateRound: () => {},
  updateSolvedQuestions: () => {},
  pauseGame: () => {},
  resumeGame: () => {},
  broadcastQuestion: () => {},
  broadcastAnswers: () => {},
};

function registerHandlers(socket: Socket, handlers: typeof mchgSocketHandlers) {
  for (const [event, handler] of Object.entries(handlers)) {
    socket.on(event, handler);
  }
}

function unregisterHandlers(
  socket: Socket,
  handlers: typeof mchgSocketHandlers,
) {
  for (const event of Object.keys(handlers)) {
    socket.off(event);
  }
}

export default function GameView() {
  const { score, view, timeLeft } = useMchgStore((state) => state);

  useEffect(() => {
    registerHandlers(socket, mchgSocketHandlers);

    return () => {
      unregisterHandlers(socket, mchgSocketHandlers);
    };
  }, []);

  return (
    <Grid templateRows="auto auto 1fr" height="100vh" gap={2} userSelect="none">
      <GridItem>
        <Progress.Root max={30} value={timeLeft}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
      </GridItem>

      <GridItem>
        <Heading textAlign="center" size="3xl" m={4}>
          {score}
        </Heading>
      </GridItem>

      <GridItem>
        <Show when={view === MchgView.CHOOSING_QUESTION}>
          <ImageGridView />
        </Show>

        <Show when={view === MchgView.ANSWERING_SUB_QUESTION}>
          <AnswerSubQuestionView />
        </Show>

        <Show when={view === MchgView.ANSWERING_MAIN_QUESTION}>
          <AnswerMainQuestionView />
        </Show>

        <Show when={view === MchgView.SHOWING_SUB_QUESTION_ANSWER}>
          <SubQuestionAnswer />
        </Show>

        <Show when={view === MchgView.SHOWING_ROUND_RESULT}>
          <RoundResult />
        </Show>
      </GridItem>

      <BellButton position="fixed" right="8" bottom="8" />
    </Grid>
  );
}

function BellButton({ ...props }: ButtonProps) {
  return (
    <IconButton {...props} onClick={requestMainQuestion}>
      <FaRegBell />
    </IconButton>
  );
}
