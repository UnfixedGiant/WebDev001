"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import Link from "next/link"


const AuthLoginForm = () => {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setIsSubmitting(true)

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })
        if (res?.error) {
            setError("Invalid email or password")
        } else {
            router.push("/")
            router.refresh()
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="mt-4">
                {error && (
                    <div className="alert alert-error mb-4">
                        <span>{error}</span>
                    </div>
                )}
                {" "}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="input input-bordered w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="**********"
                        className="input input-bordered w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </div>
            </form>
            <div className="divider">OR</div>
            <p className="text-center">
                Don&apos;t have an account? {" "}
                <Link href="/register" className="link link-primary">
                    Sign Up
                </Link>
            </p>

        </>
    )

}

export default AuthLoginForm