// types/product.ts
export interface ProductInterface {
    id: string;
    name: string;
    isActive: boolean;
    description: string | null;
    price: number;
    discountPrice: number | null;
    isOutOfStock: boolean;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string | null;
    image: string;
}

export type Variant = {
    id: string
    color: string | null
    size: string | null
    quantity: number
    sku: string | null
}


export interface ProductDetailsInterface extends ProductInterface {
    images: string[];
    category: string;
    colors: string[];
    sizes: string[];
    estimatedDelivery: string;
    deliveryDate: string;
    shippingInfo: string;
    variants: Variant[]


}