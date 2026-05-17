import axios from "axios";

export const axiosClient = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL ,
    withCredentials : true ,
    withXSRFToken: true,        // ← REQUIRED in axios 1.x — reads XSRF-TOKEN cookie and injects it as X-XSRF-TOKEN header automatically
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",   // ← tells Laravel to return JSON errors, not HTML
    },
})