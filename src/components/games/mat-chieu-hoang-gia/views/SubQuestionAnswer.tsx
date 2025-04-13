import { Text, Flex, Spinner, Heading } from "@chakra-ui/react";
import useSWR from "swr";
import { fetchCurrentAnswer } from "@/lib/games/mchg";

export default function SubQuestionAnswer() {
  const { data } = useSWR(
    "/mchg/round/current/currentAnswer",
    fetchCurrentAnswer,
  );

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="full"
    >
      {!data ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Heading mb="8">
            Bạn đã trả lời <b>{data.isCorrect ? "ĐÚNG" : "SAI"}</b>
          </Heading>
          <Text mb="2">Đáp án của bạn: {data.answer}</Text>
          <Text>Đáp án chính thức: {data.question.answer}</Text>
        </>
      )}
    </Flex>
  );
}
