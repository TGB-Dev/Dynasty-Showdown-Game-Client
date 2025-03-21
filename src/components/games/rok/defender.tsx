import { useROKStore } from "@/hooks/games/rok";
import { Card, Dialog, Flex, For, Text } from "@chakra-ui/react";
import React from "react";
import { FaCircle } from "react-icons/fa";
import { LuSwords } from "react-icons/lu";

export default function Attacker() {
  const options = ["A. Answer", "B. Answer", "C. Answer", "D. Answer"];
  const colors = ["red.600", "yellow.500", "green.600", "blue.600"];

  const {} = useROKStore();

  return (
    <>
      {/* Question Card */}
      <Flex h="100%" direction="column" align="center" gap={4} py={4}>
        <Card.Root
          w="100%"
          h="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          direction="column"
          spaceY={2}
        >
          <Text fontSize={32} fontWeight={600}>
            Question: 1
          </Text>
          <Text>What is your name?</Text>
        </Card.Root>
        <Flex w="100%" h="50%" wrap="wrap" gap={2}>
          <For each={colors}>
            {(color, index) => (
              <Card.Root
                key={index}
                w="calc(50% - 4px)"
                display="flex"
                direction="column"
                justifyContent="center"
                alignItems="center"
                bg={color}
                spaceY={1}
              >
                <FaCircle size={24} color="white" />
                <Text fontSize={16} color="white" px={4} textAlign="center">
                  {options[index]} {index + 1}
                </Text>
              </Card.Root>
            )}
          </For>
        </Flex>
      </Flex>

      {/* Attack Dialog */}
      <Dialog.Root open={false} size="full">
        <Dialog.Positioner>
          <Dialog.Content h="100%">
            <Flex
              h="100%"
              direction="column"
              justify="center"
              align="center"
              spaceY={4}
            >
              <LuSwords size={64} color="red" />
              <Text fontSize={24} fontWeight={500} color="red">
                Attack Turn
              </Text>
            </Flex>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
}
