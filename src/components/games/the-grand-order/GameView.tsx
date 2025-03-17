"use client";
import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";
import Timer from "./Timer";
import PackageView from "./views/PackageView";
import { Stack } from "@chakra-ui/react";

function GameView() {
  const view = useTheGrandOrderStore((state) => state.view);
  return (
    <Stack gap={20} padding={10}>
      <Timer />
      {view === 1 && <PackageView />}
      {view === 2 && <div />}
      {view === 3 && <div />}
    </Stack>
  );
}

export default GameView;
