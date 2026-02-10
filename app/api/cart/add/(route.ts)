// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from '@/lib/server/prisma'
// import { getUserSession } from "@/lib/server/getUserSession";

// export const POST = async (req: NextRequest) => {

//     const { productId, variantId, quantity } = await req.json()
//     console.log(productId, quantity, variantId)


//     // Validate input
//     if (!productId) {
//         return NextResponse.json({ "message": "No product selected" }, { status: 400 })
//     }

//     // Get user session
//     const session = await getUserSession()
//     console.log('Cookies:', req.headers.get('cookie'))  // ← Debug


//     console.log('Session found:', session)  // ← Debug


//     if (!session) {
//         return NextResponse.json({ "message": "Unauthorized" }, { status: 401 })
//     }

//     try {

//         //check if productID is valid
//         const product = await prisma.product.findUnique({
//             where: { id: productId }
//         })

//         if (!product) {
//             return NextResponse.json({
//                 message: "Product not found"
//             }, { status: 404 })
//         }


//         //  if variantId provided
//         if (variantId) {
//             const variant = await prisma.productVariant.findUnique({
//                 where: { id: variantId }
//             })

//             if (!variant) {
//                 return NextResponse.json({
//                     message: "Product variant not found"
//                 }, { status: 404 })
//             }
//         }

//         // Get or create user's cart
//         let cart = await prisma.cart.upsert({
//             where: { userId: session.user.id },
//             update: {},
//             create: { userId: session.user.id }
//         })

//         // Check if item already exists in cart
//         const existingItem = await prisma.cartItem.findUnique({
//             where: {
//                 cartId_productId_variantId: {
//                     cartId: cart.id,
//                     productId: productId,
//                     variantId: variantId || null
//                 }
//             }
//         })

//         if (existingItem) {
//             // Update quantity if item exists
//             await prisma.cartItem.update({
//                 where: { id: existingItem.id },
//                 data: {
//                     quantity: existingItem.quantity + (quantity || 1)
//                 }
//             })

//             return NextResponse.json({
//                 message: "Cart updated",
//                 success: true,
//                 item: existingItem
//             }, { status: 200 })
//         } else {
//             // Create new cart item
//             const newItem = await prisma.cartItem.create({
//                 data: {
//                     cartId: cart.id,
//                     productId: productId,
//                     variantId: variantId || null,
//                     quantity: quantity || 1
//                 }
//             })

//             return NextResponse.json({
//                 message: "Item added to cart",
//                 item: newItem,
//                 success: true
//             }, { status: 201 })
//         }

//     } catch (err) {
//         console.error('Error adding to cart:', err)
//         return NextResponse.json({
//             message: "Failed to add item to cart",
//             error: err instanceof Error ? err.message : 'Unknown error'
//         }, { status: 500 })
//     }
// }