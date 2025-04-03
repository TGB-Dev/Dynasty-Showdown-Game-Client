import { Stack } from "@chakra-ui/react";
import QuestionsView from "./views/QuestionsView";

function GameView() {
  return (
    <Stack height="fit" padding={4}>
      <QuestionsView />
    </Stack>
  );
}

export default GameView;
