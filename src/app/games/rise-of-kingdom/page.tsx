"use client";

import Attacker from "@/components/games/rok/attacker";
import { useROKStore } from "@/hooks/games/rok";
import { getAllQuestion } from "@/lib/games/rok";
import Defender from "@/components/games/rok/defender";
import Main from "@/components/games/rok/main";
import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import Pick from "@/components/games/rok/pick";

export default function RiseOfKingdomPage() {
  const { scene, setQuestion } = useROKStore();

  useEffect(() => {
    const fetchQuestion = async () => {
      setQuestion(await getAllQuestion("1"));
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
