import { auth } from "@/auth"
import { prisma } from "@/app/lib/prisma"
import { updateNewsletter } from "@/app/actions/NewsletterAction"
import { redirect, notFound } from "next/navigation"

export default async function EditNewsletterPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const session = await auth()
    if (!session?.user?.email) redirect("/login")

    const { id } = await params
    const newsletterId = Number(id)
    if (Number.isNaN(newsletterId)) notFound()

    const newsletter = await prisma.newsletter.findFirst({
        where: { id: newsletterId, author: { email: session.user.email } },
    })
    if (!newsletter) notFound()

    const updateWithId = updateNewsletter.bind(null, newsletter.id)

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold">Edit Newsletter</h1>

            <form action={updateWithId} className="mt-4">
                <div className="form-control">
                    <label className="label"><span className="label-text">Title</span></label>
                    <input
                        name="title"
                        type="text"
                        defaultValue={newsletter.title}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="form-control mt-4">
                    <label className="label"><span className="label-text">Content</span></label>
                    <textarea
                        name="content"
                        defaultValue={newsletter.content}
                        className="textarea textarea-bordered w-full h-40"
                        required
                    />
                </div>

                <div className="form-control mt-4">
                    <label className="label"><span className="label-text">Image URL (optional)</span></label>
                    <input
                        name="image"
                        type="text"
                        defaultValue={newsletter.image ?? ""}
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="form-control mt-4">
                    <label className="label"><span className="label-text">Status</span></label>
                    <select
                        name="status"
                        defaultValue={newsletter.status}
                        className="select select-bordered w-full"
                    >
                        <option value="Draft">Draft</option>
                        <option value="Schedule">Schedule</option>
                        <option value="Sent">Sent</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-full mt-6">
                    Save Changes
                </button>
            </form>
        </div>
    )
}