import { Outlet, NavLink , Navigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks"
import Loading from "../components/loading";

export default function GuestLayout() {
    const {status , isAuthenticated}= useAppSelector((state) => state.auth);

    const loading = status === "loading";
    if (loading) {return <Loading/>}

    if (isAuthenticated) { return <Navigate to="/" replace/> }
    
    return (
        <>
            {/* header */}
            <nav>
                <NavLink to="/login"> login </NavLink> | 
                <NavLink to="/register"> register </NavLink>
            </nav>
            <main>
                <Outlet />  {/* Child routes render here */}
            </main>
        </>
    )
}