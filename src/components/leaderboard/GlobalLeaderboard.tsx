import useSWR from "swr";
import { fetchLeaderboard } from "@/lib/leaderboard";
import { For, Table } from "@chakra-ui/react";

export default function GlobalLeaderboard() {
  const { data } = useSWR("/users", fetchLeaderboard);
  const sortedData = data ?? [];

  return (
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
  );
}
