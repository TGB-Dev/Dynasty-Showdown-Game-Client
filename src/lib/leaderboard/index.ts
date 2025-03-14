import type { User } from "@/types/user.types";
import type { Fetcher } from "swr";

export const fetchLeaderboard: Fetcher<User[]> = (): User[] => {
  console.log("Fetching users");
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
};
