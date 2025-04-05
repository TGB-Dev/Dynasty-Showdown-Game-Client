import { useMCHGStore } from "@/hooks/games/useMCHGStore";
import { Box, Flex } from "@chakra-ui/react";

function BellView() {
  const obstacle = useMCHGStore((state) => state.obstacle);
  return (
    <Flex
      height="full"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gapY={6}
    >
      <Box as="b">CHƯỚNG NGẠI VẬT CÓ {obstacle.length} CHỮ CÁI</Box>
      <Box>
        Bạn hãy <b>trả lời trực tiếp</b> cho Ban tổ chức
      </Box>
    </Flex>
  );
}

export default BellView;
