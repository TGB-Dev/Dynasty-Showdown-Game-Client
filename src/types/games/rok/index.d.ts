declare interface OpenState {
  attack?: boolean;
  defend?: boolean;
  correct: boolean;
  wrong: boolean;
}

declare interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

declare interface Success {
  attack: boolean;
  defend: boolean;
}

declare enum CityState {
  selecting,
  conquered,
  unconquered,
}
