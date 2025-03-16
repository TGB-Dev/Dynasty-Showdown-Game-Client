export async function fetchTGOQuestions(pack: number) {
  await new Promise((res) => setTimeout(res, 1000));

  return Array(pack).fill({
    id: 1,
    questions: "Test",
    answers: "2",
  });
}
