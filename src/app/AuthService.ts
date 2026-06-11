import api from "../core/api";
import type { AuthResponse, UserLogin } from "../core/types";
import { apiCatch } from "../core/utils";

export default class AuthService {
    public async login(user:UserLogin):Promise<AuthResponse> {
        try {
            const response = await api.post("/auth/login", user);
            return response.data as AuthResponse;
        } catch(err:unknown) {
            throw apiCatch(err);
        }
    }
}