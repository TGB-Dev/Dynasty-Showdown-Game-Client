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
import { QuestionType } from "@/types/question.types";
import { useState } from "react";
import { useCdvqQuestionStore } from "@/hooks/games/cdvq/useCdvqQuestionStore";
import { useCdvqTimer } from "@/hooks/games/cdvq/useCdvqTimer";
import { requests } from "@/lib/requests";

export default function QuestionView() {
  const { timeLeft } = useCdvqTimer((state) => state);

  return (
    <Grid
      minW="100vw"
      minH="100vh"
      templateRows="auto 1fr auto"
      pb="4"
      userSelect="none"
    >
      <GridItem>
        <Progress.Root max={30} value={timeLeft}>
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
  const question = useCdvqQuestionStore((state) => state.question);

  return (
    <Container as="section">
      <Text as="h1" fontSize="2xl" textAlign="center">
        {question?.content}
      </Text>
    </Container>
  );
}

function AnswerSection() {
  const questionType = useCdvqQuestionStore((state) => state.question?.type);

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

async function submitAnswer(answer: string) {
  const { setAnswered } = useCdvqQuestionStore.getState();

  await requests.post("/cdvq/game/answer", { answer });
  setAnswered(true);
}

function MultipleChoicesAnswer() {
  const question = useCdvqQuestionStore((state) => state.question);
  const isAnswered = useCdvqQuestionStore((state) => state.isAnswered);
  const answers = useCdvqQuestionStore((state) => state.question?.answers);
  const themes = ["blue", "pink", "purple", "cyan"];

  return (
    <Flex height="100%" justifyContent="center" alignItems="center">
      {question !== null ? (
        <SimpleGrid columns={{ base: 2, lg: 4 }} gap="2">
          <For each={answers}>
            {(answer, index) => (
              <Button
                key={answer}
                colorPalette={themes[index]}
                fontSize="xl"
                size="2xl"
                minH="20vh"
                h="auto"
                p="4"
                whiteSpace="normal"
                disabled={isAnswered}
                onClick={() => submitAnswer(answer)}
              >
                {answer}
              </Button>
            )}
          </For>
        </SimpleGrid>
      ) : (
        <Spinner size="xl" />
      )}
    </Flex>
  );
}

function InputAnswer() {
  const [input, setInput] = useState("");
  const isAnswered = useCdvqQuestionStore((state) => state.isAnswered);

  return (
    <HStack>
      <Input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button onClick={() => submitAnswer(input)} disabled={isAnswered}>
        Nộp
        <LuSendHorizontal />
      </Button>
    </HStack>
  );
}
