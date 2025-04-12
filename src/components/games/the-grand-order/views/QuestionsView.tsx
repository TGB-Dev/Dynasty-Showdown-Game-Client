"use client";

import useSWR from "swr";
import { getCurrentQuestionPack, submitAnswers } from "@/lib/games/tgo";
import { Button, Card, Flex, For, Show, Spinner } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";
import { TgoRoundStage } from "@/types/games/tgo.enum";
import { Progress } from "@/components/ui/progress";

const ANSWER_DURATION = 70; // seconds

export default function QuestionsView() {
  const { data } = useSWR("/tgo/questions/current", getCurrentQuestionPack);

  if (!data) {
    return <Spinner size="xl" />;
  }

  return <QuestionAndAnswerGrid questions={data} />;
}

function QuestionAndAnswerGrid({
  questions,
}: {
  questions: { questionId: string; questionText: string }[];
}) {
  const { answered, timeLeft } = useTheGrandOrderStore();

  const [selectedQuestion, setSelectedQuestion] = useState<
    { questionId: string; questionText: string }[]
  >([]);

  const availableQuestions = useMemo(
    () => questions.filter((question) => !selectedQuestion.includes(question)),
    [questions, selectedQuestion],
  );

  const selectAnswer = (question: {
    questionId: string;
    questionText: string;
  }) => {
    setSelectedQuestion((prev) => [...prev, question]);
  };

  const unselectAnswer = (question: {
    questionId: string;
    questionText: string;
  }) => {
    setSelectedQuestion((prev) => prev.filter((q) => q !== question));
  };

  const handleSubmit = async () => {
    await submitAnswers(selectedQuestion);

    const { setStage, setAnswered } = useTheGrandOrderStore.getState();
    setAnswered(true);
    setStage(TgoRoundStage.ANSWERING);
  };

  return (
    <Flex direction="column" gap="4" w="full" mx="auto" maxW="2xl">
      <Progress
        value={timeLeft}
        max={ANSWER_DURATION}
        position="fixed"
        left={0}
        right={0}
        top={0}
      />

      <Card.Root
        flexDirection="column"
        flexWrap="wrap"
        minH="16"
        p="2"
        gap="2"
        w="full"
      >
        <For each={availableQuestions}>
          {(question) => (
            <Button
              key={question.questionId}
              h="auto"
              whiteSpace="normal"
              p={4}
              onClick={() => selectAnswer(question)}
              wordWrap="break-word"
            >
              {question.questionText}
            </Button>
          )}
        </For>
      </Card.Root>

      <Flex direction="column" alignItems="stretch" gap="2" w="full">
        <For each={questions}>
          {(question, index) => (
            <Card.Root minH={10} key={question.questionId}>
              <Show when={selectedQuestion[index] !== undefined}>
                <Button
                  onClick={() => unselectAnswer(selectedQuestion[index])}
                  h="auto"
                  whiteSpace="normal"
                  p={4}
                >
                  {selectedQuestion[index]?.questionText}
                </Button>
              </Show>
            </Card.Root>
          )}
        </For>
      </Flex>

      <Button
        disabled={selectedQuestion.length !== questions.length || answered}
        onClick={handleSubmit}
      >
        Nộp
      </Button>
    </Flex>
  );
}
