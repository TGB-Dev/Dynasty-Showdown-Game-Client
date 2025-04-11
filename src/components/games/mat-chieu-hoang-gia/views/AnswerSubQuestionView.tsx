import {
  Box,
  Button,
  Card,
  Field,
  Flex,
  Grid,
  GridItem,
  Group,
  Heading,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";

import useSWR from "swr";
import { fetchCurrentSubQuestion, submitAnswer } from "@/lib/games/mchg";
import { useForm } from "react-hook-form";

export default function AnswerSubQuestionView() {
  return (
    <Flex h="full" justify="center" alignItems="center">
      <SubQuestionSection />
    </Flex>
  );
}

function SubQuestionSection() {
  const { data } = useSWR(
    "/mchg/round/current/currentQuestion",
    fetchCurrentSubQuestion,
  );

  if (!data) {
    return <Spinner size="xl" />;
  }

  return (
    <Grid templateRows="1fr auto" alignSelf="stretch" w="full" m="4" gap="2">
      <GridItem>
        <Card.Root height="full">
          <Card.Body alignItems="center" justifyContent="center">
            <Heading>{data.question}</Heading>
          </Card.Body>
        </Card.Root>
      </GridItem>

      <GridItem>
        <Card.Root height="full">
          <Card.Body>
            <AnswerInput length={data.answerLength} />
          </Card.Body>
        </Card.Root>
      </GridItem>
    </Grid>
  );
}

interface AnswerInputProps {
  answer: string;
}

function AnswerInput({ length }: { length: number }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnswerInputProps>();

  const onSubmit = handleSubmit((data) => submitAnswer(data.answer));

  const validate = (value: string) => {
    if (value.length < length) {
      return `Đáp án đang thiếu ${length - value.length} ký tự`;
    }
    if (value.length > length) {
      return `Đáp án đang dư ${value.length - length} ký tự`;
    }
    return true;
  };

  return (
    <form onSubmit={onSubmit}>
      <Text textAlign="center" mb="4">
        Đáp án có {length} ký tự
      </Text>

      <Field.Root invalid={!!errors.answer}>
        <Group w="full">
          <Input {...register("answer", { required: true, validate })} />
          <Button type="submit">Gửi</Button>
        </Group>
        {!!errors.answer?.message ? (
          <Field.ErrorText>{errors.answer?.message}</Field.ErrorText>
        ) : (
          <Box h="4" />
        )}
      </Field.Root>
    </form>
  );
}
