
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getUserSession } from "./lib/server/getUserSession";

export async function proxy(request: NextRequest) {

    const session = await getUserSession()
    const { pathname } = request.nextUrl


    if (pathname === '/') {
        return NextResponse.next()
    }


    // Public auth routes (login, register, etc.)
    const publicRoutes = ['/auth/signin', '/auth/signup', '/auth/forgot-password']
    const isPublicRoute = publicRoutes.includes(pathname)

    // Protected routes
    const protectedRoutes = ['/checkout', '/account', '/myorders', '/wishlist']
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

    // Redirect logged-in users away from auth pages
    if (isPublicRoute && session) {
        const homeUrl = new URL('/', request.url)
        return NextResponse.redirect(homeUrl)
    }

    // Redirect logged-out users away from protected pages
    if (isProtectedRoute && !session) {
        const loginUrl = new URL('/auth/signin', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
    }


    // API routes - return error instead of redirect
    if (pathname.startsWith('/api/') && !session) {
        return NextResponse.json(
            { error: 'Authentication required' },
            { status: 401 }
        )
    }

    return NextResponse.next()






}

export const config = {
    matcher: [
        '/auth/signin',
        '/auth/signup',
        '/checkout/:path*',
        '/account/:path*',
        '/myorders/:path*',
        '/wishlist/:path*',
        '/api/protected/:path*'
    ]
}