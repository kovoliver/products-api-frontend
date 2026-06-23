import api from "../core/api";
import type { BrandSearchParams, ProductBrand, ProductBrandFormData, ProductBrandsResponse } from "../core/types";
import { apiCatch } from "../core/utils";

export default class ProductBrandService {
    public async search(params:BrandSearchParams):Promise<ProductBrandsResponse> {
        try {
            const queryString = new URLSearchParams(params as Record<string, any>).toString();
            const response = await api.get("/product-brands?" + queryString);
            return response.data as ProductBrandsResponse;
        } catch(err:unknown) {
            throw apiCatch(err);
        }
    }

    public async getBrandById(brandId:number):Promise<ProductBrand> {
        try {
            const response = await api.get(`/product-brands/${brandId}`);

            return response.data as ProductBrand;
        }  catch(err:unknown) {
            throw apiCatch(err);
        }
    }

    public async createBrand(formData:ProductBrandFormData):Promise<ProductBrand> {
        try {
            const response = await api.post(`/product-brands`, formData);

            return response.data as ProductBrand;
        }  catch(err:unknown) {
            throw apiCatch(err);
        }
    }

    public async updateBrand(brandId:number, formData:ProductBrandFormData):Promise<ProductBrand> {
        try {
            const response = await api.patch(`/product-brands/${brandId}`, {
                data:formData
            });

            return response.data as ProductBrand;
        }  catch(err:unknown) {
            throw apiCatch(err);
        }
    }

    public async deleteBrand(brandId:number):Promise<ProductBrand> {
        try {
            const response = await api.delete(`/product-brands/${brandId}`);

            return response.data as ProductBrand;
        }  catch(err:unknown) {
            throw apiCatch(err);
        }
    }
}