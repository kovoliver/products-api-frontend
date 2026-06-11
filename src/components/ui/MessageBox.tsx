import { useEffect } from "react";
import Box from "./Box";
import type { MessageBoxProps } from "../../core/interfaces";
import { normalizeMessages } from "../../core/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MessageBox({
    isVisible,
    setIsVisible,
    message,
    setMessage,
    title,
    variant = "main",
    maxWidth = "max-w-md",
    padding = "md",
    children,
    ...restBoxProps
}: MessageBoxProps) {

    useEffect(() => {
        const normalized = normalizeMessages(message);
        if (normalized.length > 0) {
            setIsVisible(true);
        }
    }, [message, setIsVisible]);

    const handleClose = () => {
        setIsVisible(false);
        setMessage(null);
    };

    if (!isVisible) return null;

    const messagesArray = normalizeMessages(message);

    return (
        <>
            <div 
                className="fixed inset-0 bg-black/50 z-40 transition-opacity backdrop-blur-sm"
                onClick={handleClose}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div className={`w-full ${maxWidth} pointer-events-auto h-auto max-h-[90vh] overflow-y-auto`}>
                    <Box 
                        variant={variant} 
                        padding={padding} 
                        customClasses={["relative", "shadow-xl", "w-full"]}
                        {...restBoxProps}
                    >

                        <FontAwesomeIcon
                            icon="circle-xmark" onClick={handleClose}
                            className="absolute top-4 right-4 cursor-pointer"
                        />

                        {title && (
                            <h3 className="text-lg font-bold mb-3 pr-6">
                                {title}
                            </h3>
                        )}

                        {messagesArray.length > 0 && (
                            <div className="text-md my-2 flex flex-col gap-2 wrap-break-word">
                                {messagesArray.map((msgText, index) => (
                                    <p key={index}>{msgText}</p>
                                ))}
                            </div>
                        )}

                        {children && (
                            <div className="mt-4">
                                {children}
                            </div>
                        )}
                    </Box>
                </div>
            </div>
        </>
    );
}