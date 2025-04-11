import { Game } from "@/types/games.enum";
import type { User } from "@/types/user.types";
import { requests } from "../requests";

export const FETCH_USERS_API_PATH = "/api/users";

export function checkForAdminAccess() {
  return true;
}

export async function startGame(game: Game) {
  console.log("Starting game:", game);
  let gameLink = "";
  if (game == Game.CuocDuaVuongQuyen) {
    gameLink = "cdvq";
  } else if (game == Game.MatChieuHoangGia) {
    gameLink = "mchg";
  } else if (game == Game.RiseOfKingdom) {
    gameLink = "rise-of-kingdom";
  } else {
    gameLink = "tgo";
  }

  try {
    requests.post(`/admin/start-game/${gameLink}`);
  } catch {
    return false;
  }

  return true;
}
export async function runGame(game: Game) {
  console.log("Running game:", game);

  await new Promise((res) => setTimeout(res, 1000));
  return true;
}

export async function fetchUsers(): Promise<User[]> {
  console.log("Fetching users");

  await new Promise((res) => setTimeout(res, 1000));

  return [
    {
      id: "1",
      username: "abc",
      score: 10,
    },
    {
      id: "2",
      username: "hkt",
      score: 1,
    },
    {
      id: "3",
      username: "dev",
      score: 5,
    },
  ];
}
