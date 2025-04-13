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

export interface MchgCurrentRequestUsernameDto {
  username: string;
}

export interface MchgCurrentAnswerDto {
  answer: string;
  question: {
    question: string;
    answer: string;
  };
  isCorrect: boolean;
}
