import type { SelectProps } from "../../core/interfaces";
import Select from "./Select";

export const SelectPrimary = (props: SelectProps) => {
    return <Select {...props} variant="primary" />;
};

export const SelectSecondary = (props: SelectProps) => {
    return <Select {...props} variant="secondary" />;
};

export const SelectDanger = (props: SelectProps) => {
    return <Select {...props} variant="danger" />;
};

export const SelectWarning = (props: SelectProps) => {
    return <Select {...props} variant="warning" />;
};

export const SelectMain = (props: SelectProps) => {
    return <Select {...props} variant="main" />;
};

export const SelectAccent = (props: SelectProps) => {
    return <Select {...props} variant="accent" />;
};