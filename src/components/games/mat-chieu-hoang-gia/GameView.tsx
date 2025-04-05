"use client";
import { Grid, GridItem, Progress } from "@chakra-ui/react";
import QuestionsView from "./views/QuestionsView";
import { useMCHGStore } from "@/hooks/games/useMCHGStore";
import BellView from "./views/BellView";

function GameView() {
  const view = useMCHGStore((state) => state.view);
  const score = useMCHGStore((state) => state.score);
  return (
    <Grid templateRows="auto auto 1fr" height="100vh" gap={2}>
      <GridItem>
        <Progress.Root max={30}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
      </GridItem>
      <GridItem marginLeft={4}>Điểm hiện tại: {score} điểm</GridItem>
      <GridItem padding={4}>
        {view == 1 ? <QuestionsView /> : <BellView />}
      </GridItem>
    </Grid>
  );
}

export default GameView;
