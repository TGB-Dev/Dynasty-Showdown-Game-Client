import { requests } from "@/lib/requests";
import { MchgCurrentRoundDto } from "@/types/mchg.dto";

export async function fetchCurrentRound(): Promise<MchgCurrentRoundDto> {
  const response = await requests.get("/mchg/rounds/current");
  return await response.data;
}
