"use client";

import { AuthHeaderWrapper } from "@/components/shared/container/auth-header-wrapper";
import { Button } from "@/components/ui/buttons/button";
import { OTPInput } from "@/components/ui/inputs/otp-input";
import { useRouter } from "next/navigation";
import arrowLeft from "@/assets/svgs/arrow-left-green.svg";
import {
  localStorageGetter,
  removeLocalStorageValue,
} from "@/utils/localstorage-setter";
import { useEffect, useState } from "react";
import { useVerifyOTP } from "@/hooks/queries/useAuth";
import { toast } from "sonner";

const RegisterOtp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [otpVal, setOtpVal] = useState("");

  const { mutate, isPending, } = useVerifyOTP(() => {
    router.replace("/select-account-type");
    toast.success("Otp verified");
  });
  // const email = localStorageGetter("otp-email");
  useEffect(() => {
    const emailLocalStorage = localStorage.getItem("otp-email")!;
    setEmail(emailLocalStorage);
    const splittedEmail = emailLocalStorage?.split("@");
    setMaskedEmail(`${splittedEmail[0][0]}***@${splittedEmail[1]}`);
    return () => {
      // localStorage.removeItem("otp-email");
    };
  }, []);

  const handleVerifyEmail = () => {
    mutate({ email, otp: otpVal });
  };
  return (
    <>
      <>
        <AuthHeaderWrapper
          jl
          text="Enter OTP"
          subText={`Enter the OTP sent to your email ${maskedEmail} . If you didn't receive it, request a new code.`}
        />
        <form className="my-4">
          <div className="mb-4">
            <OTPInput setOtpValue={setOtpVal} />
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
              handleVerifyEmail();
              // router.push("/select-account-type");
            }}
            loading={isPending}
          />
        </form>
      </>
    </>
  );
};

export default RegisterOtp;
