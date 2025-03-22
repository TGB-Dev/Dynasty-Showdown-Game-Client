import { Progress } from "@/components/ui/progress";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export default function CountDown({
  seconds,
  color,
  callback,
  progress,
}: {
  seconds: number;
  color: string;
  callback: () => void;
  progress?: boolean;
}) {
  const [count, setCount] = useState(seconds);
  const hasCalledBack = useRef(false);
  const maxCount = seconds;

  useEffect(() => {
    if (count === 0 && !hasCalledBack.current) {
      hasCalledBack.current = true;
      callback();
    }
  }, [count, callback]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {progress ? (
        <Box w="100%" h="1rem">
          <Progress h="100%" value={count * (100 / maxCount)} />
        </Box>
      ) : (
        <Text fontSize={16} fontWeight={500} color={color}>
          {count}
        </Text>
      )}
    </>
  );
}
