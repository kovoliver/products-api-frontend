import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { AuthResponse, ProfileFormData } from "./types";
import type { ThemeColorType } from "./theme";

export interface UserStoreType {
    user: AuthResponse | null;
    isAuthenticated: boolean;
    authLoading: boolean;
    fetching:boolean;
    submitting:boolean;
    csrfToken:string|null;
    login: (userData: AuthResponse) => void;
    setProfileData: (profileData:ProfileFormData)=>void;
    logout: () => void;
    softLogout:()=>void;
    setAuthLoading: (loading: boolean) => void;
    setFetching: (loading: boolean) => void;
    setSubmitting: (loading: boolean) => void;
    verifyUser:()=>void;
    getCsrfToken:()=>Promise<string>;
}

export interface ConfirmationOptions {
    title?: string;
    message: string | string[] | Record<string, any>;
    messageType: ThemeColorType;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: ThemeColorType;
    cancelVariant?: ThemeColorType;
    confirmIcon: IconProp|undefined;
    cancelIcon: IconProp|undefined;
    onConfirm: (() => void | Promise<void>) | null;
    onCancel?: () => void | null;
}

export interface ConfirmationStoreType {
    title: string | undefined;
    message: string | string[] | Record<string, any> | null;
    messageType: ThemeColorType;
    isVisible: boolean;
    confirmText: string;
    cancelText: string;
    confirmVariant: ThemeColorType;
    cancelVariant: ThemeColorType;
    confirmIcon: IconProp|undefined;
    cancelIcon: IconProp|undefined;
    confirmCallback: (() => void | Promise<void>) | null;
    cancelCallback: (() => void) | null;
    askConfirmation: (options: ConfirmationOptions) => void;
    handleConfirm: () => void;
    handleCancel: () => void;
    closeAndReset: () => void;
}

export interface NotificationStoreType {
    message: string | string[] | Record<string, any> | null;
    messageType: ThemeColorType;
    isVisible: boolean;
    setMessage: (message: any) => void;
    setMessageType: (type: ThemeColorType) => void;
    setIsVisible: (isVisible: boolean) => void;
}

export interface ButtonProps {
    text:string;
    variant?:ThemeColorType;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    customClasses?:string[]|null;
    icon?:IconProp|null;
    isLoading?:boolean;
    disabled?:boolean;
    onClick?: ((...args: any[]) => any) | null;
}

export interface InputProps {
    name?:string;
    id?:string;
    type:"text"|"password"|"email"|"date"|"time"|"number"|"textarea";
    value?:string|number;
    placeholder:string;
    variant?:ThemeColorType|undefined|null;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    customClasses?:string[]|null;
    onChange?: ((...args: any[]) => any) | null;
}

export interface SelectProps extends Omit<InputProps, "type"|"placeholder"> {
    options:string[]|number[]|{id:number|string, value:string}[]|any[];
}

export interface TagInputProps extends Omit<InputProps, "type"|"value"> {
    tags:string[];
    setTags?: ((...args: any[]) => any) | null;
};

export interface BoxProps {
    children?: React.ReactNode;
    variant?:ThemeColorType;
    padding?: "none" | "sm" | "md" | "lg" | "xl" | "xxl";
    borderWidth?:"border-thin"|"border-medium"|"border-thick";
    rounded?: "rounded-none" | "rounded" | "rounded-md" | "rounded-lg" | "rounded-xl" | "rounded-full";
    customClasses?: string[] | null;
}

export interface TagInputProps {
    boxVariant?:ThemeColorType;
    tagVariant?:ThemeColorType;
    placeholder:string;
    tags:string[];
    addTag:(tag:string)=>any;
    removeTag:(index:number)=>any;
}

export interface TagProps {
    variant:ThemeColorType;
    index:number;
    value:string;
    removeTag:(index:number)=>any;
}

export interface AlertProps extends BoxProps {
    onClose?: () => void;
    isVisible:boolean;
    setIsVisible:(isVisible:boolean)=>void;
}

export interface MessageBoxProps extends BoxProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    message: string | string[] | Record<string, any> | null | undefined;
    setMessage: (message: any) => void;
    title?: string;
    maxWidth?: string;
}

export type SimpleButtonProps = Pick<ButtonProps, "text" | "size" | "customClasses" | "icon" | "onClick">;