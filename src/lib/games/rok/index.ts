"use server";

export async function getMatrix() {
  console.log("Getting matrix...");

  await new Promise((res) => setTimeout(res, 1000));

  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
}

export async function getAllQuestion(id: string): Promise<Question[]> {
  await new Promise((res) => setTimeout(res, 1000));

  return [
    {
      id: "1",
      question: "What is your name?",
      options: ["A. Answer 1", "B. Answer 2", "C. Answer 3", "D. Answer 4"],
      answer: "A. Answer 1",
    },
    {
      id: "2",
      question: "What is your age?",
      options: ["A. Answer 1", "B. Answer 2", "C. Answer 3", "D. Answer 4"],
      answer: "A. Answer 1",
    },
    {
      id: "3",
      question: "What is your lol?",
      options: ["A. Answer 1", "B. Answer 2", "C. Answer 3", "D. Answer 4"],
      answer: "A. Answer 1",
    },
  ];
}
