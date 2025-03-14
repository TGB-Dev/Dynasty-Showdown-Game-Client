"use client";

import { Container, Flex, Heading } from "@chakra-ui/react";
import GlobalLeaderboard from "@/components/leaderboard/GlobalLeaderboard";

export default function LeaderboardPage() {
  return (
    <div>
      <Container maxW="lg" as="main">
        <Flex gap="4">
          <Container as="section" id="users">
            <Heading as="h2" mb="2">
              Leaderboard
            </Heading>
            <GlobalLeaderboard />
          </Container>
        </Flex>
      </Container>
    </div>
  );
}
