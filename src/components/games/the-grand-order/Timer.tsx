"use client";
import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";
import { Flex, Progress } from "@chakra-ui/react";
import { useEffect } from "react";

function Timer() {
  const timeLeft = useTheGrandOrderStore((state) => state.timeLeft);
  const baseTime = useTheGrandOrderStore((state) => state.baseTime);
  const view = useTheGrandOrderStore((state) => state.view);
  const setTimeLeft = useTheGrandOrderStore((state) => state.setTimeLeft);
  const setView = useTheGrandOrderStore((state) => state.setView);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (view == 1 || view == 2) {
        setView(3);
      } else {
        setView(1);
      }
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

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
