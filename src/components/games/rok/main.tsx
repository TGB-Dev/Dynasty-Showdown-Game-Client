import { useROKStore } from "@/hooks/games/rok";
import { Card, CloseButton, Dialog, Flex, For, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function Main() {
  const [open, setOpen] = useState(true);

  return (
    <Flex direction="column" justify="center" align="center" w="100%" h="100vh">
      <Dialog.Root
        open={open}
        onOpenChange={({ open }) => setOpen(open)}
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
              <Flex direction="column" justify="center" align="center">
                <Text fontSize='min(1rem, max(4vh, 2rem)' fontWeight={600}>
                  Rise of kingdom
                </Text>
                <Text fontSize={{ base: 12, md: 24 }} fontWeight={400}>
                  A strategy game where you can build your own kingdom
                </Text>
              </Flex>
            </Flex>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Flex>
  );
}

// <Flex
//   direction={"column"}
//   align={"center"}
//   w={"100%"}
//   h={"100vh"}
//   pt={16}
//   spaceY={6}
// >
//   <Text fontSize={48} fontWeight={600}>
//     Rise of kingdom
//   </Text>
//   <Flex direction={"column"}>
//     <For each={matrix}>
//       {(items, i) => (
//         <Flex key={i} direction={"row"}>
//           <For each={items}>
//             {(item, is) => (
//               <Card.Root
//                 key={is}
//                 w={"3rem"}
//                 h={"3rem"}
//                 display={"flex"}
//                 justifyContent={"center"}
//                 alignItems={"center"}
//                 p={4}
//                 m={0.5}
//               >
//                 {item}
//               </Card.Root>
//             )}
//           </For>
//         </Flex>
//       )}
//     </For>
//   </Flex>
// </Flex>
