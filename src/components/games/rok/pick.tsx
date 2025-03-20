import { useROKStore } from "@/hooks/games/rok";
import { Card, Flex, For } from "@chakra-ui/react";

export default function Pick() {
  const { matrix } = useROKStore();

  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      w={"100%"}
      h={"100vh"}
    >
      <Flex direction={"column"}>
        <For each={matrix}>
          {(items, i) => (
            <Flex key={i} direction={"row"}>
              <For each={items}>
                {(item, is) => (
                  <Card.Root
                    key={is}
                    w={"2rem"}
                    aspectRatio={1}
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
