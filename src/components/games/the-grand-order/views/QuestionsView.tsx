"use client";
import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";
import { Button, Flex, Grid, GridItem, Icon } from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useState } from "react";

function QuestionsView() {
  const pack = useTheGrandOrderStore((state) => state.pack);
  const questions = useTheGrandOrderStore((state) => state.questions);
  const setView = useTheGrandOrderStore((state) => state.setView);
  const setAnswers = useTheGrandOrderStore((state) => state.setAnswers);

  const [sidePos, setSidePos] = useState<number[]>(
    Array(questions.length).fill(0),
  );
  const [ansPos, setAnsPos] = useState<number[]>([]);
  const questionsList: string[] = questions.map((q) => q.question);

  function handleClickLeft(i: number) {
    setAnsPos([...ansPos, i]);
    setSidePos(() => {
      const temp = [...sidePos];
      temp[i] = 1;
      return temp;
    });
  }
  function handleClickRight(i: number) {
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
    <Flex direction="column" justifyContent="center">
      <Flex direction={{ base: "column", md: "row" }} gap={12}>
        <Grid
          w="30ch"
          h={300}
          templateRows={`repeat(${pack}, 1fr)`}
          gap={2}
          borderStyle="dashed"
          padding={2}
          borderWidth={1}
          borderColor="gray"
          overflowY="auto"
        >
          {sidePos.map(
            (side, i) =>
              side == 0 && (
                <GridItem key={i}>
                  <Button
                    w="full"
                    h="full"
                    padding={2}
                    textWrap="wrap"
                    variant="subtle"
                    onClick={() => handleClickLeft(i)}
                  >
                    {questionsList[i]}
                  </Button>
                </GridItem>
              ),
          )}
        </Grid>
        <Icon
          rotate={{ base: "90deg", md: "0deg" }}
          size="lg"
          alignSelf="center"
        >
          <FaLongArrowAltRight />
        </Icon>

        <Grid
          templateRows={`repeat(${pack}, 1fr)`}
          gap={2}
          w="30ch"
          h={300}
          borderStyle="dashed"
          padding={2}
          borderWidth={1}
          borderColor="gray"
          overflowY="auto"
        >
          {ansPos.map((chosen, i) => (
            <GridItem key={questionsList[i]}>
              <Button
                w="full"
                h="full"
                padding={2}
                textWrap="wrap"
                variant="subtle"
                onClick={() => handleClickRight(i)}
              >
                {questionsList[chosen]}
              </Button>
            </GridItem>
          ))}
        </Grid>
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
    </Flex>
  );
}

export default QuestionsView;
