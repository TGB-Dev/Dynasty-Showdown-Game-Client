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

// declare enum CityState {
//   selecting,
//   conquered,
//   unconquered,
// }

declare interface City {
  resources: number;
  ownedBy: string | null;
}

declare interface SelectedCity {
  row: number;
  col: number;
}

declare interface ROKState {
  scene: string;
  setScene: (scene: string) => void;
  success: Success;
  setSuccess: React.Dispatch<React.SetStateAction<Success>>;
  question: Question[];
  setQuestion: (question: Question[]) => void;
  questionIndex: number;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  matrix: number[][];
  cities: City[][];
  selectedCity: SelectedCity | null;
  turn: number;
  setTurn: (turn: number) => void;
  setCities: (cities: City[][]) => void;
  setSelectedCity: (selectedCity: SelectedCity | null) => void;
  attackCity: () => void;
}
