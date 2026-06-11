import Joi from 'joi';
import type { ProductFormData } from './types';

export const productValidationSchema = Joi.object<ProductFormData>({
    brand: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Brand is required.',
            'any.required': 'Brand is required.',
            'string.min': 'Brand must be at least 1 character long.',
            'string.max': 'Brand must be at most 100 characters long.',
        }),

    title: Joi.string()
        .trim()
        .min(1)
        .max(150)
        .required()
        .messages({
            'string.empty': 'Product title is required.',
            'any.required': 'Product title is required.',
            'string.min': 'Product title must be at least 1 character long.',
            'string.max': 'Product title must be at most 150 characters long.',
        }),

    description: Joi.string()
        .trim()
        .max(1000)
        .allow('')
        .required()
        .messages({
            'string.max': 'Description must be at most 1000 characters long.',
            'any.required': 'Description is required.',
        }),

    price: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': 'Price must be a number.',
            'number.positive': 'Price must be greater than 0.',
            'any.required': 'Price is required.',
        }),

    discountPercentage: Joi.number()
        .min(0)
        .max(100)
        .required()
        .messages({
            'number.base': 'Discount percentage must be a number.',
            'number.min': 'Discount percentage cannot be less than 0.',
            'number.max': 'Discount percentage cannot be greater than 100.',
            'any.required': 'Discount percentage is required.',
        }),

    stock: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': 'Stock must be a number.',
            'number.integer': 'Stock must be an integer.',
            'number.min': 'Stock cannot be negative.',
            'any.required': 'Stock is required.',
        }),

    tags: Joi.array()
        .items(Joi.string().trim())
        .required()
        .messages({
            'array.base': 'Tags must be an array.',
            'any.required': 'Tags are required.',
        })
});