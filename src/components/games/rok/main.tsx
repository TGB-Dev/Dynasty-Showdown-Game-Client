import { useROKStore } from "@/hooks/games/rok";
import { Card, CloseButton, Dialog, Flex, For, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function Main() {
  const [open, setOpen] = useState({ starter: true });

  return (
    <Flex direction="column" justify="center" align="center" w="100%" h="100vh">
      {/* Main Card */}
      <Flex
        direction="column"
        justify="center"
        align="center"
        w="100%"
        h="100%"
      >
        <Card.Root w="100%" h="100%" p={4}></Card.Root>
      </Flex>

      {/* Starter dialog */}
      <Dialog.Root
        open={open.starter}
        onOpenChange={(prev) => setOpen({ starter: !prev })}
        size="cover"
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content h="100%">
            <Dialog.CloseTrigger
              position="absolute"
              top="2"
              insetEnd="2"
              asChild
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Flex
              h="100%"
              direction="column"
              justify="space-between"
              align="center"
              py={16}
            >
              <Flex
                direction="column"
                justify="center"
                align="center"
                spaceY={4}
              >
                <Text fontSize={{ base: 24, md: 32 }} fontWeight={600}>
                  Rise of kingdom
                </Text>
                <Text
                  fontSize={{ base: 14, md: 20 }}
                  fontWeight={300}
                  lineHeight={1.5}
                  textAlign="center"
                  px={12}
                >
                  A strategy game where you can build your own kingdom
                </Text>
              </Flex>
              <Flex
                w="100%"
                h="50%"
                direction="column"
                justify="center"
                align="center"
              >
                Some demo pictures here
              </Flex>
            </Flex>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Flex>
  );
}
