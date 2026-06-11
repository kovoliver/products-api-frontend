import api from "../core/api";
import type { ProductResponse, Product, ProductFormData } from "../core/types";
import { apiCatch } from "../core/utils";

export default class ProductsService {
    public async getProducts(limit:number = 12, skip:number = 0, keyword:string = ""): Promise<ProductResponse> {
        try {
            const response = await api.get(`/products/search?limit=${limit}&skip=${skip}&q=${keyword}`);
            return response.data;
        } catch(err) {
            return apiCatch(err);
        }
    }

    public async getProduct(id:number): Promise<ProductFormData> {
        try {
            const response = await api.get(`/products/${id}`);
            
            return {
                brand: response.data.brand,
                title: response.data.title,
                description: response.data.description,
                price: response.data.price,
                discountPercentage: response.data.discountPercentage,
                stock: response.data.stock,
                tags: response.data.tags
            };
        } catch(err) {
            return apiCatch(err);
        }
    }

    public async addProduct(productData: ProductFormData): Promise<Product> {
        try {
            const response = await api.post("/products/add", productData);
            return response.data;
        } catch (err) {
            return apiCatch(err);
        }
    }

    public async updateProduct(id: number, productData: Partial<Product>): Promise<Product> {
        try {
            const response = await api.put(`/products/${id}`, productData);
            return response.data;
        } catch (err) {
            return apiCatch(err);
        }
    }

    public async deleteProduct(id: number): Promise<Product & { isDeleted: boolean; deletedOn: string }> {
        try {
            const response = await api.delete(`/products/${id}`);
            return response.data;
        } catch (err) {
            return apiCatch(err);
        }
    }
}