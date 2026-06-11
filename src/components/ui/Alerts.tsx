import Alert from "./Alert";
import type { AlertProps } from "../../core/interfaces";

export function AlertPrimary(props: AlertProps) {
    return <Alert {...props} variant="primary" />;
}

export function AlertSecondary(props: AlertProps) {
    return <Alert {...props} variant="secondary" />;
}

export function AlertDanger(props: AlertProps) {
    return <Alert {...props} variant="danger" />;
}

export function AlertWarning(props: AlertProps) {
    return <Alert {...props} variant="warning" />;
}

export function AlertMain(props: AlertProps) {
    return <Alert {...props} variant="main" />;
}

export function AlertAccent(props: AlertProps) {
    return <Alert {...props} variant="accent" />;
}

export function AlertSuccess(props: AlertProps) {
    return <Alert {...props} variant="success" />;
}

export function AlertInfo(props: AlertProps) {
    return <Alert {...props} variant="info" />;
}