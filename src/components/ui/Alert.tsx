import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "./Box";
import type { AlertProps } from "../../core/interfaces";

export default function Alert({ children, onClose, customClasses = null, 
    isVisible, setIsVisible, ...boxProps }: AlertProps) {
    if (!isVisible) return null;

    const handleClose = () => {
        setIsVisible(false);
        children = null;
        if (onClose) onClose();
    };

    return (
        <div className={"relative " + (customClasses ? customClasses.join(" ") : "")}>
            <Box {...boxProps}>
                <div className="pr-8">
                    {children}
                </div>
            </Box>
            
            <button 
                onClick={handleClose}
                className="absolute top-0 right-2 p-1 hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Close"
            >
                <FontAwesomeIcon className="text-white" icon="circle-xmark" />
            </button>
        </div>
    );
}