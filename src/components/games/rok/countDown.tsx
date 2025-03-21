import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function CountDown({
  seconds,
  color,
  callback,
}: {
  seconds: number;
  color: string;
  callback: () => void;
}) {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    if (count === 0) {
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
    <Text fontSize={16} fontWeight={500} color={color}>
      {count}
    </Text>
  );
}
