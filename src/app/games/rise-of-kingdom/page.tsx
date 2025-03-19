'use client'

import Main from "@/components/games/rok/main";
import { useROKStore } from "@/hooks/games/rok";

export default function RiseOfKingdomPage() {
  const {scene} = useROKStore();

  return (
    <div>
      <h1>Rise of Kingdom</h1>
      <h2>{scene}</h2>
      <Main />
    </div>
  );
}
