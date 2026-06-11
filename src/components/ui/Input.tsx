import type { InputProps } from "../../core/interfaces";
import { InputVariants } from "../../core/theme";

export default function Input({type, placeholder, variant, size, customClasses, 
    name="", id="", value = "", onChange = null}: InputProps) {
    let classes = InputVariants({variant, size});

    classes += customClasses ? " " + customClasses.join(" ") : "";
    
    return(
        type !== "textarea"
        ? 
        <input 
            type={type} className={classes}
            placeholder={placeholder} 
            onChange={onChange||undefined}
            value={value}
            name={name} id={id}
        />
        :
        <textarea 
            className={classes}
            placeholder={placeholder} 
            onChange={onChange||undefined}
            value={value}
            name={name} id={id}
        />
    );
}