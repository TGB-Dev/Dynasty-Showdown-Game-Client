export async function fetchResults(pack: number) {
  await new Promise((res) => setTimeout(res, 1000));

  const results = [];
  for (let i = 1; i <= pack; i++) {
    results.push({
      id: i,
      username: `Test ${i}`,
      points: i,
      timeSubmitted: "10:00",
    });
  }
  return results;
}
