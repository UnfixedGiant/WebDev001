import { notFound } from "next/navigation"
import rawData from "../data.json"


interface PageProps {
    params: Promise<{ id: string }>
}



const NewsletterDetailPage = async ({ params }: PageProps) => {
    const { id } = await params
    const newsletter = rawData.find((n) => n.id === id)


    return (
        <>
            {newsletter ? (
                <>
                    {" "}

                    <h2 className="font-bold text-center tracking-tight mt-2 text-3xl">
                        Newsletter Detail Page
                    </h2>
                    <div>
                        <div className="p-4 max-w-md mx-auto flex flex-col gap-4 mt-4 card bg-lime-800 text-p">
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">
                                    {newsletter.title} {" "}
                                    <span className="text-xs text-amber-400 uppercase">
                                        {newsletter.status}
                                    </span>
                                </h2>
                                <h3>{newsletter.slug} </h3>

                                <p>
                                    {newsletter.subject_line}
                                    {newsletter.preview_text}
                                </p>

                                <div className="text-xs">
                                    <p className="mt-5">by {newsletter.author.name} </p>
                                    <div className="mt-5">
                                        Tags:
                                        <ul className="menu menu-horizontal gap-2 text-xs">
                                            {newsletter.tags.map((t) => {
                                                return <li key={t}>{t}</li>
                                            })}
                                        </ul>
                                        <p>Subscriber Count: {newsletter.subscriber_count} </p>
                                    </div>
                                </div>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                </>
            ) : (
                <div>{notFound()} </div>
            )}
        </>
    )

}


export default NewsletterDetailPage

