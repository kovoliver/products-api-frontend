import { create } from "zustand";
import type { UserStoreType } from "../interfaces";
import type { AuthResponse, ProfileFormData } from "../types";
import api from "../api";
import type { AxiosError } from "axios";

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

    setProfileData: (profileData: ProfileFormData) => {
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
        } catch (err) {
            console.error("Logout was unsuccessful:", err);
        } finally {
            set({ authLoading: false });
        }
    },

    softLogout: () => {
        set({
            user: null,
            isAuthenticated: false,
        });
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
        } catch (err:any) {
            const error = err as AxiosError;
            const status = error.response?.status;

            if (status === 412) {
                console.error("2FA is required or in progress!");
                return;
            }

            get().softLogout();
        } finally {
            set({ authLoading: false });
        }
    },

    setAuthLoading: (loading) => set({ authLoading: loading }),
    setFetching: (loading) => set({ fetching: loading }),
    setSubmitting: (loading) => set({ submitting: loading }),
}));