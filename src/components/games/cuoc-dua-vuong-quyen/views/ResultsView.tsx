"use client";
import { Box, Flex, For, Grid, Spinner } from "@chakra-ui/react";
import useSWR from "swr";
import { fetchResults } from "@/lib/games/cdvq";

function ResultsTileBoard() {
  const { data } = useSWR("/cdvq/game/result", fetchResults);

  if (data === undefined) {
    return <Spinner size="xl" />;
  }

  return (
    <Grid
      templateColumns="repeat(3, minmax(100px, 1fr))"
      maxW="sm"
      maxH="md"
      overflowY="auto"
      width="100%"
      mx="auto"
    >
      <For each={data.results}>
        {(result) => (
          <For each={["username", "answerTime", "score"]}>
            {(attr, index) => <ResultsTile key={index} value={result[attr]} />}
          </For>
        )}
      </For>
    </Grid>
  );
}

function ResultsTile({ value }: { value: number | string }) {
  return (
    <Box width="full" height="full">
      <Box
        maxWidth="full"
        height="full"
        color="white"
        borderColor="white"
        borderWidth="1px"
        paddingX={4}
        paddingY={2}
        textAlign="center"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {value}
      </Box>
    </Box>
  );
}

export default function ResultsView() {
  return (
    <Flex
      direction="column"
      justify="center"
      alignItems="center"
      height="100vh"
      gap={4}
    >
      <Box as="b">Kết quả</Box>
      <ResultsTileBoard />
    </Flex>
  );
}
