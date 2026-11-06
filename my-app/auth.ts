import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { verifyPassword } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"




export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google, Credentials({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) return null

            const user = await prisma.user.findUnique({
                where: { email: credentials.email as string }
            })

            if (!user || !user.password) return null

            const isValid = await verifyPassword(
                credentials.password as string,
                user.password,
            )
            if (!isValid) return null

            return { id: user.id.toString(), email: user.email, name: user.name }
        },
    }),
    ],

    session: { strategy: "jwt" },
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth
        }
    }
})


