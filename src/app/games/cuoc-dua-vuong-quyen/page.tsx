import GameView from "@/components/games/cuoc-dua-vuong-quyen/GameView";
import { Flex } from "@chakra-ui/react";
import Leaderboard from "@/components/leaderboard";

export default function CuocDuaVuongQuyenPage() {
  return (
    <>
      <GameView />
      <Leaderboard />
    </>
  );
}
