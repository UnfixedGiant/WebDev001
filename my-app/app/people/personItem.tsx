"use client";

import type { Result } from "./person"



interface PersonItemProps extends Result {
    remove: (uuid: string) => void;
}





const PersonItem = ({ remove, ...result }: PersonItemProps) => {
    const { email, login, location, name, picture } = result;

    return (


        <div className="card bg-base-100 w-96 shadow-sm" key={login.uuid}>
            <figure className="px-10 pt-10">
                <img
                    src={picture.medium} alt={name.last}
                    className="rounded-xl"
                />
            </figure>
            <div className="card-body items-center text-center">
                <h2>
                    {name.first} {name.last}
                </h2>
                <h4>{email}</h4>
                <p>
                    {location.city}, {location.country}
                </p>
                <div className="card-actions">
                    <button className="btn btn-primary" onClick={() => remove(login.uuid)} > remove </button>
                </div>
            </div>
        </div>


    )
}

export default PersonItem;