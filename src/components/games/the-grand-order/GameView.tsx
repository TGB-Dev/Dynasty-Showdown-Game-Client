import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";

function GameView() {
  const view = useTheGrandOrderStore((state) => state.view);
  return (
    <div>
      {view === 1 && <div />}
      {view === 2 && <div />}
      {view === 3 && <div />}
    </div>
  );
}

export default GameView;
