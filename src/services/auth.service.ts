import { axiosInstance } from "@/api/axios"


export const login = async (payload: { email: string; password: string }) => {
    const result = await axiosInstance.post("/auth/login", payload)
    return result.data
}

export const register = async (payload: {
    email: string,
    country: string,
    password: string,
    confirmPassword: string
}) => {
    const result = await axiosInstance.post("/auth/register", payload);
    return result.data
}

export const verify = async (payload: { otp: string; email: string }) => {
    const result = await axiosInstance.post("/auth/verify", payload)
    return result.data
}