"use server"

import { stringify } from "node:querystring"
import { prisma } from "../lib/prisma"
import { revalidatePath } from "next/cache"


export async function addUser(data: {
    name: string;
    email: string;
    pass: string;
}) {
    try {
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.pass,
            },
        })

        return { success: true, user: newUser }
    } catch (error) {
        console.error("Failed to add user:", error)
        return {
            success: false,
            error: "Failed to create user. Email may already exist. "
        }
    }
}

export async function editUser(
    id: number,
    data: { name?: string; email?: string; pass?: string },
) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.email && { email: data.email }),
                ...(data.pass && { pass: data.pass }),
            },
        })

        return { success: true, user: updatedUser }
    } catch (error) {
        console.error("Failed to update user:", error)
        return { success: false, error: "Failed to update user. " }
    }
}



export async function removeUser(id: number) {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id },
        })

        return { success: true, user: deletedUser }
    } catch (error) {
        console.error("Failed to remove user:", error)
        return { success: false, error: "Failed to remove user." }
    }
}


export async function getUsers() {
    return await prisma.user.findMany({
        orderBy: { id: "desc" },
    })
}