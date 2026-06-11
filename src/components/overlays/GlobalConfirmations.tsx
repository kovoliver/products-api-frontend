import MessageBox from "../ui/MessageBox";
import Button from "../ui/Button";
import { useConfirmationStore } from "../../core/stores/confirmationStore";
import { useShallow } from 'zustand/react/shallow';

export default function GlobalConfirmation() {
    const {
        isVisible,
        title,
        message,
        messageType,
        confirmText,
        cancelText,
        confirmVariant,
        cancelVariant,
        confirmIcon,
        cancelIcon,
        handleConfirm,
        handleCancel,
    } = useConfirmationStore(
        useShallow((state) => ({
            isVisible: state.isVisible,
            title: state.title,
            message: state.message,
            messageType: state.messageType,
            confirmText: state.confirmText,
            cancelText: state.cancelText,
            confirmVariant: state.confirmVariant,
            cancelVariant: state.cancelVariant,
            confirmIcon: state.confirmIcon,
            cancelIcon: state.cancelIcon,
            handleConfirm: state.handleConfirm,
            handleCancel: state.handleCancel,
        }))
    );

    if (!isVisible) return null;

    return (
        <MessageBox
            isVisible={isVisible}
            setIsVisible={(visible) => { if (!visible) handleCancel(); }}
            message={message}
            setMessage={() => { }}
            title={title}
            variant={messageType}
        >
            <div className="flex justify-end gap-3 mt-6">
                <Button
                    text={cancelText}
                    onClick={handleCancel}
                    icon={cancelIcon}
                    variant={cancelVariant}
                    size="sm"
                />

                <Button
                    text={confirmText}
                    onClick={handleConfirm}
                    icon={confirmIcon}
                    variant={confirmVariant}
                    size="sm"
                />
            </div>
        </MessageBox>
    );
}