"use client";

import { For, Table } from "@chakra-ui/react";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { fetchUsers } from "@/lib/leaderboard";
import useSWR from "swr";
import { useState, useEffect } from "react";
import io from "socket.io-client";

export default function LeaderboardPage() {
  return (
    <div>
      <Container maxW="lg" as="main">
        <Flex direction="column" gap="4">
          <LeaderboardSection />
        </Flex>
      </Container>
    </div>
  );
}
function LeaderboardSection() {
  const { data } = useSWR("/users", fetchUsers);
  const sortedData = data ? [...data].sort((a, b) => b.point - a.point) : [];

  return (
    <div>
      <Container as="section" id="users">
        <Heading as="h2">Leaderboard</Heading>
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader textAlign="">Rank</Table.ColumnHeader>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Point</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <For each={sortedData}>
              {(user, index) => (
                <Table.Row key={user.id}>
                  <Table.Cell textAlign="">{index + 1}</Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell textAlign="end">{user.point}</Table.Cell>
                </Table.Row>
              )}
            </For>
          </Table.Body>
        </Table.Root>
      </Container>
    </div>
  );
}
