"use client";
import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";
import { Flex, Progress } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Timer() {
  const time = useTheGrandOrderStore((state) => state.time);
  const setTime = useTheGrandOrderStore((state) => state.setTime);

  const [baseTime, setBaseTime] = useState(time);

  useEffect(() => {
    if (time <= 0) return;
    const interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <Flex justifyContent="center" alignItems="center">
      <Progress.Root
        defaultValue={100}
        value={(time * 100) / baseTime}
        maxW="sm"
        width="100%"
      >
        <Flex gap={5}>
          <Progress.Track flex="1">
            <Progress.Range />
          </Progress.Track>
          <Progress.ValueText>{time}s</Progress.ValueText>
        </Flex>
      </Progress.Root>
    </Flex>
  );
}

export default Timer;
