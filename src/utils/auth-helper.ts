import { LoginInterface, LoginUserInterface } from "@/types"
const userPure = localStorage.getItem("user");
const userParsed: LoginInterface = JSON.parse(userPure ?? "")
export const getAccessToken = () => {
    return userParsed.accessToken ?? null
}

export const getStoredUser = () => {
    return userParsed ?? null
}

export const saveLocalUser = (payload: LoginInterface) => {
    localStorage.setItem("user", JSON.stringify(payload))
}

export const getRefreshToken = () => {
    return userParsed.refreshToken ?? null
}

export const removeUser = () => {
    return localStorage.removeItem('user')
}