"use client"
import PersonItem from "./personItem"
import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hooks';

import { useEffect, useState } from "react";
import type { Result } from "./person"
import { fetchRandomUsers, clearList, removeUser } from '@/lib/features/people/personSlice';


const url = "https://randomuser.me/api/?results=12"



const PeoplePage = () => {
    const { results, isLoading } = useAppSelector((store) => store.people)

    const dispatch = useAppDispatch()

    const handleClearList = () => {
        dispatch(clearList())
    }

    const handleReset = () => {
        dispatch(fetchRandomUsers())
    }

    const remove = (id: any) => {
        dispatch(removeUser(id))
    }

    useEffect(() => {
        dispatch(fetchRandomUsers())
    }, [])


    if (isLoading) {
        return (
            <div className="p-6 max-w-md mx-auto my-4">
                {" "}
                <span className="loading loading-spinner loading-sm "></span>
            </div>
        )
    }

    return (
        <section>

            <h2 className="font-bold text-center text-amber-900 tracking-tight mt-2 text-3xl">
                People Page
            </h2>

            <div className="flex justify-center items-center ">
                {results.length === 0 ? (
                    <button className="btn btn-ghost" onClick={() => handleReset()}>Reset</button>
                ) : (
                    <button className="btn btn-ghost" onClick={() => handleClearList()}>Clear All</button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center ">
                {results?.map((p: Result) => {
                    return <PersonItem {...p} key={p.login.uuid} remove={remove} />
                })}
            </div>

        </section>
    )
}


export default PeoplePage