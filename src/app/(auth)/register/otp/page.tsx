"use client";

import { AuthHeaderWrapper } from "@/components/shared/container/auth-header-wrapper";
import { Button } from "@/components/ui/buttons/button";
import { OTPInput } from "@/components/ui/inputs/otp-input";
import { useRouter } from "next/navigation";
import {
  localStorageSetter,
  removeLocalStorageValue,
} from "@/utils/localstorage-setter";
import { useEffect, useState } from "react";
import { useVerifyOTP } from "@/hooks/queries/useAuth";
import { toast } from "sonner";
import { getHashedEmail } from "@/utils/get-hashed-email";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { setAuthenticateUser } from "@/store/slices/authSlice";

const RegisterOtp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const dispatch = useAppDispatch();
  const [otpVal, setOtpVal] = useState("");
  const { mutate, isPending } = useVerifyOTP((data) => {
    removeLocalStorageValue("otp-email");
    toast.success("Otp verified");
    Cookies.set("user", JSON.stringify(data.data));
    dispatch(setAuthenticateUser());
    localStorageSetter("user", JSON.stringify(data.data));
    router.replace("/select-account-type");
  });
  // const email = localStorageGetter("otp-email");
  useEffect(() => {
    const emailLocalStorage = localStorage.getItem("otp-email")!;
    setEmail(emailLocalStorage);
    const hashedEmail = getHashedEmail(emailLocalStorage);
    setMaskedEmail(hashedEmail);
    return () => {
      // localStorage.removeItem("otp-email");
    };
  }, []);

  const handleVerifyEmail = () => {
    mutate({ email, otp: otpVal });
  };
  return (
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
  );
};

export default RegisterOtp;
