import { useROKStore } from "@/hooks/games/rok";
import React, { useEffect } from "react";

export default function Main() {
  const { matrix, getMatrix } = useROKStore();
  useEffect(() => {
    getMatrix();
  }, []);

  return <div></div>;
}
