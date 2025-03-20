import { useROKStore } from "@/hooks/games/rok";
import { Card, Flex, For, Text } from "@chakra-ui/react";

export default function Main() {
  const { matrix } = useROKStore();

  return (
    <Flex
      direction={"column"}
      align={"center"}
      w={"100%"}
      h={"100vh"}
      pt={16}
      spaceY={6}
    >
      <Text fontSize={48} fontWeight={600}>
        Rise of kingdom
      </Text>
      <Flex direction={"column"}>
        <For each={matrix}>
          {(items, i) => (
            <Flex key={i} direction={"row"}>
              <For each={items}>
                {(item, is) => (
                  <Card.Root
                    key={is}
                    w={"3rem"}
                    h={"3rem"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    p={4}
                    m={0.5}
                  >
                    {item}
                  </Card.Root>
                )}
              </For>
            </Flex>
          )}
        </For>
      </Flex>
    </Flex>
  );
}
