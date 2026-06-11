import Box from "./Box";
import type { BoxProps } from "../../core/interfaces";

export function BoxPrimary(props: BoxProps) {
    return <Box {...props} variant="primary"/>;
}

export function BoxSecondary(props: BoxProps) {
    return <Box {...props} variant="secondary" />;
}

export function BoxDanger(props: BoxProps) {
    return <Box {...props} variant="danger" />;
}

export function BoxWarning(props: BoxProps) {
    return <Box {...props} variant="warning" />;
}

export function BoxMain(props: BoxProps) {
    return <Box {...props} variant="main" />;
}

export function BoxAccent(props: BoxProps) {
    return <Box {...props} variant="accent" />;
}