"use client";

import { Avatar } from "@/components/ui/avatar";
import { Flex } from "@chakra-ui/react";
import Link from "next/link";

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
        <Link href="/games" style={{ textDecoration: "underline" }}>
          Quay lại trò chơi
        </Link>
      </Flex>
    </Flex>
  );
}
