export interface LoginInterface {
  accessToken: string;
  refreshToken: string;
  user: LoginUserInterface;
  twoFaEnabled: boolean;
}

export type ProfileStatus = "UNVERIFIED" | "ACTIVE" | "LOCK" | "SUSPENDED";

export interface LoginUserInterface {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  country: string;
  profileStatus: ProfileStatus;
  walletBalance: number;
  picture: null | string;
}

export interface RegisterUserInterface {
  email: string;
  country: string;
  password: string;
  confirmPassword: string;
  promoCode?: string;
  partnerCode?: string;
}

export interface VerifyOtpInterface {
  email: string;
  otp: string;
}

export interface CreateLoginInterface {
  email: string;
  password: string;
}

export interface CreateNewPasswordInterface {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}

export interface RefreshTokenInterface {
  token: string;
}

export interface Login2fa {
  email: string;
  password: string;
  otp: string;
}

export interface GoogleLogin {
  code: string;
  redirectUrl: string;
}
