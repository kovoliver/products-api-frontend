import { create } from "zustand";
import type { UserStoreType } from "../interfaces";
import type { AuthResponse, ProfileFormData } from "../types";
import api from "../api";

export const useUserStore = create<UserStoreType>((set, get) => ({
    user: null,
    isAuthenticated: false,
    authLoading: true,
    fetching: false,
    submitting: false,

    login: (userData) => {
        set({
            user: userData,
            isAuthenticated: true,
            authLoading: false,
        });
    },

    setProfileData:(profileData:ProfileFormData) => {
        set((state) => ({
            user: state.user
                ? {
                    ...state.user,
                    ...profileData,
                }
                : null
        }));
    },

    logout: async () => {
        try {
            await api.get("/auth/logout");

            set({
                user: null,
                isAuthenticated: false,
            });
        } catch(err) {
            console.error("Logout was unsuccessful:", err);
        } finally {
            set({ authLoading: false });
        }
    },

    verifyUser: async () => {
        try {
            const response = await api.get("/auth/me");

            const userData: AuthResponse = {
                userId: response.data.userId,
                userName: response.data.userName,
                email: response.data.email,
                firstName: response.data.firstName,
                lastName: response.data.lastName
            };

            set({
                user: userData,
                isAuthenticated: true,
            });
        } catch (err) {
            console.error("Re-authentication was unsuccessful:", err);
            get().logout();
        } finally {
            set({ authLoading: false });
        }
    },

    setAuthLoading: (loading) => set({ authLoading: loading }),
    setFetching: (loading) => set({ fetching: loading }),
    setSubmitting: (loading) => set({ submitting: loading }),
}));