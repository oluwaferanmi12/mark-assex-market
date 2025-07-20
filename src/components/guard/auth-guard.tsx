"use client";

import { getAccessToken } from "@/utils/auth-helper";
import { GetCookieVal } from "@/utils/cookie-util";
import { redirect, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.push("/login");
    } else {
      // check if the endpoint token has not expired
      const decoded = jwtDecode(token);

      const isExpired = Date.now() >= (decoded.exp ?? 0) * 1000;
      if (isExpired) {
        router.push("/login");
      }
    }
  }, [router]);
  return <>{children}</>;
};
