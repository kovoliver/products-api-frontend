import { Navigate, Outlet } from "react-router-dom";
import GlobalNotifications from "../overlays/GlobalNotifications";
import GlobalConfirmation from "../overlays/GlobalConfirmations";
import Navbar from "../global_components/Navbar";
import LoadingSpinner from "../local_components/LoadingSpinner";
import { useUserStore } from "../../core/stores/userStore";

export default function DashboardLayout() {
    const authLoading = useUserStore((state) => state.authLoading);
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);
    const user = useUserStore((state) => state.user);

    if(authLoading) {
        return <LoadingSpinner/>
    }

    if (!isAuthenticated || !user) {
        return (
             <Navigate to="/" replace />
        );
    }

    return(
        <div className="grid grid-cols-12 max-w-6xl mx-auto gap-4">
            <Navbar/>

            <div className="lg:col-span-9 sm:col-span-12 col-span-12">
                <GlobalConfirmation/>
                <GlobalNotifications/>
                <Outlet/>
            </div>
        </div>
    );
}