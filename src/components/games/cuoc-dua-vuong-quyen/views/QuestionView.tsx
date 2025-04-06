import { LuSendHorizontal } from "react-icons/lu";

import {
  Button,
  Container,
  Flex,
  For,
  Grid,
  GridItem,
  HStack,
  Input,
  Progress,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useGameView, useQuestionStore } from "@/hooks/games/useCDVQStore";
import { QuestionType } from "@/types/question.types";
import { useState } from "react";

export default function QuestionView() {
  return (
    <Grid
      minW="100vw"
      minH="100vh"
      templateRows="auto 1fr auto"
      pb="4"
      userSelect="none"
    >
      <GridItem>
        <Progress.Root max={30}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
      </GridItem>

      <GridItem alignSelf="center" justifySelf="center">
        <QuestionSection />
      </GridItem>

      <GridItem>
        <AnswerSection />
      </GridItem>
    </Grid>
  );
}

function QuestionSection() {
  const question = useQuestionStore((state) => state.question);

  return (
    <Container as="section">
      <Text as="h1" fontSize="2xl" textAlign="center">
        {question.content}
      </Text>
    </Container>
  );
}

function AnswerSection() {
  const questionType = useQuestionStore((state) => state.question.type);

  return (
    <Container as="section">
      {questionType === QuestionType.MultipleChoices ? (
        <MultipleChoicesAnswer />
      ) : (
        <InputAnswer />
      )}
    </Container>
  );
}

async function handleAnswer(answer: string, timeLeft: number) {
  const chosenAnswer = useQuestionStore.getState().chosenAnswer;
  const setChosenAnswer = useQuestionStore.getState().setChosenAnswer;
  setChosenAnswer(answer);
  if (chosenAnswer || timeLeft > 0) return;

  await new Promise((res) => setTimeout(res, 3000));
  const nextView = useGameView.getState().nextView;
  nextView();
}

function MultipleChoicesAnswer() {
  const question = useQuestionStore((state) => state.question);
  const answers = useQuestionStore((state) => state.question.answers);
  const chosenAnswer = useQuestionStore((state) => state.chosenAnswer);
  const timeLeft = useGameView((state) => state.timeLeft);
  const themes = ["blue", "pink", "purple", "cyan"];

  function checkAnswer(chosen: string, index: number) {
    if (chosenAnswer == null) return themes[index];
    if (question.correctAnswer == chosen) return "green";
    return "red";
  }

  return (
    <Flex height="100%" justifyContent="center" alignItems="center">
      {timeLeft <= 0 || chosenAnswer == null ? (
        <SimpleGrid columns={{ base: 2, lg: 4 }} gap="2">
          <For each={answers}>
            {(answer, index) => (
              <Button
                key={answer}
                colorPalette={checkAnswer(answer, index)}
                fontSize="xl"
                size="2xl"
                minH="20vh"
                h="auto"
                p="4"
                whiteSpace="normal"
                onClick={() => handleAnswer(answer, timeLeft)}
              >
                {answer}
              </Button>
            )}
          </For>
        </SimpleGrid>
      ) : (
        timeLeft > 0 && chosenAnswer && <Spinner size="xl" />
      )}
    </Flex>
  );
}

function InputAnswer() {
  const [input, setInput] = useState("");
  const [isCorrect, setCorrect] = useState(false);
  const question = useQuestionStore((state) => state.question);
  const chosenAnswer = useQuestionStore((state) => state.chosenAnswer);
  const timeLeft = useGameView((state) => state.timeLeft);

  function checkAnswer() {
    if (question.correctAnswer == input) setCorrect(true);
  }
  return (
    <HStack>
      {timeLeft <= 0 || chosenAnswer == null ? (
        <Input
          type="number"
          css={isCorrect ? { "--error-color": "green" } : {}}
          onChange={(e) => setInput(e.target.value)}
        />
      ) : (
        timeLeft > 0 && chosenAnswer && <Input type="number" disabled />
      )}
      <Button
        onClick={() => {
          handleAnswer(input, timeLeft);
          checkAnswer();
        }}
      >
        Nộp
        <LuSendHorizontal />
      </Button>
    </HStack>
  );
}
