import type { InputProps } from "../../core/interfaces";
import Input from "./Input";

export const InputPrimary = (props: InputProps) => {
    return <Input {...props} variant="primary" />;
};

export const InputSecondary = (props: InputProps) => {
    return <Input {...props} variant="secondary" />;
};

export const InputDanger = (props: InputProps) => {
    return <Input {...props} variant="danger" />;
};

export const InputWarning = (props: InputProps) => {
    return <Input {...props} variant="warning" />;
};

export const InputMain = (props: InputProps) => {
    return <Input {...props} variant="main" />;
};

export const InputAccent = (props: InputProps) => {
    return <Input {...props} variant="accent" />;
};