import { requests } from "@/lib/requests";
import { TgoQuestionPack } from "@/types/games/tgo.enum";
import {
  TgoCanAttackResDto,
  TgoCurrentQuestionsPackResDto,
  TgoOpponentResDto,
} from "@/types/games/tgo.dto";

export async function generateQuestion(packSize: TgoQuestionPack) {
  const response = await requests.post("/tgo/questions/generate", {
    pack: packSize,
  });

  return await response.data;
}

export async function getCurrentQuestionPack(): Promise<
  TgoCurrentQuestionsPackResDto[]
> {
  const response = await requests.get("/tgo/questions/current");
  return await response.data;
}

export async function submitAnswers(questions: { questionId: string }[]) {
  const submissions = questions.map((question) => question.questionId);

  const response = await requests.post("/tgo/questions/submit", {
    questionIds: submissions,
  });

  return await response.data;
}

export async function fetchOpponents(): Promise<TgoOpponentResDto> {
  const response = await requests.get("/tgo/opponents");
  return await response.data;
}

export async function attackOpponent(
  opponentUsername: string,
): Promise<TgoOpponentResDto> {
  const response = await requests.post("/tgo/opponents/attack", {
    username: opponentUsername,
  });
  return await response.data;
}

export async function checkCanAttack(): Promise<TgoCanAttackResDto> {
  const response = await requests.get("/tgo/users/status");
  return await response.data;
}
