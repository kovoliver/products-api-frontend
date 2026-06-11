import { useUserStore } from "../../core/stores/userStore";

export default function ProfilePage() {
    const user = useUserStore((state)=>state.user);

    if(!user) {
        return null;
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            <div className="bg-main/10 p-6 text-center border-b border-gray-100">
                <h1 className="text-2xl font-bold text-main">Profil adatok</h1>
                <p className="text-sm text-gray-500 mt-1">@{user.userName}</p>
            </div>

            <div className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between border-b border-gray-50 pb-2">
                    <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Felhasználónév</span>
                    <span className="text-gray-800 font-semibold">{user.userName}</span>
                </div>

                <div className="flex flex-col sm:flex-row justify-between border-b border-gray-50 pb-2">
                    <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">E-mail cím</span>
                    <span className="text-gray-800 font-medium">{user.email}</span>
                </div>

                <div className="flex flex-col sm:flex-row justify-between border-b border-gray-50 pb-2">
                    <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Vezetéknév</span>
                    <span className="text-gray-800">{user.lastName}</span>
                </div>

                <div className="flex flex-col sm:flex-row justify-between border-b border-gray-50 pb-2">
                    <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Keresztnév</span>
                    <span className="text-gray-800">{user.firstName}</span>
                </div>
            </div>
        </div>
    );
}