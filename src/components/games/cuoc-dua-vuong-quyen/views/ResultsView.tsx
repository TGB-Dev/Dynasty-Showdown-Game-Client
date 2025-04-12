"use client";
import { Box, Flex, For, Heading, Spinner, Table } from "@chakra-ui/react";
import useSWR from "swr";
import { fetchResults } from "@/lib/games/cdvq";

function ResultsTileBoard() {
  const { data } = useSWR("/cdvq/game/result", fetchResults);

  if (data === undefined) {
    return <Spinner size="xl" />;
  }

  return (
    <Table.Root maxW="lg">
      <Table.Header>
        <Table.Row>
          <Table.Cell>Hạng</Table.Cell>
          <Table.Cell fontWeight="bold">Người chơi</Table.Cell>
          <Table.Cell>Thời gian nộp</Table.Cell>
          <Table.Cell>Điểm thưởng</Table.Cell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <For each={data}>
          {(record, index) => (
            <Table.Row key={record.username}>
              <Table.Cell textAlign="center">{index + 1}</Table.Cell>
              <Table.Cell fontWeight="bold">{record.username}</Table.Cell>
              <Table.Cell>
                {new Date(record.createdAt).toLocaleTimeString()}
              </Table.Cell>
              <Table.Cell textAlign="center">{record.score}</Table.Cell>
            </Table.Row>
          )}
        </For>
      </Table.Body>
    </Table.Root>
  );
}

export default function ResultsView() {
  return (
    <Flex minH="100vh" px={4} py={8}>
      <Box m="auto">
        <Heading size="2xl" textAlign="center" mb={6}>
          Kết quả
        </Heading>

        <ResultsTileBoard />
      </Box>
    </Flex>
  );
}
