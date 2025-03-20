declare interface OpenState {
  attack: boolean;
  correct: boolean;
  wrong: boolean;
}

declare interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
}
