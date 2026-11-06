import { JSX } from "react"
import { getUsers, addUser, editUser, removeUser } from "../actions/UserAction"

export default async function UsersPage(): Promise<JSX.Element> {
    const users = await getUsers()
    return (

        <>
            <form
                action={async (FormData) => {
                    "use server"
                    const name = FormData.get("name") as string
                    const email = FormData.get("email") as string
                    const pass = FormData.get("pass") as string

                    if (name && email && pass) {
                        await addUser({ name, email, pass })
                    }
                }}


                className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end mt-2"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input input-bordered input-sm w-full"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered input-sm w-full"
                    required
                />

                <input
                    type="password"
                    name="pass"
                    placeholder="Password"
                    className="input input-bordered input-sm w-full"
                    required
                />
                <button type="submit" className="btn btn-primary btn-sm">
                    Add User
                </button>
            </form>

            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="font-mono">{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td className="font-mono text-xs opacity-60">
                                {user.password}
                            </td>
                            <td className="text-right flex justify-end gap-2">
                                <form
                                    action={async () => {
                                        "use server"
                                        await editUser(user.id, {
                                            name: `${user.name} (Edited)`,
                                        })
                                    }}
                                >
                                    <button type="submit" className="btn btn-xs btn-outline btn-warning">
                                        Edit
                                    </button>
                                </form>

                                <form
                                    action={async () => {
                                        "use server"
                                        await removeUser(user.id)
                                    }}
                                >
                                    <button type="submit" className="btn btn-xs btn-outline btn-error">
                                        Remove
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}

                    {users.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center py-4 text-base-content/60"> No users found in database </td>
                        </tr>
                    )}
                </tbody>
            </table >


        </>
    )

}


