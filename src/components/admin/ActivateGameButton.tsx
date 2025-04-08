import { Button, Dialog, Portal } from "@chakra-ui/react";
import type { Game } from "@/types/games.enum";
import { runGame, startGame } from "@/lib/admin";
import { toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";

export interface ActivateGameButtonProps {
  game: Game;
}

export default function ActivateGameButton({ game }: ActivateGameButtonProps) {
  return (
    <StartGameConfirmDialog game={game}>
      <Button w="100%">{game}</Button>
    </StartGameConfirmDialog>
  );
}

export interface StartGameConfirmDialogProps {
  game: Game;
  children: React.ReactNode;
}

function StartGameConfirmDialog({
  game,
  children,
}: StartGameConfirmDialogProps) {
  const triggerStart = useGameToast(game, useStartGameMutation);
  const triggerRun = useGameToast(game, useRunGameMutation);

  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Confirm</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              Do you really want to start <b>{game}</b>?
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  colorPalette="primary"
                  onClick={() => {
                    void triggerStart.trigger();
                  }}
                >
                  Start game
                </Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  colorPalette="primary"
                  onClick={() => {
                    void triggerRun.trigger();
                  }}
                >
                  Run game
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

function useStartGameMutation(game: Game) {
  return useSWRMutation("/start/game", async () => {
    return await startGame(game);
  });
}

function useRunGameMutation(game: Game) {
  return useSWRMutation("/run/game", async () => {
    return await runGame(game);
  });
}
function useGameToast(game: Game, mutateFunc: (game: Game) => any) {
  const { data, trigger, isMutating, error } = mutateFunc(game);

  const [toastId, setToastId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isMutating)
      setToastId(
        toaster.upsert({
          title: `Game: ${game}`,
          description: "Starting...",
          type: "loading",
        }),
      );
  }, [isMutating, game]);

  useEffect(() => {
    if (error != null) {
      setToastId(
        toaster.upsert({
          id: toastId,
          description: "Error occurred. Please check log.",
          type: "error",
        }),
      );
    }
  }, [toastId, error]);

  useEffect(() => {
    if (data != null) {
      setToastId(
        toaster.upsert({
          id: toastId,
          description: "Started successfully.",
          type: "success",
        }),
      );
    }
  }, [data, toastId]);

  return { trigger };
}
