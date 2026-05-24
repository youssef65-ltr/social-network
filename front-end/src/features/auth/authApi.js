import { axiosClient } from "../../../api/axios"

const getCsrfCookie = () => axiosClient.get("/sanctum/csrf-cookie")

export const currentUserRequest = async () => {
    const response = await axiosClient.get("/api/user")
    return response.data
}

export const loginRequest = async (credentials) => {
    await getCsrfCookie()

    await axiosClient.post("/login", credentials)
    return currentUserRequest()
}

export const registerRequest = async (data) => {
    await getCsrfCookie()

    const formData = new FormData()
    formData.append("username", data.username)
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("age", data.age)
    formData.append("password", data.password)
    formData.append("password_confirmation", data.password_confirmation)
    if (data.bio) formData.append("bio", data.bio)
    if (data.profile_img) formData.append("profile_img", data.profile_img)

    await axiosClient.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })

    return currentUserRequest()
}

export const logoutRequest = async () => {
    await axiosClient.post("/logout")
}
