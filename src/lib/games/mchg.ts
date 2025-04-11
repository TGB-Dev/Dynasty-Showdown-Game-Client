import { requests } from "@/lib/requests";
import { MchgCurrentQuestionDto, MchgCurrentRoundDto } from "@/types/mchg.dto";

export async function fetchCurrentRound(): Promise<MchgCurrentRoundDto> {
  const response = await requests.get("/mchg/rounds/current");
  return await response.data;
}

export async function fetchCurrentSubQuestion(): Promise<MchgCurrentQuestionDto> {
  // const response = await requests.get("/mchg/rounds/current/currentQuestion");
  // return await response.data;

  return {
    question: "Test question",
    answerLength: 5,
  };
}
