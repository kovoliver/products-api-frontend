import { useState } from "react";
import AuthService from "../../app/AuthService";
import { InputMain } from "../../components/ui/Inputs";
import { BoxSecondary } from "../../components/ui/Boxes";
import { ButtonMain } from "../../components/ui/Buttons";
import type { AuthResponse } from "../../core/types";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../core/stores/userStore";
import { useNotificationStore } from "../../core/stores/notificationStore";

export default function Login() {
    const as: AuthService = new AuthService();
    const [email, setEmail] = useState<string>("kovacs.oliver1989@gmail.com");
    const [password, setPassword] = useState<string>("jelszó");
    const navigate = useNavigate();
    const loginState = useUserStore((state)=>state.login);
    const setMessage = useNotificationStore((state)=>state.setMessage);
    const setMessageType = useNotificationStore((state)=>state.setMessageType);
    const submitting = useUserStore(state=>state.submitting);

    async function login(e:any):Promise<void> {
        e.preventDefault();

        try {
            const response = await as.login({
                email, password
            });

            const userData:AuthResponse = {
                userId:response.userId,
                userName:response.userName,
                email:response.email,
                firstName:response.firstName,
                lastName:response.lastName
            };

            loginState(
                userData
            );
            
            navigate("/user/profile");
        } catch (err:any) {
            setMessage(err);
            setMessageType("danger");
        }
    };

    return (
        <div>
            <h1 className="text-xl text-center text-main mb-3 font-bold">Login</h1>
            
            <BoxSecondary customClasses={['max-w-md mx-auto text-center']}>
                <form>
                    <b className="block text-main mb-2">Username</b>

                    <InputMain
                        placeholder="userName"
                        type="text" customClasses={['w-3/4']}
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                    />

                    <b className="block text-main mb-2">Password</b>

                    <InputMain
                        placeholder="password"
                        type="password" customClasses={['w-3/4']}
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                    />

                    <ButtonMain
                        text="Login"
                        icon="sign-in"
                        customClasses={['block mx-auto my-3']}
                        onClick={login}
                        isLoading={submitting}
                        disabled={submitting}
                    />
                </form>
            </BoxSecondary>
        </div>
    );
}