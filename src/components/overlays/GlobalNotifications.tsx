import { useEffect } from "react";
import Alert from "../ui/Alert";
import { normalizeMessages } from "../../core/utils";
import { useNotificationStore } from "../../core/stores/notificationStore";

export default function GlobalNotifications() {
    const messageType = useNotificationStore((state)=>state.messageType);
    const isVisible = useNotificationStore((state)=>state.isVisible);
    const setIsVisible = useNotificationStore(state=>state.setIsVisible);
    const message = useNotificationStore((state)=>state.message);
    const messages = normalizeMessages(message);
    const setMessage = useNotificationStore((state)=>state.setMessage);

    useEffect(() => {
        setIsVisible(messages.length > 0);
    }, [messages]);

    return (
        <div className="max-w-125 mx-auto">
            {messages.map((msg, i) => (
                <Alert
                    key={i}
                    variant={messageType}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    onClose={() => setMessage(messages.filter((_, index)=>index !== i))}
                    customClasses={["my-3"]}
                >
                    {msg}
                </Alert>
            ))}
        </div>
    );
}