import { LoginInterface, LoginUserInterface } from "@/types";

export const getAccessToken = () => {
  const userPure = localStorage.getItem("user");
  const userParsed: LoginInterface = JSON.parse(userPure ?? "");
  return userParsed.accessToken ?? null;
};

export const getStoredUser = () => {
  const userPure = localStorage.getItem("user");
  const userParsed: LoginInterface = JSON.parse(userPure ?? "");
  return userParsed ?? null;
};

export const saveLocalUser = (payload: LoginInterface) => {
  localStorage.setItem("user", JSON.stringify(payload));
};

export const getRefreshToken = () => {
  const userPure = localStorage.getItem("user");
  const userParsed: LoginInterface = JSON.parse(userPure ?? "");
  return userParsed.refreshToken ?? null;
};

export const removeUser = () => {
  return localStorage.removeItem("user");
};
