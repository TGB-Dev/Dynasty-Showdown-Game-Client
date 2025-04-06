import Cookies from "js-cookie";
import { requests } from "../requests";

function saveAccessToken(accessToken: string) {
  Cookies.set("accessToken", accessToken);
  requests.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export async function login(credential: {
  username: string;
  password: string;
}) {
  try {
    await requests
      .post("/auth/signIn", {
        username: credential.username,
        password: credential.password,
      })
      .then(function (res) {
        saveAccessToken(res.data.accessToken);
      });
  } catch {
    return false;
  }
  return true;
}
