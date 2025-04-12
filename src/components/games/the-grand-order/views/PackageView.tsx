"use client";

import { packInfo } from "@/types/packages";
import { Button, Flex, SimpleGrid, Table } from "@chakra-ui/react";
import { generateQuestion } from "@/lib/games/tgo";
import { TgoQuestionPack } from "@/types/games/tgo.enum";

function PackageView() {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxW="md"
      gap={4}
    >
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
        <Button onClick={() => generateQuestion(TgoQuestionPack.PACK_3)}>
          Chọn gói 3
        </Button>

        <Button onClick={() => generateQuestion(TgoQuestionPack.PACK_5)}>
          Chọn gói 5
        </Button>

        <Button onClick={() => generateQuestion(TgoQuestionPack.PACK_7)}>
          Chọn gói 7
        </Button>
      </SimpleGrid>
    </Flex>
  );
}

export default PackageView;
