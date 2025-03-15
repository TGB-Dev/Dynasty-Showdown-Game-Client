import { Button, Dialog, Portal } from "@chakra-ui/react";
import type { Game } from "@/types/games.enum";
import { startGame } from "@/lib/admin";
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
  const { trigger } = useGameToast(game);

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
              <Dialog.CloseTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.CloseTrigger>

              <Dialog.ActionTrigger asChild>
                <Button
                  colorPalette="primary"
                  onClick={() => {
                    void trigger();
                  }}
                >
                  Confirm
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

function useGameToast(game: Game) {
  const { data, trigger, isMutating, error } = useSWRMutation(
    "/start/game",
    async () => {
      return await startGame(game);
    },
  );

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
