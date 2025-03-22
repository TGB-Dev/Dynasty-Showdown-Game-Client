import { useGameView } from "@/components/games/cuoc-dua-vuong-quyen/GameView";
import { LuSendHorizontal } from "react-icons/lu";

import {
  Button,
  Container,
  For,
  Grid,
  GridItem,
  HStack,
  Input,
  Progress,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Question, QuestionType } from "@/types/question.types";
import { create } from "zustand/index";

interface QuestionState {
  question: Question;
}

const useQuestionStore = create<QuestionState>((set) => ({
  question: {
    id: "1",
    content: "What is the capital of Vietnam?",
    answers: [
      "Hanoi",
      "Ho Chi Minh City, Southern. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
      "Da Nang",
      "Hue",
    ],
    type: QuestionType.MultipleChoices,
  },
}));

export default function QuestionView() {
  const nextView = useGameView((state) => state.nextView);

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
      <Text as="h1" fontSize="2xl">
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

function MultipleChoicesAnswer() {
  const answers = useQuestionStore((state) => state.question.answers);
  const themes = ["blue", "pink", "purple", "cyan"];

  return (
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
          >
            {answer}
          </Button>
        )}
      </For>
    </SimpleGrid>
  );
}

function InputAnswer() {
  return (
    <HStack>
      <Input type="number" />
      <Button>
        Nộp
        <LuSendHorizontal />
      </Button>
    </HStack>
  );
}
