'use server'
import { getUserSession } from "./getUserSession";
import { prisma } from "./prisma";



type AddToCartInput = {
    productId: string
    variantId: string
    quantity: number
}




//add cart items
export async function addToCart({ productId, quantity, variantId }: AddToCartInput) {
    const session = await getUserSession()

    try {
        // Better Auth session in Server Action

        if (!session?.user) {
            throw new Error('Unauthorized - Please log in')
        }

        // Find or create cart
        let cart = await prisma.cart.findUnique({
            where: { userId: session.user.id }
        })

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId: session.user.id }
            })
        }

        // Check if item exists
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId,
                variantId
            }
        })

        if (existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity }
            })
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    variantId,
                    quantity
                }
            })
        }

        return {
            success: true,
            message: 'Item added to cart!'
        }
    } catch (error: any) {
        console.error('Server Action error:', error)
        throw new Error(error.message || 'Failed to add to cart')
    }
}




// gwt cart
export async function getCartItems() {
    const session = await getUserSession()

    if (!session) {
        return { error: 'Unauthorized', items: [] }
    }

    const cartItems = await prisma.cart.findUnique({
        where: { userId: session.user.id },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            images: true
                        }
                    }
                }
            }
        }
    })

    const serializedCart = {
        ...cartItems,
        items: cartItems?.items.map(item => ({
            ...item,
            product: {
                ...item.product,
                price: item.product.price.toNumber(), // ← Convert Decimal
                discountPrice: item.product.discountPrice?.toNumber() || null
            }
        })) || []
    }

    return { items: serializedCart.items }
}


//delete item from cart
export const deleteCartItem = async (cartItemId: string) => {
    const session = await getUserSession()

    if (!session?.user) {
        throw new Error('Unauthorized - Please log in')
    }

    try {
        const userCart = await prisma.cart.findUnique({
            where: { userId: session.user.id },
        })

        if (!userCart) {
            throw new Error("User has no cart")
        }

        const deletedItem = await prisma.cartItem.deleteMany({
            where: {
                id: cartItemId,
                cartId: userCart.id
            }
        })

        if (deletedItem.count === 0) {
            return {
                success: false,
                message: "Item not found in your cart"
            }
        }

        return {
            success: true
        }

    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}
