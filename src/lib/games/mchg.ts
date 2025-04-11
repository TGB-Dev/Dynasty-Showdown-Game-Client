import { requests } from "@/lib/requests";
import {
  MchgCurrentAnswerDto,
  MchgCurrentQuestionDto,
  MchgCurrentRequestUsernameDto,
  MchgCurrentRoundDto,
} from "@/types/mchg.dto";

export async function fetchCurrentRound(): Promise<MchgCurrentRoundDto> {
  const response = await requests.get("/mchg/rounds/current");
  return await response.data;
}

export async function fetchCurrentSubQuestion(): Promise<MchgCurrentQuestionDto> {
  const response = await requests.get("/mchg/round/current/currentQuestion");
  return await response.data;
}

export async function fetchCurrentRequestUsername(): Promise<MchgCurrentRequestUsernameDto> {
  const response = await requests.get("/mchg/mainQuestion/currentRequestUser");
  return await response.data;
}

export async function fetchCurrentAnswer(): Promise<MchgCurrentAnswerDto> {
  const response = await requests.get("/mchg/round/current/currentAnswer");
  return await response.data;
}

export async function submitAnswer(answer: string) {
  const response = await requests.post("/mchg/answer", {
    answer,
  });
  return await response.data;
}

export async function requestMainQuestion() {
  const response = await requests.post("/mchg/mainQuestion/request");
  return await response.data;
}
