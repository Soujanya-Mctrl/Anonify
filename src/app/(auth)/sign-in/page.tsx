'use client';

import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button className="bg-orange-500 px-3 py-2 text-white rounded-md hover:bg-orange-600 transition-colors duration-200"
                onClick={() => signIn()}>Sign in
            </button>
        </>
    )
}