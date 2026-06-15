import type { ObjectSchema } from 'joi';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import isEqual from "fast-deep-equal";

export function getValueByKey(object: Record<string, any>, key: string, context: string): string {
    if (!(key in object)) {
        const errorMsg = `[UI Error] The "${key}" key is missing: ${context}.`;

        if (import.meta.env.DEV) {
            throw new Error(errorMsg);
        } else {
            console.error(errorMsg);
            return "";
        }
    }
    return object[key];
}

export const createColorObject = (colors: Record<string, string>, prop: string): Record<string, string> => {
    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(colors)) {
        result[key] = `${prop}-${value}`;
    }

    return result;
};

export const apiCatch = (err: any) => {
    return err.response?.data?.message ?? "Unexpected error happened. Please, try again later!";
};

export const validateField = (
    name: string,
    value: any,
    fieldSchema: ObjectSchema
): string | null => {
    const schema = fieldSchema.extract(name);
    const { error } = schema.validate(value);
    return error?.details[0]?.message || null;
};

export const haveSameKeys = (objA: Record<string, any>, objB: Record<string, any>): boolean => {
    return Object.keys(objA).sort().join(',') === Object.keys(objB).sort().join(',');
};

export const validateForm = (
    formData: Record<string, any>,
    schema: ObjectSchema
): { passed: boolean; errors: Record<string, any> } => {
    const { error } = schema.validate(formData, { abortEarly: false });

    const errors: Record<string, any> = {};
    for (const key of Object.keys(formData)) {
        errors[key] = null;
    }

    if (!error) {
        return { passed: true, errors };
    }

    for (const err of error.details) {
        const key = err.path[0];
        if (key && typeof key === 'string') {
            errors[key] = err.message;
        }
    }

    return { passed: false, errors };
};

export const handleChange = <
    T extends Record<string, any>,
    E extends Record<string, any>
>(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    setForm: Dispatch<SetStateAction<T>>,
    setErrors: Dispatch<SetStateAction<E>> | null = null,
    schema: ObjectSchema | null = null
): void => {
    const { name, value } = e.target;

    setForm(prev => ({ ...prev, [name]: value }));

    if (setErrors && schema) {
        const error = validateField(name, value, schema);
        setErrors(prev => ({ ...prev, [name]: error }));
    }
};

export function normalizeMessages(msg: string | string[] | Record<string, any> | null | undefined): string[] {
    if (!msg) return [];

    const normalizeOne = (m: string | string[] | Record<string, any>): string[] => {
        if (!m) return [];

        if (typeof m === "string") {
            return m.trim() ? [m] : [];
        }

        if (Array.isArray(m)) {
            return m.flatMap(normalizeOne);
        }

        return Object.entries(m)
            .filter(([, v]) => v !== null && v !== undefined && v !== "")
            .map(([_, v]) => v);
    };

    return normalizeOne(msg);
}

export function onlyChangedKeys<T extends Record<string, any>>(a: T, b: T): Partial<T> {
    const result: Partial<T> = {};

    for (const key of Object.keys(b) as (keyof T)[]) {
         if (!isEqual(a[key], b[key])) {
            result[key] = b[key];
        }
    }

    return result;
}