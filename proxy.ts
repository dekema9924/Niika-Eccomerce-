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
    const publicRoutes = ['/auth/signin', '/auth/signup']
    const isPublicRoute = publicRoutes.includes(pathname)

    // Protected routes
    const protectedRoutes = ['/checkout', '/account', '/myorders', '/wishlist']
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

    // Handle API routes first - return error instead of redirect
    if (pathname.startsWith('/api/') && !session) {
        return NextResponse.json(
            { error: 'Authentication required' },
            { status: 401 }
        )
    }

    // Redirect logged-in users away from auth pages
    if (isPublicRoute && session) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // If user is logged in but email not verified
    if (session && !session?.user.emailVerified) {
        // Don't redirect if already on verify-email page (prevent infinite loop)
        if (pathname !== '/auth/verify-email') {
            return NextResponse.redirect(new URL('/auth/verify-email', request.url))
        }
        // If on verify-email page, allow access
        return NextResponse.next()
    }

    // If user is verified but trying to access verify-email page
    if (session && session?.user.emailVerified && pathname === '/auth/verify-email') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // Redirect logged-out users away from protected pages
    if (isProtectedRoute && !session) {
        const loginUrl = new URL('/auth/signin', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Allow access
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/auth/signin',
        '/auth/signup',
        '/auth/verify-email',
        '/checkout/:path*',
        '/account/:path*',
        '/myorders/:path*',
        '/wishlist/:path*',
        '/api/protected/:path*'
    ]
}