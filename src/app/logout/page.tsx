"use client";
import { useLogout } from "@/hooks/queries/useAuth";
import { removeUser } from "@/utils/auth-helper";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Logout() {
  const router = useRouter();
  const logoutMutate = useLogout(() => {
    removeUser();
    window.location.href = "/login";
  });
  useEffect(() => {
    logoutMutate.mutate();
  }, []);
  return <div></div>;
}

export default Logout;
