import { useNavigate, useParams } from "react-router-dom";
import { AuthService } from "../../app/AuthService";
import { useNotificationStore } from "../../core/stores/notificationStore";
import { useUserStore } from "../../core/stores/userStore";
import { useCallback, useEffect } from "react";

export default function TwoFactorLoginPage() {
    const as:AuthService = new AuthService();
    const navigate = useNavigate();
    const {token} = useParams();
    const setMessage = useNotificationStore((state)=>state.setMessage);
    const setMessageType = useNotificationStore((state)=>state.setMessageType);
    const login = useUserStore(state=>state.login);
    
    const twoFactorLogin = useCallback(async ()=> {
        if(!token) return;

        try {
            const user = await as.twoFactorLogin(token);
            
            setTimeout(()=> {
                login(user);
                navigate("/user/profile");
            }, 300);
        } catch(err) {
            setMessage(err);
            setMessageType("danger");
        }
    }, [token]);

    useEffect(()=> {
        twoFactorLogin();
    }, []);

    return(
        <div>
            <h1 className="text-4xl">Two factor auth baby</h1>
        </div>
    );
}