import Link from "next/link"

export default function NotFound() {
    return (
        <div className="max-w-md mx-auto p-4 my-4 text-center">
            <h1>404 - Page Not Found </h1>
            <Link className="btn btn-outline mt-4" href="/">
                Home
            </Link>
        </div>
    )
}