"use client";

import useSWR from "swr";
import { getCurrentQuestionPack, submitAnswers } from "@/lib/games/tgo";
import {
  Button,
  Card,
  Flex,
  For,
  Grid,
  GridItem,
  Show,
  Spinner,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";

export default function QuestionsView() {
  const { data } = useSWR("/tgo/questions/current", getCurrentQuestionPack);

  if (!data) {
    return <Spinner />;
  }

  return (
    <QuestionAndAnswerGrid answers={data.answers} questions={data.questions} />
  );
}

function QuestionAndAnswerGrid({
  questions,
  answers,
}: {
  questions: { id: string; questionText: string }[];
  answers: number[];
}) {
  const [selectingAnswers, setSelectingAnswers] = useState<number[]>([]);

  const availableAnswers = useMemo(
    () => answers.filter((answer) => selectingAnswers.indexOf(answer) === -1),
    [answers, selectingAnswers],
  );

  const selectAnswer = (answer: number) => {
    setSelectingAnswers((prev) => [...prev, answer]);
  };

  const unselectAnswer = (answer: number) => {
    setSelectingAnswers((prev) => prev.filter((a) => a !== answer));
  };

  return (
    <Flex direction="column" gap="4">
      <Card.Root
        flexDirection="row"
        flexWrap="wrap"
        minH="16"
        alignItems="center"
        p="2"
        gap="2"
        maxW="full"
      >
        <For each={availableAnswers}>
          {(answer) => (
            <Button w="20" onClick={() => selectAnswer(answer)}>
              {answer}
            </Button>
          )}
        </For>
      </Card.Root>

      <Grid templateColumns="3fr 1fr" alignItems="stretch" gap="2">
        <For each={questions}>
          {(question, index) => (
            <>
              <GridItem>
                <Card.Root h="full" minH="24">
                  <Card.Body justifyContent="center">
                    {question.questionText}
                  </Card.Body>
                </Card.Root>
              </GridItem>

              <GridItem>
                <Card.Root h="full">
                  <Card.Body justifyContent="center" alignItems="center">
                    <Show when={selectingAnswers[index] !== undefined}>
                      <Button
                        w="24"
                        onClick={() => unselectAnswer(selectingAnswers[index])}
                      >
                        {selectingAnswers[index]}
                      </Button>
                    </Show>
                  </Card.Body>
                </Card.Root>
              </GridItem>
            </>
          )}
        </For>
      </Grid>

      <Button
        disabled={selectingAnswers.length !== answers.length}
        onClick={() => submitAnswers(questions, answers)}
      >
        Nộp
      </Button>
    </Flex>
  );
}
