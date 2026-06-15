import { useState } from "react";
import { useUserStore } from "../../core/stores/userStore";
import type { ProfileFormData } from "../../core/types";
import { BoxSecondary } from "../../components/ui/Boxes";
import { InputMain } from "../../components/ui/Inputs";
import { ButtonMain } from "../../components/ui/Buttons";
import UserService from "../../app/UserService";
import { useNotificationStore } from "../../core/stores/notificationStore";
import { handleChange } from "../../core/utils";
import { profileValidationScheme } from "../../core/ValidationSchemes";

export default function ProfilePage() {
    const user = useUserStore((state) => state.user);
    const submitting = useUserStore(state=>state.submitting);
    const setProfileData = useUserStore(state=>state.setProfileData);
    const setMessage = useNotificationStore(state=>state.setMessage);
    const setMessageType = useNotificationStore(state=>state.setMessageType);

    const us:UserService = new UserService();
    const [formData, setFormData] = useState<ProfileFormData>({
        userName: user?.userName || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || ""
    });

    const [errors, setErrors] = useState<Record<keyof ProfileFormData, string|null>>({
        userName: null,
        firstName: null,
        lastName: null
    });

    if (!user) {
        return null;
    }

    const updateProfile = async ()=> {
        try {
            const fd = await us.updateProfile(formData);
            setFormData(fd);
            setProfileData(fd);

            setMessage("You have successfully updated your profile!");
            setMessageType("success");
        } catch(err) {
            setMessage(err);
            setMessageType("danger");
        }
    };

    return (
        <>
            <form onSubmit={e=>{e.preventDefault(); updateProfile()}}>
                <h1 className="text-3xl my-3 text-center text-main">Update profile</h1>

                <BoxSecondary>
                    <b className="block text-main mb-1">User name</b>
                    <b className="block text-danger">{errors.userName||""}</b>

                    <InputMain
                        type="text" value={formData.userName}
                        placeholder="user name"
                        size="sm" name="userName"
                        onChange={(e:any)=>handleChange(e, setFormData, setErrors, profileValidationScheme)}
                    />

                    <b className="block text-main mb-1">First name</b>
                    <b className="block text-danger">{errors.firstName||""}</b>

                    <InputMain
                        type="text" value={formData.firstName}
                        placeholder="first name"
                        size="sm" name="firstName"
                        onChange={(e:any)=>handleChange(e, setFormData, setErrors, profileValidationScheme)}
                    />

                    <b className="block text-main mb-1">Last name</b>
                    <b className="block text-danger">{errors.lastName||""}</b>

                    <InputMain
                        type="text" value={formData.lastName}
                        placeholder="last name"
                        size="sm" name="lastName"
                        onChange={(e:any)=>handleChange(e, setFormData, setErrors, profileValidationScheme)}
                    />

                    <div className="mt-3">
                        <ButtonMain
                            text="Save"
                            icon="save"
                            isLoading={submitting}
                            disabled={submitting}
                            customClasses={['d-block']}
                        />
                    </div>
                </BoxSecondary>
            </form>
        </>
    );
}