export enum QuestionType {
  MultipleChoices = "multiple-choice",
  Input = "short-answer",
}

export interface Question {
  content: string;
  answers?: string[];
  correctAnswer?: string;
  type: QuestionType;
}
