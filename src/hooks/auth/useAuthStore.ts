import { fetchAccount } from "@/components/lib/auth";
import { create } from "zustand";

interface Account {
  username: string;
  password: string;
}

export interface ValidationState {
  chosen: Account;
  fetch: (username: string) => Promise<void>;
}

export const useAuthStore = create<ValidationState>((set, get) => ({
  chosen: { username: "", password: "" },
  fetch: async (username: string) => {
    await fetchAccount(username).then((account) => {
      set((state) => ({ chosen: account }));
    });
  },
}));
