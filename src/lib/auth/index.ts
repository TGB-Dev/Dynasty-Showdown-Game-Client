export async function login(credential: {
  username: string;
  password: string;
}) {
  await new Promise((res) => setTimeout(res, 1000));

  return true;
}
