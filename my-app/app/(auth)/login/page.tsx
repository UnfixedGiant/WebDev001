"use client"

import AuthLoginForm from "./AuthLoginForm"
import SigninButton from "./SigninButton"
import { useState, useEffect } from "react"

import { handleGoogleLogin } from "@/app/actions/GoogleAction"
import { useSearchParams } from "next/navigation"

const LoginPage = () => {

    const searchParams = useSearchParams()
    const isJustRegistered = searchParams.get("registered") === "true"

    const [elogin, setElogin] = useState(false)

    useEffect(() => {
        if (isJustRegistered) {
            setElogin(true)
        }
    }, [])

    const ShowEmailLogin = () => {
        setElogin(!elogin)
    }

    return (
        <>
            <h2 className="card-title text-2xl justify-center">Please Sign In</h2>
            <form className="mt-4">
                <SigninButton
                    text="Google"
                    style="btn btn-primary w-full"
                    formAction={handleGoogleLogin}
                />
            </form>
            <div className="mt-4">
                <SigninButton
                    text="Email"
                    style="btn btn-primary w-full"
                    callback={ShowEmailLogin}
                />
            </div>
            {elogin ? <AuthLoginForm /> : ""}
            {isJustRegistered && (
                <div className="p-10" bg-emerald-100 text-emerald-700 mb-15 rounded-md>
                    Account Created Successfully! Please sign in with your credentials
                </div>
            )}
        </>

    )
}

export default LoginPage