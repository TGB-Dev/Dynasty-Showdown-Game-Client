import { useROKStore } from "@/hooks/games/rok";
import { Card, Dialog, Flex, For, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { LuSwords } from "react-icons/lu";
import { RxCheck, RxCross2 } from "react-icons/rx";
import CountDown from "./countDown";

export default function Defender() {
  const colors = ["red.600", "yellow.500", "green.600", "blue.600"];

  const [open, setOpen] = useState<OpenState>({
    defend: true,
    correct: false,
    wrong: false,
  });

  const {
    question,
    questionIndex: i,
    setScene,
    setQuestionIndex: setI,
    setSuccess,
  } = useROKStore();

  const handleClickAnswer = (answer: string) => {
    const isCorrect = answer === question[i].answer;

    setOpen((prev: OpenState) => ({
      ...prev,
      correct: isCorrect,
      wrong: !isCorrect,
    }));
    (prev: Success) => setSuccess({ ...prev, defend: isCorrect });
    (prev: number) => setI(prev + 1);
  };

  const handleOffDialog = (dialog: keyof OpenState, callback?: () => void) => {
    setOpen({ ...open, [dialog]: false });
    callback && callback();
  };

  const handleNextScene = () => {
    setScene("main");
  };

  return (
    <>
      {/* Question Card */}
      <Flex h="100%" direction="column" align="center" gap={4} py={4}>
        {!open.defend && (
          <CountDown
            seconds={20}
            color="black"
            callback={() => handleClickAnswer("")}
            progress
          />
        )}
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
            Question: {question[i].id}
          </Text>
          <Text>{question[i].question}</Text>
        </Card.Root>
        <Flex w="100%" h="50%" wrap="wrap" gap={2}>
          <For each={question[i].options}>
            {(question, i) => (
              <Card.Root
                key={i}
                w="calc(50% - 4px)"
                display="flex"
                direction="column"
                justifyContent="center"
                alignItems="center"
                bg={colors[i]}
                spaceY={1}
                onClick={() => handleClickAnswer(question)}
              >
                <FaCircle size={24} color="white" />
                <Text fontSize={16} color="white" px={4} textAlign="center">
                  {question}
                </Text>
              </Card.Root>
            )}
          </For>
        </Flex>

        {/* Dialogs */}
        <For each={Object.keys(open) as (keyof OpenState)[]}>
          {(type) => (
            <Dialog.Root key={type} open={open[type]} size="full">
              <Dialog.Positioner>
                <Dialog.Content h="100%">
                  <Flex
                    h="100%"
                    direction="column"
                    justify="space-between"
                    align="center"
                    bg={
                      type === "correct"
                        ? "green.500"
                        : type === "wrong"
                          ? "red.500"
                          : undefined
                    }
                    py={8}
                    onClick={
                      type !== "defend"
                        ? () => handleOffDialog(type, () => handleNextScene())
                        : undefined
                    }
                  >
                    {type === "defend" && (
                      <>
                        <Text fontSize={13} fontWeight={400}>
                          {" "}
                        </Text>
                        <Flex justify="center" align="center">
                          <LuSwords size={72} color="red" />
                          <Text fontSize={24} fontWeight={500} color="red">
                            Defend Turn
                          </Text>
                        </Flex>
                        <CountDown
                          seconds={3}
                          color="red"
                          callback={() => handleOffDialog("defend")}
                        />
                      </>
                    )}
                    {type === "correct" && (
                      <>
                        <CountDown
                          seconds={3}
                          color="white"
                          callback={() =>
                            handleOffDialog("correct", () => handleNextScene())
                          }
                        />
                        <Flex justify="center" align="center">
                          <Text fontSize={40} fontWeight={500} color="white">
                            Correct
                          </Text>
                          <RxCheck size={72} color="white" />
                        </Flex>
                        <Text fontSize={13} fontWeight={400} color="white">
                          Click anywhere to continue
                        </Text>
                      </>
                    )}
                    {type === "wrong" && (
                      <>
                        <CountDown
                          seconds={3}
                          color="white"
                          callback={() =>
                            handleOffDialog("wrong", () => handleNextScene())
                          }
                        />
                        <Flex justify="center" align="center">
                          <Text fontSize={40} fontWeight={500} color="white">
                            Incorrect
                          </Text>
                          <RxCross2 size={72} color="white" />
                        </Flex>
                        <Flex direction="column" align="center" gap={2}>
                          <Text fontSize={13} fontWeight={400} color="white">
                            Correct answer:
                          </Text>
                          <Text fontSize={16} fontWeight={500} color="white">
                            {question[i].answer}
                          </Text>
                          <Text fontSize={13} fontWeight={400} color="white">
                            Click anywhere to continue
                          </Text>
                        </Flex>
                      </>
                    )}
                  </Flex>
                </Dialog.Content>
              </Dialog.Positioner>
            </Dialog.Root>
          )}
        </For>
      </Flex>
    </>
  );
}
