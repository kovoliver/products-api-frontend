import api from "../core/api";
import type { AuthResponse } from "../core/types";
import { apiCatch } from "../core/utils";

export class AuthService {
    public async twoFactorLogin(token:string):Promise<AuthResponse> {
        try {
            const response = await api.post(`/auth/two-factor-login/${token}`);
            return response.data as AuthResponse;
        } catch(err:unknown) {
            throw apiCatch(err);
        }
    }
}