"use client";
import { AuthHeaderWrapper } from "@/components/shared/container/auth-header-wrapper";
import { Button } from "@/components/ui/buttons/button";
import { GInput } from "@/components/ui/inputs/general-input";
import React, { useState } from "react";
import arrowLeft from "@/assets/svgs/arrow-left-green.svg"
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter()
  return (
    <>
      <AuthHeaderWrapper
        jl
        text="Forgot Password?"
        subText="No worries! Enter your email address below, and we’ll send you a link to reset your password."
      />
      <form className="my-4">
        <GInput
          label="Email address"
          placeholder="Enter email address"
          inputValue={email}
          setInputValue={setEmail}
        />
        <Button
          variant="green-bg"
          fullWidth
          text="Reset Password"
          action={() => {
            router.push("/otp")
          }}
          loading={false}
        />
        <div className="mt-3">
          <Button
            variant="plain"
            fullWidth
            text="Back to login"
            action={() => {
                router.push("/login")
            }}
            loading={false}
            icon={arrowLeft}
          />
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
