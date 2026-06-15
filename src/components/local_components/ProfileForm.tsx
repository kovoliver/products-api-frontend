import { useState } from "react";
import UserService from "../../app/UserService";
import { useUserStore } from "../../core/stores/userStore";
import type { AuthResponse, ProfileFormData } from "../../core/types";
import { BoxSecondary } from "../ui/Boxes";
import { ButtonMain } from "../ui/Buttons";
import { InputMain } from "../ui/Inputs";
import { useNotificationStore } from "../../core/stores/notificationStore";
import { handleChange, onlyChangedKeys } from "../../core/utils";
import { profileValidationScheme } from "../../core/ValidationSchemes";

export default function ProfileForm({ initFormData, submitting }: { initFormData: AuthResponse, submitting:boolean }) {
    const setProfileData = useUserStore(state => state.setProfileData);
    const setMessage = useNotificationStore(state=>state.setMessage);
    const setMessageType = useNotificationStore(state=>state.setMessageType);

    const us:UserService = new UserService();

    const [formData, setFormData] = useState<ProfileFormData>({
        userName: initFormData?.userName || "",
        firstName: initFormData?.firstName || "",
        lastName: initFormData?.lastName || ""
    });

    const [errors, setErrors] = useState<Record<keyof ProfileFormData, string|null>>({
        userName: null,
        firstName: null,
        lastName: null
    });

    const updateProfile = async ()=> {
        try {
            const fd = onlyChangedKeys(initFormData, formData);
            const user = await us.updateProfile(fd);
            setFormData(user);
            setProfileData(user);

            setMessage("You have successfully updated your profile!");
            setMessageType("success");
        } catch(err) {
            setMessage(err);
            setMessageType("danger");
        }
    };

    return (
        <form onSubmit={e => { e.preventDefault(); updateProfile() }}>
            <h1 className="text-3xl my-3 text-center text-main">Update profile</h1>

            <BoxSecondary>
                <b className="block text-main mb-1">User name</b>
                <b className="block text-danger">{errors.userName || ""}</b>

                <InputMain
                    type="text" value={formData.userName}
                    placeholder="user name"
                    size="sm" name="userName"
                    onChange={(e: any) => handleChange(e, setFormData, setErrors, profileValidationScheme)}
                    customClasses={['w-full']}
                />

                <b className="block text-main mb-1">First name</b>
                <b className="block text-danger">{errors.firstName || ""}</b>

                <InputMain
                    type="text" value={formData.firstName}
                    placeholder="first name"
                    size="sm" name="firstName"
                    onChange={(e: any) => handleChange(e, setFormData, setErrors, profileValidationScheme)}
                    customClasses={['w-full']}
                />

                <b className="block text-main mb-1">Last name</b>
                <b className="block text-danger">{errors.lastName || ""}</b>

                <InputMain
                    type="text" value={formData.lastName}
                    placeholder="last name"
                    size="sm" name="lastName"
                    onChange={(e: any) => handleChange(e, setFormData, setErrors, profileValidationScheme)}
                    customClasses={['w-full']}
                />

                <div className="mt-3">
                    <ButtonMain
                        text="Save"
                        icon="save"
                        isLoading={submitting}
                        disabled={submitting}
                        customClasses={['d-block']}
                        size="sm"
                    />
                </div>
            </BoxSecondary>
        </form>
    );
}