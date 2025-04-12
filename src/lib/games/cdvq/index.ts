import { requests } from "@/lib/requests";
import {
  AnswerResponseDto,
  QuestionResponseDto,
  ResultResDto,
} from "@/types/dtos/cdvq.dto";

export async function fetchResults(): Promise<ResultResDto[]> {
  const response = await requests.get("/cdvq/game/result");
  return response.data;
}

export async function fetchQuestion(): Promise<QuestionResponseDto> {
  const res = await requests.get("/cdvq/questions/current");
  return await res.data;
}

export async function fetchAnswer(): Promise<AnswerResponseDto> {
  const res = await requests.get("/cdvq/game/answer");
  return await res.data;
}
