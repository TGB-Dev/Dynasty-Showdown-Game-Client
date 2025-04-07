"use client";

import { useEffect } from "react";
import { checkForAdminAccess } from "@/lib/admin";
import { useRouter } from "next/navigation";
import { Container, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import ActivateGameButton from "@/components/admin/ActivateGameButton";
import { Game } from "@/types/games.enum";
import UsersTable from "@/components/admin/UsersTable";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    if (!checkForAdminAccess()) router.back();
  }, [router]);

  return (
    <Container maxW="lg" as="main">
      <Flex direction="column" gap="4">
        <GameControlSection />
        <UsersSection />
      </Flex>
    </Container>
  );
}

function GameControlSection() {
  return (
    <Container id="game-control" as="section">
      <Heading as="h2" mb="1">
        Game Control
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap="1">
        <GridItem>
          <ActivateGameButton game={Game.CuocDuaVuongQuyen} />
        </GridItem>

        <GridItem>
          <ActivateGameButton game={Game.MatChieuHoangGia} />
        </GridItem>

        <GridItem>
          <ActivateGameButton game={Game.RiseOfKingdom} />
        </GridItem>

        <GridItem>
          <ActivateGameButton game={Game.TheGrandOrder} />
        </GridItem>
      </Grid>
    </Container>
  );
}

function UsersSection() {
  return (
    <Container as="section" id="users">
      <Heading as="h2">Users</Heading>
      <UsersTable />
    </Container>
  );
}
