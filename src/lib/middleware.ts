"use server";

import axios from "axios";
import { UserRole } from "@/types/user-role.enum";

export const middlewareRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});

export async function getUserRole(
  accessToken?: string,
): Promise<UserRole | null> {
  if (!accessToken) {
    return null;
  }

  const response = await middlewareRequest.get("/user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.role;
}
