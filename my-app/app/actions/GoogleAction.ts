"use server"

import { auth, signIn, signOut } from "@/auth"

export async function handleGoogleLogin() {
    await signIn("google", { redirectTo: "/" })
}

export async function handleGoogleSignout() {
    await signOut({ redirectTo: "/login" })
}

export async function checkGoogleSession() {
    const session = await auth()
    return session
}

