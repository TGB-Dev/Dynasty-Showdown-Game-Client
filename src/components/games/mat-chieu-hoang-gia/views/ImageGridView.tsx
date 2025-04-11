"use client";
import { Box, Flex, For, Show, SimpleGrid, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import useSWR from "swr";
import { fetchCurrentRound } from "@/lib/games/mchg";

export default function ImageGridView() {
  return (
    <Flex justify="center" alignItems="center" height="full">
      <ImageTileBoard />
    </Flex>
  );
}

function ImageTileBoard() {
  const { data } = useSWR("/mchg/rounds/current", fetchCurrentRound);

  if (data === undefined) {
    return <Spinner size="xl" />;
  }

  return (
    <SimpleGrid width="full" columns={3} position="relative" maxW="sm" p={0}>
      <For each={data.questions}>
        {(question, index) => (
          <ImageTile key={index} value={index + 1} show={!question.solved} />
        )}
      </For>

      <Box
        aspectRatio={3 / 2}
        position="absolute"
        width="full"
        left={0}
        top={0}
        right={0}
        bottom={0}
        zIndex={-10}
      >
        <Image
          src="https://picsum.photos/300/200"
          alt="ansPic"
          width="384"
          height="256"
        />
      </Box>
    </SimpleGrid>
  );
}

function ImageTile({ show = false, value }: { show?: boolean; value: number }) {
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
        >
          {value}
        </Flex>
      </Show>
    </Box>
  );
}
