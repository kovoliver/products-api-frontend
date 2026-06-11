export type Tag = {
    tagId:number;
    name:string;
}

export type Image = {
    imageId:number;
    productId:number;
    isThumbnail:number;
    sortOrder:number;
    path:number;
}

export type Product = {
    productId: number;
    brandId: string;
    title: string;
    description: string;
    price: number;
    stock:number;
    discountPercentage: number;
    tags: Tag[];
    images: Image[];
}

export type ProductFormData = Omit<
    Product, "productId"
>;

export type ProductResponse = {
    products:Product[];
    total:number;
    skip:number;
    limit:number;
}

export type AuthResponse = {
    userId: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type UserFormData = Omit<AuthResponse, "userId">;

export type UserLogin = {
    email: string;
    password: string;
};

export type FormErrors<T> = { [K in keyof T]?: string | null };