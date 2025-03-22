export enum QuestionType {
  MultipleChoices,
  Input,
}

export interface Question {
  id: string;
  content: string;
  answers: string[];
  type: QuestionType;
}
