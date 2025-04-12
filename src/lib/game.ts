import { requests } from "@/lib/requests";

export async function getRunningGame(): Promise<{ game: string } | null> {
  return requests.get("/game/running").then((response) => response.data);
}
