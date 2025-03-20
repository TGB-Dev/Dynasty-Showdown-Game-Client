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
    <Stack gap={20} padding={10} fontSize={16}>
      <Timer />
      <Flex justifyContent="center">
        {view === 1 && <PackageView />}
        {view === 2 && <QuestionsView />}
        {view === 3 && <ResultsView />}
      </Flex>
    </Stack>
  );
}

export default GameView;
