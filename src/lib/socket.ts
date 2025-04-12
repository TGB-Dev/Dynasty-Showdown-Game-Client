"use client";

import { io } from "socket.io-client";
import { toaster } from "@/components/ui/toaster";

export const socket = io(process.env.NEXT_PUBLIC_API_HOST, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});

socket.on("reconnect_attempt", (attempt) => {
  console.log(`Reconnecting attempt #${attempt}`);
});

socket.on("reconnect_failed", () => {
  console.log("Reconnection failed");
  toaster.error({ description: "Lỗi kết nối, vui lòng tải lại trang" });
});
