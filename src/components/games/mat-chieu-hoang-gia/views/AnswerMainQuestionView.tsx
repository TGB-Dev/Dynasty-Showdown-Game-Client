import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import useSWR from "swr";
import { fetchCurrentRequestUsername } from "@/lib/games/mchg";

function AnswerMainQuestionView() {
  const { data } = useSWR(
    "/mchg/mainQuestion/currentRequestUser",
    fetchCurrentRequestUsername,
  );

  return (
    <Flex
      height="full"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gapY={6}
    >
      {!data ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Heading size="2xl">DÀNH QUYỀN GIẢI KHOÁ VÒNG ĐẤU</Heading>
          <Text>
            Đội <b>{data.username}</b> vui lòng đọc đáp án với ban tổ chức.
          </Text>
        </>
      )}
    </Flex>
  );
}

export default AnswerMainQuestionView;
