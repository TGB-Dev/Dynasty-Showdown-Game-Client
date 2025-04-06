import { Game } from "@/types/games.enum";
import { Box, Flex } from "@chakra-ui/react";
function InGameWaitingRoom() {
  const currentGame: () => string = () => {
    return Game.MatChieuHoangGia;
  };

  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      padding={4}
    >
      <Box>
        Bạn đang trong phòng chờ của <b>{currentGame()}</b>, vui lòng đợi chốc
        lát.
      </Box>
    </Flex>
  );
}

export default InGameWaitingRoom;
