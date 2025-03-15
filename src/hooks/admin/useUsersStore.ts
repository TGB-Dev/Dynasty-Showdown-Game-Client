import type { User } from "@/types/user.types";
import type { Fetcher } from "swr";
import { create } from "zustand/index";
import { fetchUsers } from "@/lib/admin";

export interface UsersState {
  users: User[];
  selectedUsersId: string[];
  getSelectedUsers: () => User[];
  toggleUser: (id: string) => void;
  toggleAllUsers: () => void;
  selectAllUsers: () => void;
  deselectAllUsers: () => void;
  isIndeterminate: () => boolean;
  fetch: Fetcher;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  selectedUsersId: [],

  getSelectedUsers: () => {
    const { selectedUsersId, users } = get();

    return users.filter((user) => selectedUsersId.includes(user.id));
  },

  isIndeterminate: () => {
    const { selectedUsersId, users } = get();
    return selectedUsersId.length > 0 && selectedUsersId.length < users.length;
  },

  toggleUser: (id: string) => {
    set((state) => {
      const selectedUsersId = state.selectedUsersId.includes(id)
        ? state.selectedUsersId.filter((selectedId) => selectedId !== id)
        : [...state.selectedUsersId, id];

      return { ...state, selectedUsersId };
    });
  },

  toggleAllUsers: () => {
    const { selectedUsersId, users, selectAllUsers, deselectAllUsers } = get();

    if (selectedUsersId.length === users.length) deselectAllUsers();
    else selectAllUsers();
  },

  selectAllUsers: () => {
    set((state) => ({
      ...state,
      selectedUsersId: state.users.map((user) => user.id),
    }));
  },

  deselectAllUsers: () => {
    set((state) => ({ ...state, selectedUsersId: [] }));
  },

  fetch: async () => {
    await fetchUsers().then((users) => {
      set((state) => ({ ...state, users }));
    });
  },
}));
