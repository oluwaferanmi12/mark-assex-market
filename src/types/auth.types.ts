export interface LoginInterface {
    accessToken: string,
    refreshToken: string,
    user: LoginUserInterface
}

export interface LoginUserInterface {
    id: string,
    email: string,
    firstName: string | null,
    lastName: string | null,
    country: string,
    profileStatus: "UNVERIFIED" | "ACTIVE" | "LOCK" | "SUSPENDED",
    walletBalance: number,
    picture: null | string
}