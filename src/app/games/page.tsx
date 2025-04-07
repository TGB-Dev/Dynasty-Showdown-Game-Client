import { Box, Flex } from "@chakra-ui/react";
function InGameWaitingRoom() {
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      padding={4}
    >
      <Box>Bạn đang trong phòng chờ của trò chơi, vui lòng đợi chốc lát.</Box>
    </Flex>
  );
}

export default InGameWaitingRoom;
