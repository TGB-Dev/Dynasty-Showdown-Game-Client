import type { User } from "@/types/user.types";
import type { Fetcher } from "swr";

export const fetchLeaderboard: Fetcher<User[]> = (): User[] => {
  console.log("Fetching users");
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
};
