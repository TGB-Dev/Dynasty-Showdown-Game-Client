"use client";

import { packInfo } from "@/types/packages";
import { Button, Flex, SimpleGrid, Table } from "@chakra-ui/react";
import { generateQuestion } from "@/lib/games/tgo";
import { TgoQuestionPack, TgoRoundStage } from "@/types/games/tgo.enum";
import { useTheGrandOrderStore } from "@/hooks/games/useTheGrandOrderStore";
import { Progress } from "@/components/ui/progress";

const ANSWER_DURATION = 70;

function PackageView() {
  const choosePackage = async (pack: TgoQuestionPack) => {
    await generateQuestion(pack);
    useTheGrandOrderStore.getState().setStage(TgoRoundStage.ANSWERING);
  };

  const timeLeft = useTheGrandOrderStore((state) => state.timeLeft);

  return (
    <Flex direction="column">
      <Progress
        value={timeLeft}
        max={ANSWER_DURATION}
        position="fixed"
        left={0}
        right={0}
        top={0}
      />

      <Flex direction="column" m="auto" maxW="md" gap={4}>
        <Table.Root
          tableLayout="fixed"
          variant="outline"
          showColumnBorder
          w="full"
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader textAlign="center">
                Số câu hỏi
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Điểm thưởng
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Điểm phạt
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {[3, 5, 7].map((pack) => (
              <Table.Row key={pack}>
                <Table.Cell textAlign="center" fontWeight="bold">
                  {packInfo.get(pack)!.noOfQuestions}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {packInfo.get(pack)!.prize}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {packInfo.get(pack)!.penalty}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <SimpleGrid columns={3} gap={4} w="full">
          <Button onClick={() => choosePackage(TgoQuestionPack.PACK_3)}>
            Chọn gói 3
          </Button>

          <Button onClick={() => choosePackage(TgoQuestionPack.PACK_5)}>
            Chọn gói 5
          </Button>

          <Button onClick={() => choosePackage(TgoQuestionPack.PACK_7)}>
            Chọn gói 7
          </Button>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export default PackageView;
