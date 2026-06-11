import { create } from "zustand";
import type { ConfirmationStoreType, ConfirmationOptions } from "../interfaces";

export const useConfirmationStore = create<ConfirmationStoreType>((set, get) => ({
    title: undefined,
    message: null,
    messageType: "warning",
    isVisible: false,
    confirmText: "OK",
    cancelText: "Mégse",
    confirmVariant: "main",
    cancelVariant: "secondary",
    confirmIcon: undefined,
    cancelIcon: undefined,
    confirmCallback: null,
    cancelCallback: null,

    askConfirmation: (options: ConfirmationOptions) => {
        set({
            title: options.title,
            message: options.message,
            messageType: options.messageType || "warning",
            confirmText: options.confirmText || "OK",
            cancelText: options.cancelText || "Mégse",
            confirmVariant: options.confirmVariant || "main",
            cancelVariant: options.cancelVariant || "secondary",
            confirmIcon: options.confirmIcon,
            cancelIcon: options.cancelIcon,
            confirmCallback: options.onConfirm as any,
            cancelCallback: options.onCancel || null,
            isVisible: true,
        });
    },

    handleConfirm: async () => {
        const callback = get().confirmCallback;
        if (callback) {
            await callback();
        }
        get().closeAndReset();
    },

    handleCancel: () => {
        const callback = get().cancelCallback;
        if (callback) {
            callback();
        }
        get().closeAndReset();
    },

    closeAndReset: () => {
        set({
            isVisible: false,
            message: null,
            title: undefined,
            confirmCallback: null,
            cancelCallback: null,
            confirmText: "OK",
            cancelText: "Mégse",
            confirmVariant: "main",
            cancelVariant: "secondary",
            confirmIcon: undefined,
            cancelIcon: undefined,
        });
    },
}));