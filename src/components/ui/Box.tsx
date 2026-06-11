import { BoxVariants } from "../../core/theme";
import type { BoxProps } from "../../core/interfaces";

export default function Box({
    children,
    variant,
    padding,
    borderWidth,
    rounded = "rounded",
    customClasses = []
}: BoxProps) {
    let classes = BoxVariants({variant, padding, borderWidth});

    classes += customClasses ? ` ${rounded} ` + customClasses.join(" ") : "";

    return (
        <div className={classes}>
            {children}
        </div>
    );
}