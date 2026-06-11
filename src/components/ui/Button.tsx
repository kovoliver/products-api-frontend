import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import type { ButtonProps } from "../../core/interfaces";
import { ButtonVariants } from "../../core/theme";

export default function Button({
    text, 
    variant, 
    size, 
    customClasses = null, 
    icon = null, 
    onClick = null, 
    isLoading = false,
    disabled = false
}: ButtonProps) {
    let classes = !disabled ? ButtonVariants({ variant, size })
    : ButtonVariants({ variant:"disabled", size });
    
    classes += customClasses ? " " + customClasses.join(" ") : "";

    return (
        <button 
            className={`rounded transition-all duration-200 ${classes}`} 
            onClick={onClick || undefined}
            disabled={disabled}
        >
            <span className={icon || (isLoading) ? "mr-2" : ""}>
                {text}
            </span>

            {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
                icon && <FontAwesomeIcon icon={icon} />
            )}
        </button>
    );
}