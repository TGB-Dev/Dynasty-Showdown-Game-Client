import { Flex, Heading } from "@chakra-ui/react";
import { useCdvqReadyTimer } from "@/hooks/games/cdvq/useCdvqReadyTimer";

export default function ReadyView() {
  const time = useCdvqReadyTimer((state) => state.time);

  return (
    <Flex align="center" justify="center" minH="100vh">
      <Heading size="6xl">{time}</Heading>
    </Flex>
  );
}
