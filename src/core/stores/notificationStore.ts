import {create} from "zustand";
import type { NotificationStoreType } from "../interfaces";
import { type ThemeColorType } from "../theme";

export const useNotificationStore = create<NotificationStoreType>((set)=>({
    message:null,
    messageType:"success",
    isVisible:false,
    setMessage: (msg:any) => set({ message: msg }),
    setMessageType: (type:ThemeColorType) => set({ messageType: type }),
    setIsVisible: (visible:boolean) => set({ isVisible: visible }),
}));