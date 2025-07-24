"use client";
import {
  getAccessToken,
  getRefreshToken,
  removeUser,
  saveLocalUser,
} from "@/utils/auth-helper";
import axios from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../redux/useAppSelector";
import { useRouter } from "next/navigation";

export const useTokenRefresher = () => {
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const handleRefreshToken = async () => {
    const oldToken = getAccessToken();
    const refreshToken = getRefreshToken();
    if (!oldToken) {
      return;
    }
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
        {
          token: refreshToken,
        },
        { headers: { Authorization: `Bearer ${oldToken}` } }
      );
      saveLocalUser(result.data.data);
      startTimer();
    } catch (e) {
      removeUser();
      router.push("/login");
    }
  };

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    intervalRef.current = setInterval(() => {
      handleRefreshToken();
    }, 14 * 60 * 1000);
  }, []);
  useEffect(() => {
    if (intervalRef.current) {
      stopTimer();
    }
    if (isLoggedIn) {
      startTimer();
    } else if (getAccessToken()) {
      handleRefreshToken();
    } else {
      stopTimer();
    }
    return () => {
      stopTimer();
    };
  }, [isLoggedIn]);

  useEffect(() => {
    // fire immediately on mount

    const onFocus = () => {
      // what i should do here is to refire and start the timer
      handleRefreshToken();
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") handleRefreshToken();
    };
    // handles bfcache restores

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
};
