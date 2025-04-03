export async function fetchTGOQuestions(pack: number) {
  await new Promise((res) => setTimeout(res, 1000));

  const questions = [];
  for (let i = 1; i <= pack; i++) {
    questions.push({
      id: i,
      question: `Test ${i}`,
      answer: i,
    });
  }
  return questions;
}

export async function fetchMCHGQuestions(pack: number) {
  await new Promise((res) => setTimeout(res, 1000));

  const questions = [];
  for (let i = 1; i <= pack; i++) {
    questions.push({
      id: i,
      question: `Test ${i}`,
      answer: i,
    });
  }
  return questions;
}
