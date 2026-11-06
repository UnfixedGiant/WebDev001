"use client"
import Cookies from "js-cookie"

import { useRouter } from "next/navigation"

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode
} from "react"

import {
    checkGoogleSession,
    handleGoogleSignout
} from "../actions/GoogleAction"
import { Login } from "../people/person"

interface User {
    id: string | null | undefined
    email: string | null | undefined
    name: string | null | undefined
}

interface AuthState {
    user: User
    isAuthenticated: boolean
    isLoading: boolean
}

interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<AuthResponse>
    register: (credentials: RegisterCredentials) => Promise<AuthResponse>
    checkGoogle: () => void
    logout: () => Promise<void>
}

interface LoginCredentials {
    email: string
    password: string
}

interface RegisterCredentials extends LoginCredentials {
    name: string
}

interface AuthResponse {
    user: User
    message?: string
    error?: string
}




const AuthContext = createContext<AuthContextType | undefined>(undefined)




export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter()

    const user = {
        id: "",
        email: "",
        name: ""
    }

    const [authState, setAuthState] = useState<AuthState>({
        user: user,
        isAuthenticated: false,
        isLoading: true
    })

    const checkGoogle = async () => {
        const session = await checkGoogleSession()
        if (session) {
            const currentUser: User = {
                id: session.user?.id,
                name: session.user?.name,
                email: session.user?.email
            }
            setAuthState({
                user: currentUser,
                isAuthenticated: true,
                isLoading: false
            })
        }
    }

    useEffect(() => {
        checkGoogle()
    }, [])




    const login = useCallback(
        async (credentials: LoginCredentials): Promise<AuthResponse> => {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
                credentials: "include"
            })

            const data: AuthResponse = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Login failed ")
            }


            setAuthState({
                user: data.user,
                isAuthenticated: true,
                isLoading: false
            })
            return data
        },
        []
    )

    const register = useCallback(
        async (credentials: RegisterCredentials): Promise<AuthResponse> => {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
                credentials: "include"
            })

            const data: AuthResponse = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Registration Failed ")
            }

            setAuthState({
                user: data.user,
                isAuthenticated: true,
                isLoading: false
            })
            return data
        },
        []
    )

    const logout = useCallback(async () => {
        const googleSessionToken =
            Cookies.get("authjs.session-token") ||
            Cookies.get("_Secure-authjs.session-token")

        const isGoogleUser = Boolean(googleSessionToken)

        setAuthState({
            user: user,
            isAuthenticated: false,
            isLoading: false
        })
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include"
            })
        } catch {

        }
        if (isGoogleUser) {
            try {
                await handleGoogleSignout()
            } catch (err) {
                console.error("Google signout error:", err)
            }
        }
        router.push("login")
    }, [router])

    const value: AuthContextType = {
        ...authState,
        login,
        register,
        checkGoogle,
        logout
    }
    return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>
}


export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used wuthin an AuthProvider")
    }
    return context
}

