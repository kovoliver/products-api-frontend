export type Pagination = {
    skip: number;
    limit: number;
    orderBy:"asc"|"desc"|"-";
};

export type Tag = {
    tagId: number;
    name: string;
}

export type Image = {
    imageId: number;
    productId: number;
    isThumbnail: number;
    sortOrder: number;
    path: string;
}

export type ProductBrand = {
    brandId: number;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export type ProductBrandResponse = Omit<ProductBrand, "brandId">;

export type BrandSearchParams = Pagination & {
    name:string;
}

export type ProductBrandFormData = Omit<ProductBrand, "brandId"|"createdAt"|"updatedAt">;

export type ProductBrandsResponse = {
    brands:ProductBrand[];
    total:number;
}

export type Product = {
    productId: number;
    brandId: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    discountPercentage: number;
    tags: Tag[];
    images: Image[];
}

export type ProductFormData = Omit<
    Product, "productId" | "images"
>

export type ProductsResponse = {
    products: Product[];
    total:number;
}

export type AuthResponse = {
    userId: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type ProfileFormData = Omit<AuthResponse, "userId" | "email">;

export type UserLogin = {
    email: string;
    password: string;
};

export type FormErrors<T> = { [K in keyof T]?: string | null };