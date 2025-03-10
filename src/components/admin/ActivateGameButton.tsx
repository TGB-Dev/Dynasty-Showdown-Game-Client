import { Button, Dialog, Portal } from "@chakra-ui/react";
import type { Game } from "@/types/games.enum";
import { startGame } from "@/lib/admin";

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
                    startGame(game);
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
