import { ActionBar, Button, For, Portal, Table, Text } from "@chakra-ui/react";
import useSWR from "swr";
import { fetchUsers } from "@/lib/admin";
import { useCallback, useState } from "react";
import type { User } from "@/types/user.types";
import { Checkbox } from "@/components/ui/checkbox";

type UserIdType = typeof User.prototype.id;

export default function UsersTable() {
  const { data } = useSWR("/users", fetchUsers);
  const [selection, setSelection] = useState<UserIdType[]>([]);

  const hasSelection = selection.length > 0;
  const indeterminate =
    hasSelection && data !== undefined && selection.length < data.length;

  const selectAllUsers = useCallback(() => {
    if (data !== undefined) setSelection(data.map((user) => user.id));
  }, [data]);

  const deselectAllUsers = useCallback(() => {
    setSelection([]);
  }, []);

  const toggleUser = useCallback(
    (user: User) => {
      if (selection.includes(user.id)) {
        setSelection((prev) => prev.filter((id) => id !== user.id));
      } else {
        setSelection((prev) => [...prev, user.id]);
      }
    },
    [selection],
  );

  return (
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader w="6">
            <Checkbox
              checked={
                indeterminate
                  ? "indeterminate"
                  : selection.length === data?.length
              }
              onCheckedChange={(change) => {
                typeof change.checked === "boolean" && change.checked
                  ? selectAllUsers()
                  : deselectAllUsers();
              }}
            />
          </Table.ColumnHeader>
          <Table.ColumnHeader w="6" />
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Point</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <For each={data}>
          {(user, index) => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Checkbox
                  checked={selection.includes(user.id)}
                  onCheckedChange={() => {
                    toggleUser(user);
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

      <ActionBar.Root open={hasSelection}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                {selection.length} selected
              </ActionBar.SelectionTrigger>

              <ActionBar.Separator />

              <Button variant="outline" size="sm">
                Modify point
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </Table.Root>
  );
}
