"use client";
import { AuthHeaderWrapper } from "@/components/shared/container/auth-header-wrapper";
import { Button } from "@/components/ui/buttons/button";
import { useRouter } from "next/navigation";
import React from "react";
import arrowLeft from "@/assets/svgs/arrow-left-green.svg";
import { OTPInput } from "@/components/ui/inputs/otp-input";

const Otp = () => {
  const router = useRouter();
  return (
    <>
      <AuthHeaderWrapper
        jl
        text="Enter OTP"
        subText="Enter the OTP sent to your email Sam****@gmail.com. If you didn't receive it, request a new code."
      />
      <form className="my-4">
        <div className="mb-4">
          <OTPInput />
        </div>
        <div className="my-4 flex items-center font-work-sans-light">
          <p className="text-xs">
            Didn't receive any code?{" "}
            <span className="text-[#004DEF] cursor-pointer">Resend code</span>
          </p>
        </div>
        <Button
          variant="green-bg"
          fullWidth
          text="Continue"
          action={() => {
            router.push("/create-new-password")
          }}
          loading={false}
        />

        <div className="mt-3">
          <Button
            variant="plain"
            fullWidth
            text="Back to login"
            action={() => {
              router.push("/login");
            }}
            loading={false}
            icon={arrowLeft}
          />
        </div>
      </form>
    </>
  );
};

export default Otp;
