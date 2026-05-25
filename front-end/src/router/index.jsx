// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Register from "../pages/Register";
import GuestLayout from "../layouts/GuestLayout";


const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthenticatedLayout />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Home /> }
        ]
    },
    {
        path : "/",
        element : <GuestLayout/>,
        children : [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
        ]
        
    }
]);

export default router;