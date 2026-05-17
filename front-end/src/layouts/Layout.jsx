import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
    return (
        <>
            {/* header */}
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/login">login</NavLink> |
                <NavLink to="/register">register</NavLink>
            </nav>
            <main>
                <Outlet />  {/* Child routes render here */}
            </main>
        </>
    )
}