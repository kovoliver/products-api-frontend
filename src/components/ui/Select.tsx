import type { SelectProps } from "../../core/interfaces";
import { InputVariants } from "../../core/theme";

export default function Select({size, customClasses, variant,
    options, name="", id="", value = "", onChange = null}: SelectProps) {
    let classes = InputVariants({variant, size});
    classes += customClasses ? " " + customClasses.join(" ") : "";

    const isStrOrNumArray = options.length > 0 && typeof options[0] === "string" || typeof options[0] === "number";

    return (
        <select className={classes} name={name} id={id} value={value} onChange={onChange||undefined}>
            {isStrOrNumArray 
                ?
                  (options as string[]).map((opt, index) => (
                      <option key={index} value={opt}>
                          {opt}
                      </option>
                  ))
                :
                  (options as { id: number | string; value: any }[]).map((opt) => (
                      <option key={opt.id} value={opt.id}>
                          {opt.value}
                      </option>
                  ))
            }
        </select>
    );
}