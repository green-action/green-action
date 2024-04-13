import { create } from "zustand";
import { User } from "../_types";

interface AuthState {
  user: User | null;

  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLoginStateChange: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user: User) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  setLoginStateChange: () =>
    set((state) => ({ isLoggedIn: !state.isLoggedIn })),
}));
