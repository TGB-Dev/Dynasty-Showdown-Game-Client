import { LuSendHorizontal } from "react-icons/lu";

import {
  Button,
  Container,
  Flex,
  For,
  Grid,
  GridItem,
  Group,
  Input,
  Progress,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { QuestionType } from "@/types/question.types";
import { useState } from "react";
import { requests } from "@/lib/requests";
import { useCdvqStore } from "@/hooks/games/cdvq/useCdvqStore";
import useSWR from "swr";
import { fetchQuestion } from "@/lib/games/cdvq";
import { QuestionResponseDto } from "@/types/dtos/cdvq.dto";

export default function QuestionView() {
  const { timeLeft } = useCdvqStore((state) => state);
  const { data } = useSWR("/cdvq/questions/current", fetchQuestion);

  if (data === undefined) {
    return (
      <Flex
        minH="100vh"
        justifyContent="center"
        alignItems="center"
        userSelect="none"
      >
        <Spinner size="xl" />
      </Flex>
    );
  }

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
        <QuestionSection question={data} />
      </GridItem>

      <GridItem>
        <AnswerSection question={data} />
      </GridItem>
    </Grid>
  );
}

function QuestionSection({ question }: { question: QuestionResponseDto }) {
  return (
    <Container as="section">
      <Text as="h1" fontSize="2xl" textAlign="center">
        {question?.questionText}
      </Text>
    </Container>
  );
}

function AnswerSection({ question }: { question: QuestionResponseDto }) {
  return (
    <Container as="section">
      {question.type === QuestionType.MultipleChoices ? (
        <MultipleChoicesAnswer question={question} />
      ) : (
        <InputAnswer />
      )}
    </Container>
  );
}

async function submitAnswer(answer: string) {
  const { setAnswered } = useCdvqStore.getState();

  await requests.post("/cdvq/game/answer", { answer });
  setAnswered(true);
}

function MultipleChoicesAnswer({
  question,
}: {
  question: QuestionResponseDto;
}) {
  const isAnswered = useCdvqStore((state) => state.answered);
  const themes = ["blue", "pink", "purple", "cyan"];

  return (
    <SimpleGrid columns={{ base: 2, lg: 4 }} gap="2">
      <For each={question.options}>
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
  );
}

function InputAnswer() {
  const [input, setInput] = useState("");
  const isAnswered = useCdvqStore((state) => state.answered);

  return (
    <Group w="full">
      <Input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button onClick={() => submitAnswer(input)} disabled={isAnswered}>
        Nộp
        <LuSendHorizontal />
      </Button>
    </Group>
  );
}
