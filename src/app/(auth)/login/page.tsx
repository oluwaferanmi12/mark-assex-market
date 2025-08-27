"use client";

import { AuthHeaderWrapper } from "@/components/shared/container/auth-header-wrapper";
import { AuthToggle } from "@/components/shared/container/auth-toggle";
import { Button } from "@/components/ui/buttons/button";
import { GInput } from "@/components/ui/inputs/general-input";
import React, { useEffect, useRef, useState } from "react";
import googleIcon from "@/assets/svgs/google-icon.svg";
import { useRouter } from "next/navigation";
import {
  useGoogleLogin,
  useLogin,
  useLogin2fa,
  useVerifyOTP,
} from "@/hooks/queries/useAuth";
import { isValidEmail } from "@/utils/email-validate";
import { toast } from "sonner";
import { localStorageSetter } from "@/utils/localstorage-setter";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { setAuthenticateUser } from "@/store/slices/authSlice";
import { OTPInput } from "@/components/ui/inputs/otp-input";
import GoogleAuthButton from "@/components/ui/buttons/google-auth-button";

declare global {
  interface Window {
    google?: any;
  }
}

const Login = () => {
  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showOtpFlow, setShowOtpFlow] = useState(false);
  const [verifyAccountType, setAccountVerifyType] = useState(false);
  const verifyOtp = useVerifyOTP(() => {
    loginMutate.mutate({ email, password });
  });
  const googleLogin = useGoogleLogin((data) => {
    toast.success("Authenticated Successfully");

    Cookies.set("user", JSON.stringify(data.data));
    dispatch(setAuthenticateUser());
    router.push("/account");
    localStorageSetter("user", JSON.stringify(data.data));
  });
  const login2fa = useLogin2fa((data) => {
    toast.success("Authenticated Successfully");
    Cookies.set("user", JSON.stringify(data.data));
    dispatch(setAuthenticateUser());
    router.push("/account");
    localStorageSetter("user", JSON.stringify(data.data));
  });
  const [otpVal, setOtpVal] = useState("");
  const dispatch = useAppDispatch();

  const loginMutate = useLogin((data) => {
    if (data.data.twoFaEnabled) {
      setShowOtpFlow(true);
    } else if (data.data.unverifiedAccount) {
      setAccountVerifyType(true);
      setShowOtpFlow(true);
    } else {
      toast.success("Authenticated Successfully");
      Cookies.set("user", JSON.stringify(data.data));
      dispatch(setAuthenticateUser());
      router.push("/account");
      localStorageSetter("user", JSON.stringify(data.data));
    }
  });
  const router = useRouter();

  const validate = () => {
    let validated = true;
    if (!password) {
      validated = false;
      setPasswordError("Password is required");
    }
    if (!email) {
      setEmailError("Email is required");
      validated = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Email format is invalid");
      validated = false;
    }
    return validated;
  };

  const handleLogin = () => {
    if (!validate()) {
      return;
    }
    loginMutate.mutate({ password, email });
  };

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    const urlCode = urlParam.get("code");
    if (urlCode) {
      googleLogin.mutate({
        code: urlCode,
        redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      });
    }
  }, []);

  return (
    <>
      {showOtpFlow ? (
        <>
          <AuthHeaderWrapper
            jl
            text="Enter OTP sent to your mail"
            subText={`Go to your email address and enter the 6 digit code`}
          />
          <form className="my-4">
            <div className="mb-4">
              <OTPInput setOtpValue={setOtpVal} />
            </div>

            <Button
              variant="green-bg"
              fullWidth
              text="Continue"
              action={() => {
                if (verifyAccountType) {
                  verifyOtp.mutate({ email, otp: otpVal });
                } else {
                  login2fa.mutate({ email, password, otp: otpVal });
                }
              }}
              loading={login2fa.isPending}
            />
          </form>
        </>
      ) : (
        <div>
          <AuthHeaderWrapper text="Login to your account" />
          <AuthToggle active="login" />
          <form>
            <GInput
              setInputValue={setEmailAddress}
              label="Email Address"
              inputValue={email}
              placeholder="Enter email address"
            />
            <GInput
              setInputValue={setPassword}
              label="Password"
              inputValue={password}
              placeholder="Enter password"
              type="password"
              showForgotPassword
            />
            <div className="mt-4">
              <Button
                text="Sign in"
                variant="green-bg"
                action={() => {
                  // router.push("/account");

                  handleLogin();
                }}
                loading={loginMutate.isPending}
                fullWidth
              />
            </div>
            <div className="flex my-4 justify-center items-center">
              <div
                style={{ border: "0.5px solid #BEBEBE " }}
                className=" w-full "
              ></div>
              <p className="text-xs font-work-sans-light min-w-[100px] text-center">
                or Sign with
              </p>
              <div
                style={{ border: "0.5px solid #BEBEBE " }}
                className=" w-full "
              ></div>
            </div>

            <div className="mt-4 relative">
              <GoogleAuthButton />
              <Button
                text="Google"
                fullWidth
                action={() => {}}
                loading={false}
                icon={googleIcon}
                variant="grey-bg"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
