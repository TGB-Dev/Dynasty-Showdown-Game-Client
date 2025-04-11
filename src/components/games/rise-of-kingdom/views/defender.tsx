import { useRokStore } from "@/hooks/games/useRokStore";
import { Card, Flex, For, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import CountDown from "../countDown";
import DialogContent from "../Dialog";
import AnswerCard from "../AnswerCard";

export default function Defender() {
  const [open, setOpen] = useState<OpenState>({
    defend: true,
    correct: false,
    wrong: false,
  });

  const {
    question,
    questionIndex: i,
    setStage,
    setQuestionIndex: setI,
    setSuccess,
  } = useRokStore();

  const handleClickAnswer = useCallback(
    (answer: string) => {
      const isCorrect = answer === question[i].answer;

      setOpen((prev: OpenState) => ({
        ...prev,
        correct: isCorrect,
        wrong: !isCorrect,
      }));
      setSuccess((prev: Success) => ({ ...prev, defend: isCorrect }));
      setI((prev: number) => (prev + 1 > question.length - 1 ? 0 : prev + 1));
    },
    [question, i, setSuccess, setI],
  );

  const handleOffDialog = useCallback(
    (dialog: keyof OpenState, callback?: () => void) => {
      setOpen((prev: OpenState) => ({ ...prev, [dialog]: false }));
      callback && callback();
    },
    [],
  );

  const handleNextScene = useCallback(() => {
    setStage("main");
  }, [setStage]);

  return (
    <>
      {/* Question Card */}
      <Flex h="100%" direction="column" align="center" gap={4} py={4}>
        {!open.defend && (
          <CountDown
            seconds={20}
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
            Question: {i + 1}
          </Text>
          <Text>{question[i].question}</Text>
        </Card.Root>
        <Flex w="100%" h="50%" wrap="wrap" gap={2}>
          <For each={question[i].options}>
            {(question, i) => (
              <AnswerCard key={i} {...{ question, i, handleClickAnswer }} />
            )}
          </For>
        </Flex>

        {/* Dialogs */}
        <For each={Object.keys(open) as (keyof OpenState)[]}>
          {(type) => (
            <DialogContent
              key={type}
              {...{ type, open, question, i, handleOffDialog, handleNextScene }}
            />
          )}
        </For>
      </Flex>
    </>
  );
}
