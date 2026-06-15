import api from "../core/api";
import type { AuthResponse, ProfileFormData, UserLogin } from "../core/types";
import { apiCatch } from "../core/utils";

export default class UserService {
    public async login(user:UserLogin):Promise<AuthResponse> {
        try {
            const response = await api.post("/auth/login", user);
            return response.data as AuthResponse;
        } catch(err:unknown) {
            throw apiCatch(err);
        }
    }

    public async updateProfile(formData:ProfileFormData):Promise<ProfileFormData> {
        try {
            const response = await api.patch("/users/update", formData);
            return response.data as ProfileFormData;
        } catch(err:unknown) {
            throw apiCatch(err);
        }
    }
}