"use client";
import { Box, Flex, For, Show, SimpleGrid, Spinner } from "@chakra-ui/react";
import useSWR from "swr";
import { fetchResults } from "@/lib/games/cdvq";

function ResultsTileBoard() {
  const { data } = useSWR("/cdvq/game/result", fetchResults);

  if (data === undefined) {
    return <Spinner size="xl" />;
  }

  return (
    <SimpleGrid width="full" columns={3} position="relative" maxW="sm" p={0}>
      <For each={data}>
        {(result, index) => (
          <ResultsTile key={index} value={index + 1} show={true} />
        )}
      </For>
    </SimpleGrid>
  );
}

function ResultsTile({
  show = false,
  value,
}: {
  show?: boolean;
  value: number;
}) {
  return (
    <Box width="full" height="full" aspectRatio={1}>
      <Show when={show}>
        <Flex
          fontWeight="bold"
          width="full"
          height="full"
          bg="teal"
          alignItems="center"
          justifyContent="center"
          color="white"
        >
          {value}
        </Flex>
      </Show>
    </Box>
  );
}

export default function ResultsView() {
  return (
    <Flex justify="center" alignItems="center" height="full">
      <ResultsTileBoard />
    </Flex>
  );
}
