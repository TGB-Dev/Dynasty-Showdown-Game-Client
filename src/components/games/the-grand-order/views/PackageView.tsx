"use client";
import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";
import { fetchTGOQuestions } from "@/lib/games";
import { packInfo } from "@/types/packages";
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
    setPack(3);
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
          {[3, 5, 7].map((pack) => (
            <Table.Row key={pack}>
              <Table.Cell textAlign="center" fontWeight="bold">
                0{packInfo.get(pack)!.noOfQuestions} câu hỏi
              </Table.Cell>
              <Table.Cell textAlign="center">
                {packInfo.get(pack)!.prize} điểm thưởng
              </Table.Cell>
              <Table.Cell textAlign="center">
                {packInfo.get(pack)!.penalty} điểm phạt
              </Table.Cell>
            </Table.Row>
          ))}
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
