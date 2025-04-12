export interface TgoCurrentQuestionsPackResDto {
  questionId: string;
  questionText: string;
}

export interface TgoOpponentResDto {
  opponents: string[];
}

export interface TgoCanAttackResDto {
  attackScore: number;
  changeOnScore: number;
}
