import { useUsersStore } from "@/hooks/admin/useUsersStore";
import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";
import { FETCH_USERS_API_PATH } from "@/lib/admin";
import { User } from "@/types/user.types";
import { Button, Stack, Table, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

function ResultsView() {
  const pack = useTheGrandOrderStore((state) => state.pack);
  const questions = useTheGrandOrderStore((state) => state.questions);
  const answers = useTheGrandOrderStore((state) => state.answers);
  const score = useTheGrandOrderStore((state) => state.score);
  const setView = useTheGrandOrderStore((state) => state.setView);
  const setTimeLeft = useTheGrandOrderStore((state) => state.setTimeLeft);
  const setBaseTime = useTheGrandOrderStore((state) => state.setBaseTime);
  const addScore = useTheGrandOrderStore((state) => state.addScore);
  const minusScore = useTheGrandOrderStore((state) => state.minusScore);

  const [isCorrect, setCorrect] = useState(true);

  const users = useUsersStore((state) => state.users);
  const fetch = useUsersStore((state) => state.fetch);

  let prize = 0;
  let penalty = 0;

  useSWR(FETCH_USERS_API_PATH, fetch);

  useEffect(() => {
    setTimeLeft(30);
    setBaseTime(30);
    assignPackagePoints();
    compare();
  }, []);

  function assignPackagePoints() {
    if (pack == 3) {
      prize = 20;
      penalty = 10;
    } else if (pack == 5) {
      prize = 50;
      penalty = 30;
    } else {
      prize = 100;
      penalty = 70;
    }
  }

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
    <Box mx="auto">
      {isCorrect ? (
        <Stack alignItems="center">
          <div>Đáp án đúng!</div>
          <div>Điểm hiện tại: {score}</div>
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
                    <Button onClick={() => attack(user, penalty)}>
                      Tấn công
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Stack>
      ) : (
        <Stack alignItems="center" gap={5}>
          <div>Đáp án sai!</div>
          <div>Bạn đã bị trừ {penalty} điểm!</div>
          <Button onClick={() => setView(1)}>Tiếp tục vòng mới</Button>
        </Stack>
      )}
    </Box>
  );
}

export default ResultsView;
