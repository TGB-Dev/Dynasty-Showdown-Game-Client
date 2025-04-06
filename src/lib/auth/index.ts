import Cookies from "js-cookie";
import { requests } from "../requests";
export async function login(credential: {
  username: string;
  password: string;
}) {
  try {
    console.log("IN");
    requests
      .post("/auth/signIn", {
        username: credential.username,
        password: credential.password,
      })
      .then(function (res) {
        Cookies.set("accessToken", res.data.accessToken);
      });
  } catch {
    return false;
  }
  return true;
}
