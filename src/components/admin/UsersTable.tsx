import { ActionBar, Button, For, Portal, Table } from "@chakra-ui/react";
import useSWR, { type Fetcher } from "swr";
import { fetchUsers } from "@/lib/admin";
import type { User } from "@/types/user.types";
import { Checkbox } from "@/components/ui/checkbox";
import { create } from "zustand";

interface UsersState {
  users: User[];
  selectedUsers: string[];
  toggleUser: (id: string) => void;
  toggleAllUsers: () => void;
  selectAllUsers: () => void;
  deselectAllUsers: () => void;
  isIndeterminate: () => boolean;
  fetch: Fetcher;
}

const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  selectedUsers: [],

  isIndeterminate: () => {
    const { selectedUsers, users } = get();
    return selectedUsers.length > 0 && selectedUsers.length < users.length;
  },

  toggleUser: (id: string) => {
    set((state) => {
      const selectedUsers = state.selectedUsers.includes(id)
        ? state.selectedUsers.filter((selectedId) => selectedId !== id)
        : [...state.selectedUsers, id];

      return { ...state, selectedUsers };
    });
  },

  toggleAllUsers: () => {
    const { selectedUsers, users, selectAllUsers, deselectAllUsers } = get();

    if (selectedUsers.length === users.length) deselectAllUsers();
    else selectAllUsers();
  },

  selectAllUsers: () => {
    set((state) => ({
      ...state,
      selectedUsers: state.users.map((user) => user.id),
    }));
  },

  deselectAllUsers: () => {
    set((state) => ({ ...state, selectedUsers: [] }));
  },

  fetch: async () => {
    await fetchUsers().then((users) => {
      set((state) => ({ ...state, users }));
    });
  },
}));

export default function UsersTable() {
  const { users, selectedUsers, toggleUser, toggleAllUsers, fetch } =
    useUsersStore((state) => state);
  const isIndeterminate = useUsersStore((state) => state.isIndeterminate());

  useSWR("/users", fetch);

  const hasSelection = selectedUsers.length > 0;

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
                    : !(selectedUsers.length === 0)
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
                    checked={selectedUsers.includes(user.id)}
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

      <ActionBar.Root open={hasSelection}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                {selectedUsers.length} selected
              </ActionBar.SelectionTrigger>

              <ActionBar.Separator />

              <Button variant="outline" size="sm">
                Modify point
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  );
}
