"use client";

import {
  getAccessToken,
  getRefreshToken,
  saveLocalUser,
} from "@/utils/auth-helper";
import { GetCookieVal } from "@/utils/cookie-util";
import { redirect, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRefreshToken } from "@/hooks/queries/useAuth";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const refreshMutate = useRefreshToken(
    (result) => {
      saveLocalUser(result.data.data);
    },
    (error) => {
      router.push("/login");
    }
  );

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.push("/login");
    } else {
      // check if the endpoint token has not expired
      const decoded = jwtDecode(token);

      const isExpired = Date.now() >= (decoded.exp ?? 0) * 1000;
      if (isExpired) {
        // Now, what i should do here is to first get the refresh token
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          router.push("/login");
          return;
        }
        refreshMutate.mutate({ token: refreshToken });
      }
    }
  }, [router]);
  return <>{children}</>;
};
