"use client";

import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";
import PackageView from "./views/PackageView";
import { Stack } from "@chakra-ui/react";
import { TgoRoundStage } from "@/types/games/tgo.enum";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { socket } from "@/lib/socket";
import QuestionsView from "@/components/games/the-grand-order/views/QuestionsView";
import WaitingView from "@/components/games/the-grand-order/views/WaitingView";
import AttackView from "@/components/games/the-grand-order/views/AttackView";

const socketHandlers = {
  updateStage: (stage: TgoRoundStage) => {
    const { setStage, setAnswered } = useTheGrandOrderStore.getState();
    setStage(stage);
    setAnswered(false);
  },

  timerUpdate: (time: number) => {
    useTheGrandOrderStore.getState().setTimeLeft(time);
  },
};

function registerHandlers(socket: Socket, handlers: typeof socketHandlers) {
  for (const [event, handler] of Object.entries(handlers)) {
    socket.on(event, handler);
  }
}

function unregisterHandlers(socket: Socket, handlers: typeof socketHandlers) {
  for (const event of Object.keys(handlers)) {
    socket.off(event);
  }
}

export default function GameView() {
  useEffect(() => {
    registerHandlers(socket, socketHandlers);

    return () => {
      unregisterHandlers(socket, socketHandlers);
    };
  }, []);

  const { stage } = useTheGrandOrderStore();

  // const stage = TgoRoundStage.ATTACKING_AND_SHOWING_RESULT;

  return (
    <Stack minH="100vh" p={4} userSelect="none">
      {stage === TgoRoundStage.CHOOSING_AND_ANSWERING && <PackageView />}
      {stage === TgoRoundStage.ANSWERING && <QuestionsView />}
      {stage === TgoRoundStage.ATTACKING_AND_SHOWING_RESULT && <AttackView />}
      {stage === TgoRoundStage.WAITING && <WaitingView />}
    </Stack>
  );
}
