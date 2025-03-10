import { For, Table } from "@chakra-ui/react";
import useSWR from "swr";
import { fetchUsers } from "@/lib/admin";

export default function UsersTable() {
  const { data } = useSWR("/users", fetchUsers);

  return (
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader />
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Point</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <For each={data}>
          {(user, index) => (
            <Table.Row>
              <Table.Cell textAlign="end">{index + 1}</Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell textAlign="end">{user.point}</Table.Cell>
            </Table.Row>
          )}
        </For>
      </Table.Body>
    </Table.Root>
  );
}
