import { createNewsletter } from "@/app/actions/NewsletterAction"

export default function CreateNewsletterPage() {
    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold">Create Newsletter</h1>

            <form action={createNewsletter} className="mt-4">
                <div className="form-control">
                    <label className="label"><span className="label-text">Title</span></label>
                    <input name="title" type="text" className="input input-bordered w-full" required />
                </div>

                <div className="form-control mt-4">
                    <label className="label"><span className="label-text">Content</span></label>
                    <textarea name="content" className="textarea textarea-bordered w-full h-40" required />
                </div>

                <div className="form-control mt-4">
                    <label className="label"><span className="label-text">Image URL (optional)</span></label>
                    <input name="image" type="text" className="input input-bordered w-full" />
                </div>

                <div className="form-control mt-4">
                    <label className="label"><span className="label-text">Status</span></label>
                    <select name="status" defaultValue="Draft" className="select select-bordered w-full">
                        <option value="Draft">Draft</option>
                        <option value="Schedule">Schedule</option>
                        <option value="Sent">Sent</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-full mt-6">
                    Create Newsletter
                </button>
            </form>
        </div>
    )
}