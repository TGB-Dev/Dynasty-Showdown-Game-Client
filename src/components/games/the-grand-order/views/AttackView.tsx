import { Button, Flex, For, Heading, Spinner, Stack } from "@chakra-ui/react";
import {
  attackOpponent,
  checkCanAttack,
  fetchOpponents,
} from "@/lib/games/tgo";
import useSWR from "swr";

export default function AttackView() {
  const canAttack = useSWR("/tgo/users/status", checkCanAttack).data;
  const opponentsData = useSWR("/tgo/opponents", fetchOpponents).data;

  if (!opponentsData || !canAttack) {
    return <Spinner size="xl" />;
  }

  console.log(canAttack);

  if (canAttack.changeOnScore < 0) {
    return (
      <Flex direction="column" minH="100vh">
        <Heading textAlign="center" my="auto">
          Bạn đã trả lời sai, bị {canAttack.changeOnScore} điểm và không thể tấn
          công đối thủ khác
        </Heading>
      </Flex>
    );
  }

  return (
    <Stack>
      <Heading textAlign="center">
        Bạn đã trả lời đúng, được {canAttack.changeOnScore}, vui lòng chọn đối
        thủ để trừ {canAttack.attackScore} điểm cho họ
      </Heading>
      <Flex mx="auto">
        <For each={opponentsData.opponents}>
          {(opponent) => (
            <Button w="full" onClick={() => attackOpponent(opponent)}>
              {opponent}
            </Button>
          )}
        </For>
      </Flex>
    </Stack>
  );
}
