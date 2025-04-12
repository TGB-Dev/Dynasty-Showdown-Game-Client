import { Box, Flex, Heading } from "@chakra-ui/react";

export default function ReadyView() {
  return (
    <Flex direction="column" minH="100vh">
      <Heading textAlign="center" my="auto">
        Bạn đang ở trong phòng chờ của <b>Cuộc đua Vương quyền</b>
      </Heading>
    </Flex>
  );
}
