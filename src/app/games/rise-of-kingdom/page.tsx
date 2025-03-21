"use client";

import Attacker from "@/components/games/rok/Attacker";
import { useROKStore } from "@/hooks/games/rok";
import { getAllQuestion } from "@/lib/games/rok";
import Defender from "@/components/games/rok/Defender";
import Main from "@/components/games/rok/Main";
import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import Pick from "@/components/games/rok/Pick";

export default function RiseOfKingdomPage() {
  const { scene, setQuestion } = useROKStore();
  const id = '1'

  useEffect(() => {
    const fetchQuestion = async () => {
      setQuestion(await getAllQuestion(id));
    };
    fetchQuestion();
  }, []);

  return (
    <Container h="100vh" maxW={"6xl"} fluid>
      {scene === "main" && <Main />}
      {scene === "pick" && <Pick />}
      {scene === "attacker" && <Attacker />}
      {scene === "defender" && <Defender />}
    </Container>
  );
}
