"use client"

import { Links } from "./navbarData"
import Link from "next/link"



import { usePathname } from "next/navigation";
import { useAuth } from "../hooks/useAuth"
import { useSession, signOut } from "next-auth/react"


const Navbar = () => {
    const pathname = usePathname()
    // const { user, isAuthenticated, isLoading, logout } = useAuth()
    const { data: session } = useSession()

    return (


        <nav className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />{" "}
                        </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {Links.map((l) => {
                            const { id, url, text } = l;
                            return (
                                <li
                                    className={`${pathname === url ? "menu-active" : ""} `}
                                    key={id}
                                >
                                    <Link href={url}> {text} </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {Links.map((l) => {
                            const { id, url, text } = l;
                            return (
                                <li
                                    className={`${pathname === url ? "menu-active" : ""} `}
                                    key={id}
                                >
                                    <Link href={url}> {text} </Link>
                                </li>
                            );
                        })}

                    </ul>
                </div>
            </div>
            <div className="navbar-end">
                {session?.user ? (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar placeholder"
                        >
                            <div className="bg-primary text-primary-content w-10 rounded-full flex items-center justify-center">
                                <span className="text-lg">
                                    {session?.user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <button onClick={() => signOut({ redirectTo: "/login" })}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link href="/login" className="btn btn-ghost btn-sm">
                            Login
                        </Link>
                        <Link href="/register" className="btn btn-primary btn-sm">
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </nav >

    )
}

export default Navbar