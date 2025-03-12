import { Game } from "@/types/games.enum";
import type { User } from "@/types/user.types";
import type { Fetcher } from "swr";

export function checkForAdminAccess() {
  return true;
}

export async function startGame(game: Game) {
  console.log("Starting game:", game);

  await new Promise((res) => setTimeout(res, 1000));
  if (game === Game.RiseOfKingdom) throw new Error();

  return true;
}

export async function fetchUsers(): Promise<User[]> {
  console.log("Fetching users");

  await new Promise((res) => setTimeout(res, 1000));

  return [
    {
      id: "1",
      name: "abc",
      point: 10,
    },
    {
      id: "2",
      name: "hkt",
      point: 1,
    },
    {
      id: "3",
      name: "dev",
      point: 5,
    },
  ];
}
