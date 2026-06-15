import ProfileForm from "../../components/local_components/ProfileForm";
import { useUserStore } from "../../core/stores/userStore";

export default function ProfilePage() {
    const user = useUserStore((state) => state.user);
    const submitting = useUserStore((state)=>state.submitting);

    if (!user) {
        return null;
    }

    return (
        <div className="grid grid-cols-3">
            <div className="lg:col-span-1 md:col-span-1 col-span-2 text-center">
                <ProfileForm
                    initFormData={user}
                    submitting={submitting}
                />
            </div>
            
        </div>
    );
}