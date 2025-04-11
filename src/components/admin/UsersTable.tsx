import { For, Table } from "@chakra-ui/react";
import useSWR from "swr";
import { FETCH_USERS_API_PATH } from "@/lib/admin";
import { Checkbox } from "@/components/ui/checkbox";
import { UsersActionBar } from "@/components/admin/UsersActionBar";
import { useUsersStore } from "@/hooks/admin/useUsersStore";

export default function UsersTable() {
  const { users, selectedUsersId, toggleUser, toggleAllUsers, fetch } =
    useUsersStore((state) => state);
  const isIndeterminate = useUsersStore((state) => state.isIndeterminate());

  useSWR(FETCH_USERS_API_PATH, fetch);

  return (
    <>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="6">
              <Checkbox
                checked={
                  isIndeterminate
                    ? "indeterminate"
                    : !(selectedUsersId.length === 0)
                }
                onCheckedChange={toggleAllUsers}
              />
            </Table.ColumnHeader>
            <Table.ColumnHeader w="6" />
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Point</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <For each={users}>
            {(user, index) => (
              <Table.Row key={user.id}>
                <Table.Cell>
                  <Checkbox
                    checked={selectedUsersId.includes(user.id)}
                    onCheckedChange={() => {
                      toggleUser(user.id);
                    }}
                  />
                </Table.Cell>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell textAlign="end">{user.point}</Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>

      <UsersActionBar />
    </>
  );
}
