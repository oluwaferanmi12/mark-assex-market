"use client";
import { getAccessToken, getRefreshToken } from "@/utils/auth-helper";
import axios from "axios";
import { useEffect, useRef } from "react";

export const useTokenRefresher = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleRefreshToken = async () => {
      const oldToken = getAccessToken();
      const refreshToken = getRefreshToken();
      if (!oldToken) {
        return;
      }
      try {
        const result = await axios.post("/auth/refresh-token", {
          token: oldToken,
        });
      } catch (e) {}
    };
  }, []);
};
