import Cookies from "js-cookie";

export const SetCookieVal = (name: string, value: string) => {
  Cookies.set(name, value);
};

export const GetCookieVal = (name: string) => {
  const cookieVal = Cookies.get(name);
  try {
    return JSON.parse(cookieVal ?? "");
  } catch (e) {
    return cookieVal;
  }
};

export const RemoveCookieVal = (name: string) => {
  Cookies.remove(name);
};
