"use client";
import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";
import { fetchTGOQuestions } from "@/lib/games";
import { Button, Flex, Table } from "@chakra-ui/react";
import { useEffect } from "react";

function PackageView() {
  const score = useTheGrandOrderStore((state) => state.score);
  const setView = useTheGrandOrderStore((state) => state.setView);
  const setQuestions = useTheGrandOrderStore((state) => state.setQuestions);
  const setPack = useTheGrandOrderStore((state) => state.setPack);
  const setTimeLeft = useTheGrandOrderStore((state) => state.setTimeLeft);
  const setBaseTime = useTheGrandOrderStore((state) => state.setBaseTime);

  useEffect(() => {
    setTimeLeft(70);
    setBaseTime(70);
  }, []);

  async function handleClick(pack: number) {
    const questions = await fetchTGOQuestions(pack);
    setPack(pack);
    setQuestions(questions);
    setView(2);
  }
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={16}
    >
      <div>Điểm hiện tại: {score}</div>
      <Table.Root
        tableLayout="fixed"
        variant="outline"
        size="lg"
        maxW={600}
        showColumnBorder
      >
        <Table.Body>
          <Table.Row>
            <Table.Cell textAlign="center" fontWeight="bold">
              03 câu hỏi
            </Table.Cell>
            <Table.Cell textAlign="center">20 điểm thưởng</Table.Cell>
            <Table.Cell textAlign="center">10 điểm phạt</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign="center" fontWeight="bold">
              05 câu hỏi
            </Table.Cell>
            <Table.Cell textAlign="center">50 điểm thưởng</Table.Cell>
            <Table.Cell textAlign="center">30 điểm phạt</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign="center" fontWeight="bold">
              07 câu hỏi
            </Table.Cell>
            <Table.Cell textAlign="center">100 điểm thưởng</Table.Cell>
            <Table.Cell textAlign="center">70 điểm phạt</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <Flex justifyContent="space-between" alignItems="center" gap={20}>
        <Button onClick={() => handleClick(3)}>Chọn gói 03 câu hỏi</Button>
        <Button onClick={() => handleClick(5)}>Chọn gói 05 câu hỏi</Button>
        <Button onClick={() => handleClick(7)}>Chọn gói 07 câu hỏi</Button>
      </Flex>
    </Flex>
  );
}

export default PackageView;
