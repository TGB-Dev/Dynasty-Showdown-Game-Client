import { requests } from "@/lib/requests";
import { TgoQuestionPack } from "@/types/games/tgo.enum";
import { TgoCurrentQuestionsPackResDto } from "@/types/games/tgo.dto";

export async function generateQuestion(packSize: TgoQuestionPack) {
  const response = await requests.post("/tgo/questions/generate", {
    pack: packSize,
  });

  return await response.data;
}

export async function getCurrentQuestionPack(): Promise<TgoCurrentQuestionsPackResDto> {
  const response = await requests.get("/tgo/questions/current");
  return await response.data;
}

export async function submitAnswers(
  questions: { id: string }[],
  answers: number[],
) {
  const submission = questions.map((question, index) => ({
    questionId: question.id,
    answer: answers[index],
  }));

  const response = await requests.post("/tgo/questions/submit", submission);

  return await response.data;
}
