import { LoginInterface, LoginUserInterface } from "@/types";
import { GetCookieVal, RemoveCookieVal, SetCookieVal } from "./cookie-util";

export const getAccessToken = () => {
  const userPure: LoginInterface = GetCookieVal("user");
  return userPure?.accessToken ?? null;
};

export const getStoredUser = () => {
  const userParsed: LoginInterface = GetCookieVal("user");
  return userParsed ?? null;
};

export const saveLocalUser = (payload: LoginInterface) => {
  SetCookieVal("user", JSON.stringify(payload));
};

export const getRefreshToken = () => {
  const userParsed: LoginInterface = GetCookieVal("user");
  return userParsed?.refreshToken ?? null;
};

export const removeUser = () => {
  RemoveCookieVal("user");
};
