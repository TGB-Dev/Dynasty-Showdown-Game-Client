import { QuestionType } from "@/types/question.types";

export interface QuestionResponseDto {
  questionText: string;
  type: QuestionType;
  options?: string[];
}

export interface AnswerResponseDto {
  answer: string;
  correct: boolean;
}
