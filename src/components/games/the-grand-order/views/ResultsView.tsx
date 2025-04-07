"use client";
import { useUsersStore } from "@/hooks/admin/useUsersStore";
import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";
import { FETCH_USERS_API_PATH } from "@/lib/admin";
import { packInfo } from "@/types/packages";
import { User } from "@/types/user.types";
import { Button, Stack, Table, Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

function ResultsView() {
  const {
    pack,
    questions,
    answers,
    score,
    setView,
    setTimeLeft,
    setBaseTime,
    addScore,
    minusScore,
  } = useTheGrandOrderStore((state) => state);

  const [isCorrect, setCorrect] = useState(true);

  const users = useUsersStore((state) => state.users);
  const fetch = useUsersStore((state) => state.fetch);

  const prize = packInfo.get(pack)!.prize;
  const penalty = packInfo.get(pack)!.penalty;

  useSWR(FETCH_USERS_API_PATH, fetch);

  useEffect(() => {
    setTimeLeft(30);
    setBaseTime(30);
    compare();
  }, []);

  function compare() {
    if (answers.length < questions.length || answers.length == 0) {
      setCorrect(false);
      minusScore(penalty);
      return;
    }
    questions.sort((a, b) => a.answer - b.answer);
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] != questions[i].answer) {
        setCorrect(false);
        minusScore(penalty);
        return;
      }
    }
    addScore(prize);
    return;
  }

  function attack(target: User, damage: number) {
    setView(1);
  }

  return (
    <Flex h="full" alignItems="center">
      {isCorrect ? (
        <Stack alignItems="center">
          <div>Đáp án đúng!</div>
          <div>Điểm hiện tại: {score}</div>
          <Box maxH="md" overflowY="auto">
            <Table.Root w="100%">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader textAlign="center">
                    Tên đội
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">
                    Điểm hiện có
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">
                    Hành động
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((user) => (
                  <Table.Row
                    key={user.id}
                    w="100%"
                    justifyContent="space-evenly"
                    gap={10}
                  >
                    <Table.Cell textAlign="center">{user.name}</Table.Cell>
                    <Table.Cell textAlign="center">{user.point}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        variant="subtle"
                        onClick={() => attack(user, penalty)}
                      >
                        Tấn công
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Stack>
      ) : (
        <Stack alignItems="center" gap={5}>
          <div>Đáp án sai!</div>
          <div>Bạn đã bị trừ {penalty} điểm!</div>
          <Button onClick={() => setView(1)}>Tiếp tục vòng mới</Button>
        </Stack>
      )}
    </Flex>
  );
}

export default ResultsView;
