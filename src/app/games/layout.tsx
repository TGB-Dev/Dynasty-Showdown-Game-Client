"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { socket } from "@/lib/socket";
import { getRunningGame } from "@/lib/game";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const redirectToGame = useCallback(
    (gameName: string) => {
      if (gameName === "cdvq") {
        router.push("/games/cuoc-dua-vuong-quyen");
      } else if (gameName === "mchg") {
        router.push("/games/mat-chieu-hoang-gia");
      } else if (gameName === "tgo") {
        router.push("/games/the-grand-order");
      } else if (gameName === "rok") {
        router.push("/games/rise-of-kingdom");
      }
    },
    [router],
  );

  useEffect(() => {
    (async () => {
      const game = await getRunningGame();
      if (game?.game) {
        redirectToGame(game.game);
      }
    })();

    socket.on("joinedRoom", (gameName) => {
      console.log("Joined room:", gameName);
      redirectToGame(gameName);

      return () => socket.off("joinedRoom");
    });
  }, [redirectToGame]);

  return children;
}
