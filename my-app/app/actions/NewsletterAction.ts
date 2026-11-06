"use server"

import { auth } from "@/auth"
import { prisma } from "../lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createNewsletter(formData: FormData) {
    const session = await auth()
    if (!session?.user?.email) redirect("/login")

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    })
    if (!user) redirect("/login")

    const title = (formData.get("title") as string)?.trim()
    const content = (formData.get("content") as string)?.trim()
    const image = (formData.get("image") as string)?.trim() || null
    const status = formData.get("status") as "Draft" | "Schedule" | "Sent"

    if (!title || !content) return

    await prisma.newsletter.create({
        data: { title, content, image, status, authorId: user.id },
    })

    revalidatePath("/dashboard")
    redirect("/dashboard")
}

export async function updateNewsletter(id: number, formData: FormData) {
    const session = await auth()
    if (!session?.user?.email) redirect("/login")

    const title = (formData.get("title") as string)?.trim()
    const content = (formData.get("content") as string)?.trim()
    const image = (formData.get("image") as string)?.trim() || null
    const status = formData.get("status") as "Draft" | "Schedule" | "Sent"

    if (!title || !content) return

    // only update if this newsletter belongs to the logged-in user
    await prisma.newsletter.updateMany({
        where: { id, author: { email: session.user.email } },
        data: { title, content, image, status },
    })
}
