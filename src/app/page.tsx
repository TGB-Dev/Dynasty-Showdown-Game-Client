import { Avatar } from "@/components/ui/avatar";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex direction="column" width="100vw" height="100vh" padding={4}>
      <Avatar alignSelf="end" />
      <Flex
        width="full"
        height="full"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        Bạn đang trong phòng chờ chung, vui lòng đợi chốc lát.
      </Flex>
    </Flex>
  );
}
