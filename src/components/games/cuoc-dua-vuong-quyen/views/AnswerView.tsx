import { Flex, Heading, Spinner } from "@chakra-ui/react";
import useSWR from "swr";
import { fetchAnswer } from "@/lib/games/cdvq";

export default function AnswerView() {
  const { data } = useSWR("/cdvq/game/answer", fetchAnswer);

  if (!data) {
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
    <Flex
      direction="column"
      minH="100vh"
      justify="center"
      align="center"
      gap="4"
    >
      <Heading size="4xl">Đáp án: {data.answer}</Heading>

      {data.correct ? (
        <Heading>Đúng!</Heading>
      ) : (
        <Heading>Bạn đã trả lời sai</Heading>
      )}
    </Flex>
  );
}
