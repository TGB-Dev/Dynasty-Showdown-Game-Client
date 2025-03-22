import { useROKStore } from "@/hooks/games/rok";
import { Card, Flex, For, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import CountDown from "./CountDown";
import DialogContent from "./Dialog";
import AnswerCard from "./AnswerCard";

export default function Attacker() {
  const [open, setOpen] = useState<OpenState>({
    attack: true,
    correct: false,
    wrong: false,
  });

  const {
    question,
    questionIndex: i,
    setScene,
    setQuestionIndex: setI,
    setSuccess
  } = useROKStore();

  const handleClickAnswer = useCallback(
    (answer: string) => {
      const isCorrect = answer === question[i].answer;

      setOpen((prev: OpenState) => ({
        ...prev,
        correct: isCorrect,
        wrong: !isCorrect,
      }));
      setSuccess((prev: Success) => ({ ...prev, attack: isCorrect }));
      setI((prev: number) => prev + 1);
    },
    [question, i, setSuccess, setI]
  );

  const handleOffDialog = useCallback(
    (dialog: keyof OpenState, callback?: () => void) => {
      setOpen((prev: OpenState) => ({ ...prev, [dialog]: false }));
      callback && callback();
    },
    []
  );

  const handleNextScene = useCallback(() => {
    setScene("defender");
  }, [setScene]);

  return (
    <>
      {/* Question Card */}
      <Flex h="100%" direction="column" align="center" gap={4} py={4}>
        {!open.attack && (
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
              isAttack
              {...{ type, open, question, i, handleOffDialog, handleNextScene }}
            />
          )}
        </For>
      </Flex>
    </>
  );
}
