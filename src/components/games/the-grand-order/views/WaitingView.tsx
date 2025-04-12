import { Flex, Heading } from "@chakra-ui/react";

export default function WaitingView() {
  return (
    <Flex direction="column" minH="100vh">
      <Heading textAlign="center" my="auto">
        Bạn đang ở trong phòng chờ của <b>The Grand Order</b>
      </Heading>
    </Flex>
  );
}
