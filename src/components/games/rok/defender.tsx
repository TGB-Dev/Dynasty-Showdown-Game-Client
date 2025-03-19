import { Card, Flex, For, Text } from "@chakra-ui/react";
import React from "react";
import { FaRegSquare } from "react-icons/fa";

export default function Defender() {
  const options = ["A. Answer", "B. Answer", "C. Answer", "D. Answer"];

  return (
      <Flex pt={16} direction={"column"} spaceY={24}>
        <Card.Root h={"45vh"}>
          <Flex
            h={"100%"}
            direction={"column"}
            justify={"center"}
            align={"center"}
            spaceY={4}
          >
            <Text fontSize={32} fontWeight={600}>
              Question: 1
            </Text>
            <Text>What is your name?</Text>
          </Flex>
        </Card.Root>
        <Flex wrap={"wrap"} justify={"space-between"} gapY={8}>
          <For each={options}>
            {(option, i) => (
              <Card.Root key={i} w={"47.5%"} h={"15vh"}>
                <Flex h={"100%"} direction={"column"}>
                  <Flex
                    justify={"start"}
                    align={"center"}
                    w={"100%"}
                    h={"100%"}
                    px={8}
                    spaceX={16}
                  >
                    <FaRegSquare size={28} />
                    <Text>{option}</Text>
                  </Flex>
                </Flex>
              </Card.Root>
            )}
          </For>
        </Flex>
      </Flex>
  );
}
