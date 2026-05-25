

import { useAppSelector } from "@/store/hooks"

export default function Home() {
    const {user , isAuthenticated}= useAppSelector((state) => state.auth);
    return (
        <>
            {isAuthenticated && <h1>hello {user.name}</h1>}
        </>
    )
}