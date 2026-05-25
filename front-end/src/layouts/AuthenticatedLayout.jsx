import { Outlet, NavLink, Navigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks"
import Loading from "../components/loading";

export default function AuthenticatedLayout() {
    const { status, isAuthenticated } = useAppSelector((state) => state.auth);

    const loading = status === "loading";
    if (loading) { return <Loading /> }

    if (!isAuthenticated) { return <Navigate to="/login" replace/> }


    return (
        <>
            {/* header */}
            <nav>
                <NavLink to="/">Home</NavLink>
            </nav>
            <main>
                <Outlet />  {/* Child routes render here */}
            </main>
        </>
    )
}