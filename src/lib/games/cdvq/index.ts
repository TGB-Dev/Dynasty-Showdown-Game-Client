import { requests } from "@/lib/requests";

export async function fetchResults() {
  const response = await requests.get("/cdvq/game/result");
  return response.data;
}
