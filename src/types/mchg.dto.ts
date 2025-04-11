export interface MchgCurrentRoundDto {
  image: {
    name: string;
  };
  questions: {
    solved: boolean;
  }[];
}

export interface MchgCurrentQuestionDto {
  question: string;
  answerLength: number;
}
