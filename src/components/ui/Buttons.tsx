import type { ButtonProps } from "../../core/interfaces";
import Button from "./Button";

export const ButtonPrimary = (props:ButtonProps)=> {
    return <Button {...props} variant="primary"></Button>
}

export const ButtonSecondary = (props:ButtonProps)=> {
    return <Button {...props} variant="secondary"></Button>
}

export const ButtonDanger = (props:ButtonProps)=> {
    return <Button {...props} variant="danger"></Button>
}

export const ButtonWarning = (props:ButtonProps)=> {
    return <Button {...props} variant="warning"></Button>
}

export const ButtonMain = (props:ButtonProps)=> {
    return <Button {...props} variant="main"></Button>
}

export const ButtonAccent = (props:ButtonProps)=> {
    return <Button {...props} variant="accent"></Button>
}