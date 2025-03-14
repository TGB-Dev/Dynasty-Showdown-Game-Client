export async function fetchAccount(username: string) {
  await new Promise((res) => setTimeout(res, 1000));

  return {
    username,
    password: "123",
  };
}
