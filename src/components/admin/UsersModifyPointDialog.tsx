import { useUsersStore } from "@/hooks/admin/useUsersStore";
import { mutate } from "swr";
import { FETCH_USERS_API_PATH } from "@/lib/admin";
import {
  Button,
  Code,
  Dialog,
  Flex,
  For,
  Input,
  Portal,
  Text,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface UsersModifyPointDialogProps {
  children: React.ReactNode;
}

interface ModifyPointFormData {
  point: number;
  reason: string;
}

export function UsersModifyPointDialog({
  children,
}: UsersModifyPointDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedUsers = useUsersStore.getState().getSelectedUsers();
  const updateUsers = () => {
    void mutate(FETCH_USERS_API_PATH);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ModifyPointFormData>();
  const onSubmit = () => {
    setIsOpen(false);
  };

  return (
    <Dialog.Root
      placement="center"
      open={isOpen}
      onOpenChange={(details) => {
        if (details.open) {
          reset();
        } else {
          updateUsers();
        }
        setIsOpen(details.open);
      }}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content as="form" onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Header>
              <Dialog.Title>Modify point</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Text mb="1">Modifying point for selected users:</Text>
              <Flex gap="1" wrap="wrap">
                <For each={selectedUsers}>
                  {(user) => <Code key={user.id}>{user.name}</Code>}
                </For>
              </Flex>

              <Field
                label="Point"
                helperText="Ex: 20, -20"
                required
                mt="4"
                errorText="Point must be a non-zero number"
                invalid={errors.point !== undefined}
              >
                <Input
                  type="number"
                  {...register("point", {
                    required: true,
                    valueAsNumber: true,
                    validate: (value) => value !== 0,
                  })}
                />
              </Field>

              <Field label="Reason" mt="4">
                <Input />
              </Field>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.CloseTrigger>

              <Button colorPalette="primary" type="submit">
                Confirm
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
