"use client";
import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";
import Timer from "./Timer";
import PackageView from "./views/PackageView";
import { Flex, Stack } from "@chakra-ui/react";
import QuestionsView from "./views/QuestionsView";
import ResultsView from "./views/ResultsView";

function GameView() {
  const view = useTheGrandOrderStore((state) => state.view);
  return (
    <Stack h="100vh" overflowY="auto" paddingX={6} paddingY={10}>
      <Timer />
      <Flex grow="1" justifyContent="center" alignItems="center" paddingY={10}>
        {view === 1 && <PackageView />}
        {view === 2 && <QuestionsView />}
        {view === 3 && <ResultsView />}
      </Flex>
    </Stack>
  );
}

export default GameView;
