"use client";
import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";
import Timer from "./Timer";

function GameView() {
  const view = useTheGrandOrderStore((state) => state.view);
  return (
    <div>
      <Timer />
      {view === 1 && <div />}
      {view === 2 && <div />}
      {view === 3 && <div />}
    </div>
  );
}

export default GameView;
