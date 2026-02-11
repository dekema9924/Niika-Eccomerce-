// utils/cart.ts (no 'use client' needed)
export const saveCartToLocalStorage = (
    productId: string,
    variantId: string,
    quantity: number
) => {
    if (typeof window === 'undefined') return; // Server-side safety

    try {
        const existingCart = localStorage.getItem('userCart');
        let items = existingCart ? JSON.parse(existingCart) : [];

        // Check if item exists
        const existingItemIndex = items.findIndex(
            (item: any) => item.productId === productId && item.variantId === variantId
        );

        if (existingItemIndex > -1) {
            items[existingItemIndex].quantity += quantity;
        } else {
            items.push({ productId, variantId, quantity });
        }

        localStorage.setItem('userCart', JSON.stringify(items));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
};