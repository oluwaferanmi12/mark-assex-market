"use client";
import { useTokenRefresher } from "@/hooks/custom/token-refresher";
import { store } from "@/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export const ReduxWrapper = ({ children }: { children: ReactNode }) => {
  
  return <Provider store={store}>{children}</Provider>;
};
