"use client";
import { useImpersonate } from "@/hooks/queries/useAuth";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { setAuthenticateUser } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { localStorageSetter } from "@/utils/localstorage-setter";

function Impersonate() {
  const dispatch = useDispatch();
  const router = useRouter();
  const mutateLogin = useImpersonate((data) => {
    toast.success("Authenticated Successfully");
    Cookies.set("user", JSON.stringify(data.data));
    dispatch(setAuthenticateUser());
    router.push("/account");
    localStorageSetter("user", JSON.stringify(data.data));
  });

  useEffect(() => {
    // Now try to get the token from the url
    const urlToken = new URLSearchParams(window.location.search);
    const tokenVal = urlToken.get("token");
    if (!tokenVal) {
      window.location.href = "/login";
    } else {
      // call the mutate to log the user in
      mutateLogin.mutate(tokenVal);
    }
  }, []);
  return <div></div>;
}

export default Impersonate;
