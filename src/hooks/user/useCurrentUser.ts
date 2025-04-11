import { create } from "zustand";
import { getMe } from "@/lib/auth";
import { User } from "@/types/user.types";

interface CurrentUserState {
  user: User | null;

  refresh: () => void;
}

export const useCurrentUser = create<CurrentUserState>((set) => ({
  user: null,

  refresh: async () => {
    const user = await getMe();
    set({ user });
  },
}));
