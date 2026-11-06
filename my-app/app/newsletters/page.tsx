import rawData from "./data.json"

import Link from "next/link"

import { Author, Stats, Newsletter } from "./dataType"
import { RiNewsLine } from "react-icons/ri"


const NewslettersPage = () => {
    const data = rawData as Newsletter[];

    return (

        <div>

            <div className="text-center font-bold mb-5">
                Articles Page
            </div>

            <ul className="list bg-base-100 rounded-box shadow-md w-116 mx-auto">
                {data.map((n) => (

                    <li key={n.id} className="list-row">
                        <RiNewsLine className="size-10 rounded-box" />

                        <div className="list-col-grow">
                            <div> {n.title} </div>
                            <div className="text-xs opacity-60" > {n.preview_text}</div>
                        </div>


                        <Link key={n.id} href={`/newsletters/${n.id}`}>
                            <button className="btn btn-square btn-ghost">
                                <svg aria-label="Play" className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default NewslettersPage