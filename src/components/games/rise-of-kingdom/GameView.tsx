import Pick from "@/components/games/rise-of-kingdom/views/pick";
import { RokStage } from "@/types/games/rok/rok-stage.enum";
import { useRokStore } from "@/hooks/games/useRokStore";

export default function GameView() {
  const { stage } = useRokStore();

  return (
    <>
      {/*{stage === "main" && <Main />}*/}
      {stage === RokStage.CHOOSE_CITY && <Pick />}
      {/*{stage === "attacker" && <Attacker />}*/}
      {/*{stage === "defender" && <Defender />}*/}
    </>
  );
}
