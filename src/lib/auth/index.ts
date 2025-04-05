import axios from "axios";
import Cookies from "js-cookie";
export async function login(credential: {
  username: string;
  password: string;
}) {
  try {
    axios
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
