import { Outlet } from "react-router-dom";
import GlobalNotifications from "../overlays/GlobalNotifications";
import GlobalConfirmation from "../overlays/GlobalConfirmations";

export default function GuestLayout() {
    return (
        <div className="max-w-6xl mx-auto rounded-md bg-amber-50 border border-[color-mix(in_oklch,var(--color-accent),black_5%)] p-10">
            <GlobalNotifications/>
            <GlobalConfirmation/>
            <Outlet />
        </div>
    );
}