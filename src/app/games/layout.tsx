"use client";

import { useLayoutEffect } from "react";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    useCurrentUser.getState().refresh();
  }, []);

  return <div>{children}</div>;
}
