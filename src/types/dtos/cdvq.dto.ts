import { QuestionType } from "@/types/question.types";

export interface QuestionResposeDto {
  questionText: string;
  type: QuestionType;
  options?: string[];
}
