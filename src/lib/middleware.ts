"use server";

import axios from "axios";
import { UserRole } from "@/types/user-role.enum";
import { requests } from "@/lib/requests";

export const middlewareRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});

export const getUserRole = async (
  accessToken?: string,
): Promise<UserRole | null> => {
  if (!accessToken) {
    return null;
  }

  const response = await requests.get("/user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
