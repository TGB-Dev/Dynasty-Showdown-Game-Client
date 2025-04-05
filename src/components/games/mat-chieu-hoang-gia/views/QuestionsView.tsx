"use client";
import { useMCHGStore } from "@/hooks/games/useMCHGStore";
import {
  Grid,
  Image,
  GridItem,
  Box,
  Flex,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

function QuestionsView() {
  const obstacle = useMCHGStore((state) => state.obstacle);
  const questions = useMCHGStore((state) => state.questions);
  const answers = useMCHGStore((state) => state.answers);
  const setAnswers = useMCHGStore((state) => state.setAnswers);
  const addScore = useMCHGStore((state) => state.addScore);
  const setView = useMCHGStore((state) => state.setView);

  const [choice, setChoice] = useState(-1);
  const [input, setInput] = useState("");
  function handleClick(index: number) {
    setInput("");
    setChoice(index);
  }

  function handleSubmit(answer: string) {
    const newAnswers = [...answers];
    if (answer == questions[choice].correctAnswer) {
      newAnswers[choice] = answer;
      addScore(15);
    } else {
      newAnswers[choice] = null;
    }
    setAnswers(newAnswers);
    setChoice(-1);
    setInput("");
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
                {(answers[index] == "" || answers[index] == null) && (
                  <Button
                    width="full"
                    height="full"
                    borderRadius="none"
                    backgroundColor="teal"
                    opacity={1}
                    onClick={() => handleClick(index)}
                    disabled={answers[index] == null}
                    fontWeight="bold"
                  >
                    {index + 1}
                  </Button>
                )}
              </GridItem>
            ))}
          </Grid>
          <Box aspectRatio={3 / 2}>
            <Image
              src="https://picsum.photos/2000/2000"
              aspectRatio={3 / 2}
              alt="ansPic"
            ></Image>
          </Box>
        </GridItem>
        <GridItem>
          <Flex
            justifyItems="center"
            alignItems="center"
            direction="column"
            gapY={10}
            height="full"
          >
            <Box as="b">CHƯỚNG NGẠI VẬT CÓ {obstacle.length} CHỮ CÁI</Box>
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
                            width={6}
                            textAlign="center"
                            fontWeight="bold"
                          >
                            {answers[index] == question.correctAnswer
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
              gapY={6}
              width="full"
              padding={6}
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
                  value={input}
                  width="full"
                  maxW="lg"
                  placeholder="Đáp án..."
                ></Input>
                <Button onClick={() => handleSubmit(input)}>Gửi đáp án</Button>
              </Flex>

              <Button colorPalette="yellow" onClick={() => setView(2)}>
                Bấm chuông
              </Button>
            </Flex>
          </GridItem>
        )}
      </Grid>
    </Flex>
  );
}

export default QuestionsView;
