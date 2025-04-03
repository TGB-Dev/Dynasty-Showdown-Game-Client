"use client";
import { useMCHGStore } from "@/hooks/games/useMCHGStore";
import {
  Grid,
  Stack,
  Image,
  GridItem,
  Box,
  Flex,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

function QuestionsView() {
  const questions = useMCHGStore((state) => state.questions);
  const setAnswer = useMCHGStore((state) => state.setAnswer);
  const [clicked, setClicked] = useState(["", "", "", "", "", ""]);
  const [choice, setChoice] = useState(-1);
  const [input, setInput] = useState("");
  function handleClick(index: number) {
    setChoice(index);
  }

  function handleSubmit(answer: string) {
    if (answer == questions[choice].correctAnswer) {
      setClicked(() => {
        const temp = [...clicked];
        temp[choice] = answer;
        return temp;
      });
    } else {
      setClicked(() => {
        const temp = [...clicked];
        temp[choice] = "";
        return temp;
      });
    }
    setInput("");
    setAnswer(answer);
  }
  return (
    <Flex direction="column">
      <Grid
        templateColumns={{ md: "repeat(2, 1fr)", base: "none" }}
        templateRows={{ md: "none", base: "repeat(2, 1fr)" }}
        gap={5}
        maxH="lg"
      >
        <GridItem borderColor="green" borderWidth={2} position="relative">
          <Grid
            width="full"
            height="full"
            templateColumns="repeat(3, 1fr)"
            templateRows="repeat(2, 1fr)"
            position="absolute"
            zIndex={10}
          >
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <GridItem key={`pic${index}`} width="full" height="full">
                {clicked[index] == "" && (
                  <Button
                    width="full"
                    height="full"
                    borderRadius="none"
                    onClick={() => handleClick(index)}
                    backgroundColor="teal"
                    disabled={clicked[index] == null}
                  >
                    {index + 1}
                  </Button>
                )}
              </GridItem>
            ))}
          </Grid>
          <Image
            src="https://picsum.photos/2000/2000"
            aspectRatio={3 / 2}
            alt="ansPic"
          ></Image>
        </GridItem>
        <GridItem>
          <Flex
            justifyItems="center"
            alignItems="center"
            direction="column"
            gapY={10}
            height="full"
          >
            <Box fontWeight="bold">CHƯỚNG NGẠI VẬT CÓ 5 CHỮ CÁI</Box>
            <Grid
              direction="column"
              width="full"
              height="full"
              templateRows={`repeat(${questions.length}, 1fr)`}
              alignItems="center"
              gap={10}
            >
              {questions.map((question, index) => {
                return (
                  <GridItem key={question.content}>
                    <Flex color="white" gap={10} alignItems="center">
                      <Box>{index + 1}</Box>
                      <Flex gap={3} alignItems="center" wrap="wrap" gapY={14}>
                        {Array.from({
                          length: question.correctAnswer.length,
                        }).map((_, dash) => (
                          <Box
                            key={`${index} ${dash}`}
                            borderBottomWidth={2}
                            borderColor="white"
                            width={50}
                            textAlign="center"
                            fontWeight="bold"
                          >
                            {clicked[index] == question.correctAnswer
                              ? question.correctAnswer[dash]
                              : ""}
                          </Box>
                        ))}
                      </Flex>
                    </Flex>
                  </GridItem>
                );
              })}
            </Grid>
          </Flex>
        </GridItem>
        {choice != -1 && (
          <GridItem backgroundColor="gray.950" colSpan={{ base: 0, md: 2 }}>
            <Flex
              justifyContent="center"
              alignItems="center"
              direction="column"
              gapY={10}
              width="full"
              padding={8}
            >
              <Box fontWeight="bold">Trả lời câu hỏi {choice + 1}</Box>
              <Box>{questions[choice].content}</Box>
              <Flex
                justifyContent="center"
                alignItems="center"
                gapX={6}
                gapY={4}
                direction={{ base: "column", md: "row" }}
              >
                <Input
                  onChange={(e) => setInput(e.target.value)}
                  width="full"
                  maxW="lg"
                  placeholder="Đáp án..."
                ></Input>
                <Button alignSelf="end" onClick={() => handleSubmit(input)}>
                  Gửi đáp án
                </Button>
              </Flex>
            </Flex>
          </GridItem>
        )}
      </Grid>
    </Flex>
  );
}

export default QuestionsView;
