import { requests } from "@/lib/requests";
import { RokCity } from "@/types/games/rok/rok-city.types";

export async function fetchMatrix(): Promise<RokCity[]> {
  const res = await requests.get("/rok/matrix");
  return await res.data;
}
