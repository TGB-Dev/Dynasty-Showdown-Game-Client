import Cookies from "js-cookie";
import { requests } from "../requests";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";

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
      .then((res) => {
        saveAccessToken(res.data.accessToken);
      })
      .then(() => {
        useCurrentUser.getState().refresh();
      });
  } catch {
    return false;
  }
  return true;
}

export async function getMe() {
  try {
    const res = await requests.get("/user/me");
    return res.data;
  } catch {
    return null;
  }
}
