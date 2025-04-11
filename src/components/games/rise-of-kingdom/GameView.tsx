import ChoosingCityView from "@/components/games/rise-of-kingdom/views/ChoosingCityView";
import { RokStage } from "@/types/games/rok/rok-stage.enum";
import { useRokStore } from "@/hooks/games/useRokStore";

export default function GameView() {
  const { stage } = useRokStore();

  return (
    <>
      {/*{stage === "main" && <Main />}*/}
      {stage === RokStage.CHOOSE_CITY && <ChoosingCityView />}
      {/*{stage === "attacker" && <Attacker />}*/}
      {/*{stage === "defender" && <Defender />}*/}
    </>
  );
}
