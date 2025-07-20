"use client";
import { AuthHeaderWrapper } from "@/components/shared/container/auth-header-wrapper";
import { Button } from "@/components/ui/buttons/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import arrowLeft from "@/assets/svgs/arrow-left-green.svg";
import { OTPInput } from "@/components/ui/inputs/otp-input";
import { getHashedEmail } from "@/utils/get-hashed-email";
import {
  localStorageGetter,
  localStorageSetter,
} from "@/utils/localstorage-setter";
import { useConfirmOtp } from "@/hooks/queries/useAuth";
import { toast } from "sonner";

const Otp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [hashedEmail, setHashedEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const confirmOtpMutate = useConfirmOtp((result) => {
    toast.success("Confirmed");
    localStorageSetter("reset-otp-token", result.data.data.token);
    router.replace("/create-new-password");
  });

  useEffect(() => {
    const result = localStorageGetter("otp-email");
    setEmail(result);
    setHashedEmail(getHashedEmail(result));
  }, []);

  const handleVerifyEmail = () => {
    if (otpValue && email) {
      // return;
      confirmOtpMutate.mutate({ otp: otpValue, email });
    }
  };

  return (
    <>
      <AuthHeaderWrapper
        jl
        text="Enter OTP"
        subText={`Enter the OTP sent to your email ${hashedEmail}. If you didn't receive it, request a new code.`}
      />
      <form className="my-4">
        <div className="mb-4">
          <OTPInput setOtpValue={setOtpValue} />
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
            // router.push("/create-new-password");
            handleVerifyEmail();
          }}
          loading={confirmOtpMutate.isPending}
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
