// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Layout from "../layouts/layout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Register from "../pages/Register";
// import RootLayout from "../layouts/RootLayout";
// import Home from "../pages/Home";
// import About from "../pages/About";
// import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
        ],
    }
]);

export default router;