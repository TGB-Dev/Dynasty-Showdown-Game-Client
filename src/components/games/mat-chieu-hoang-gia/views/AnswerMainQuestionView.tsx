import { Flex, Heading, Text } from "@chakra-ui/react";

function AnswerMainQuestionView() {
  return (
    <Flex
      height="full"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gapY={6}
    >
      <Heading size="2xl">DÀNH QUYỀN GIẢI KHOÁ VÒNG ĐẤU</Heading>
      <Text>Đội abc vui lòng đọc đáp án với ban tổ chức.</Text>
    </Flex>
  );
}

export default AnswerMainQuestionView;
