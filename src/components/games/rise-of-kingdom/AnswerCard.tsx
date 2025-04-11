import { Card, Text } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

export default function AnswerCard({
  question,
  i,
  handleClickAnswer,
}: {
  question: string;
  i: number;
  handleClickAnswer: (question: string) => void;
}) {
  const colors = ["red.600", "yellow.500", "green.600", "blue.600"];

  return (
    <Card.Root
      w="calc(50% - 4px)"
      display="flex"
      direction="column"
      justifyContent="center"
      alignItems="center"
      bg={colors[i]}
      spaceY={1}
      onClick={() => handleClickAnswer(question)}
    >
      <FaCircle size={24} color="white" />
      <Text fontSize={16} color="white" px={4} textAlign="center">
        {question}
      </Text>
    </Card.Root>
  );
}
