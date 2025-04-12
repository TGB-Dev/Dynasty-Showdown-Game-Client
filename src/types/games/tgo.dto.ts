export interface TgoCurrentQuestionsPackResDto {
  questions: {
    id: string;
    questionText: string;
  }[];
  answers: number[];
}
