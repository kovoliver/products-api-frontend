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
    csrfToken:"",

    login: async (userData) => {
        set({
            user: userData,
            isAuthenticated: true,
            authLoading: false,
            csrfToken: await get().getCsrfToken()
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
                csrfToken:null
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
            csrfToken:null
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
                csrfToken: await get().getCsrfToken()
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

    async getCsrfToken() {
        const response = await api.get("/auth/csrf-token");
        return response.data?.csrfToken;
    },
    setAuthLoading: (loading) => set({ authLoading: loading }),
    setFetching: (loading) => set({ fetching: loading }),
    setSubmitting: (loading) => set({ submitting: loading }),
}));