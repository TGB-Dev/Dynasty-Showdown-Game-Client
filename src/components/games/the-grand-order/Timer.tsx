"use client";
import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";
import { Flex, Progress } from "@chakra-ui/react";
import { useEffect } from "react";

function Timer() {
  const timeLeft = useTheGrandOrderStore((state) => state.timeLeft);
  const setTimeLeft = useTheGrandOrderStore((state) => state.setTimeLeft);
  const baseTime = useTheGrandOrderStore((state) => state.baseTime);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <Flex justifyContent="center" alignItems="center">
      <Progress.Root
        size="lg"
        defaultValue={100}
        value={(timeLeft * 100) / baseTime}
        maxW="sm"
        width="100%"
      >
        <Progress.ValueText>
          Thời gian còn lại: {timeLeft} giây
        </Progress.ValueText>
        <Progress.Track flex="1">
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Flex>
  );
}

export default Timer;
