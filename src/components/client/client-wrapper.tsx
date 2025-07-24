"use client";

import { useTokenRefresher } from "@/hooks/custom/token-refresher";
import React, { ReactNode } from "react";

export const ClientWrapper = ({ children }: { children: ReactNode }) => {
  useTokenRefresher();
  return <div>{children}</div>;
};
