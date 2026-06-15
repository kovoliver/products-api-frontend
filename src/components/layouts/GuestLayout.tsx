import { Navigate, Outlet } from "react-router-dom";
import GlobalNotifications from "../overlays/GlobalNotifications";
import GlobalConfirmation from "../overlays/GlobalConfirmations";
import { useUserStore } from "../../core/stores/userStore";

export default function GuestLayout() {
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);
    const user = useUserStore((state) => state.user);

    if(isAuthenticated && user) {
        <Navigate to="/user/profile"/>
    }

    return (
        <div className="max-w-6xl mx-auto rounded-md bg-amber-50 border border-[color-mix(in_oklch,var(--color-accent),black_5%)] p-10">
            <GlobalNotifications/>
            <GlobalConfirmation/>
            <Outlet />
        </div>
    );
}