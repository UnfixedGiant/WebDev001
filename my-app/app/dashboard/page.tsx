import { auth } from "@/auth"
import { prisma } from "@/app/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function DashboardPage() {
    const session = await auth()
    if (!session?.user?.email) redirect("/login")

    const newsletters = await prisma.newsletter.findMany({
        where: { author: { email: session.user.email } },
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Newsletters</h1>
                <Link href="/newsletter" className="btn btn-primary btn-sm">
                    New Newsletter
                </Link>
            </div>

            {newsletters.length === 0 ? (
                <p className="mt-6">You haven&apos;t created any newsletters yet.</p>
            ) : (
                <div className="grid gap-4 mt-6">
                    {newsletters.map((n) => (
                        <div key={n.id} className="card bg-base-100 shadow">
                            {n.image && (
                                <figure>
                                    <img src={n.image} alt={n.title} />
                                </figure>
                            )}
                            <div className="card-body">
                                <h2 className="card-title">
                                    {n.title}
                                    <span className="badge badge-outline">{n.status}</span>
                                </h2>
                                <p>{n.content}</p>
                                <p className="text-sm opacity-60">
                                    {n.createdAt.toLocaleDateString()}
                                </p>
                                {n.status !== "Sent" && (
                                    <div className="card-actions justify-end">
                                        <Link href={`/newsletter/${n.id}/edit`} className="btn btn-outline btn-sm">
                                            Edit
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}