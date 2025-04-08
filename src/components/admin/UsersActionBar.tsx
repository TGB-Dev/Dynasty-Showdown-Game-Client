import { ActionBar, Button, Portal } from "@chakra-ui/react";
import { useUsersStore } from "@/hooks/admin/useUsersStore";
import { UsersModifyPointDialog } from "@/components/admin/UsersModifyPointDialog";

export function UsersActionBar() {
  const { selectedUsersId } = useUsersStore((state) => state);
  const hasSelection = selectedUsersId.length > 0;

  return (
    <ActionBar.Root open={hasSelection}>
      <Portal>
        <ActionBar.Positioner>
          <ActionBar.Content>
            <ActionBar.SelectionTrigger>
              {selectedUsersId.length} selected
            </ActionBar.SelectionTrigger>

            <ActionBar.Separator />

            <UsersModifyPointDialog>
              <Button variant="outline" size="sm">
                Modify point
              </Button>
            </UsersModifyPointDialog>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    </ActionBar.Root>
  );
}
