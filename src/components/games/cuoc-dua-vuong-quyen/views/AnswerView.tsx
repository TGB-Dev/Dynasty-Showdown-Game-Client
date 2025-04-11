import { useCdvqAnswer } from "@/hooks/games/cdvq/useCdvqAnswer";
import { Flex, Heading } from "@chakra-ui/react";

export default function AnswerView() {
  const { answer, isCorrect } = useCdvqAnswer((state) => state);

  return (
    <Flex
      direction="column"
      minH="100vh"
      justify="center"
      align="center"
      gap="4"
    >
      <Heading size="4xl">Đáp án: {answer}</Heading>

      {isCorrect ? (
        <Heading>Đúng!</Heading>
      ) : (
        <Heading>Bạn đã trả lời sai</Heading>
      )}
    </Flex>
  );
}
