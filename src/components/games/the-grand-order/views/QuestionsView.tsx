"use client";
import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";
import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { useState } from "react";

function QuestionsView() {
  const questions = useTheGrandOrderStore((state) => state.questions);
  const setView = useTheGrandOrderStore((state) => state.setView);
  const setAnswers = useTheGrandOrderStore((state) => state.setAnswers);

  const [sidePos, setSidePos] = useState<number[]>(
    Array(questions.length).fill(0),
  );
  const [ansPos, setAnsPos] = useState<number[]>([]);
  const questionsList: string[] = questions.map((q) => q.question);
  const answersList: string[] = questions.map((q) => q.answer);

  function handleClickLeft(i: number) {
    setAnsPos([...ansPos, i]);
    setSidePos(() => {
      const temp = [...sidePos];
      temp[i] = 1;
      return temp;
    });
  }
  function handleClickRight(i: number) {
    console.log(ansPos);
    setSidePos(() => {
      const temp = [...sidePos];
      temp[ansPos[i]] = 0;
      return temp;
    });
    setAnsPos(() => {
      const temp = [...ansPos];
      temp.splice(i, 1);
      return temp;
    });
  }

  function handleSubmit() {
    setAnswers(ansPos.map((i) => questions[i].answer));
    setView(3);
  }
  return (
    <Box w={500} h="100%" mx="auto">
      <Flex gap={20} minH={questions.length * 50}>
        <Stack w="100%">
          {answersList.map(
            (answer, i) =>
              sidePos[i] == 0 && (
                <Button key={i} onClick={() => handleClickLeft(i)}>
                  {questionsList[i]}
                </Button>
              ),
          )}
        </Stack>
        <Stack w="100%">
          {ansPos.map((chosen, i) => (
            <Button key={i + "B"} onClick={() => handleClickRight(i)}>
              {answersList[i]}
            </Button>
          ))}
        </Stack>
      </Flex>
      <br></br>
      <Flex justifyContent="end">
        <Button
          disabled={ansPos.length < questionsList.length}
          onClick={handleSubmit}
        >
          Gửi kết quả
        </Button>
      </Flex>
    </Box>
  );
}

export default QuestionsView;
