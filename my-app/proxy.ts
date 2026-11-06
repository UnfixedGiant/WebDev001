//export { auth as proxy } from "@/auth"

import { auth } from "@/auth"
import { NextResponse } from "next/server"



export const proxy = auth(async (req) => {
    const isLoggedIn = !!req.auth
    const currentPath = req.nextUrl.pathname

    const isAuthRoute = currentPath === "/login" || currentPath === "/register"

    if (!isLoggedIn && !isAuthRoute) {
        const newUrl = new URL("/login", req.nextUrl.origin)
        return NextResponse.redirect(newUrl)
    }
    if (isLoggedIn && isAuthRoute) {
        const newUrl = new URL("/", req.nextUrl.origin)
        return NextResponse.redirect(newUrl)
    }

    return NextResponse.next()
})



export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}