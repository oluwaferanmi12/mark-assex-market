"use client";

import { AuthHeaderWrapper } from "@/components/shared/container/auth-header-wrapper";
import { AuthToggle } from "@/components/shared/container/auth-toggle";
import { Button } from "@/components/ui/buttons/button";
import { GInput } from "@/components/ui/inputs/general-input";
import React, { useState } from "react";
import googleIcon from "@/assets/svgs/google-icon.svg";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/queries/useAuth";
import { isValidEmail } from "@/utils/email-validate";
import { toast } from "sonner";
import { localStorageSetter } from "@/utils/localstorage-setter";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { setAuthenticateUser } from "@/store/slices/authSlice";

const Login = () => {
  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useAppDispatch();
  const loginMutate = useLogin((data) => {
    toast.success("Authenticated Successfully");
    Cookies.set("user", JSON.stringify(data.data));
    dispatch(setAuthenticateUser());
    router.push("/account");
    // localStorageSetter("user", JSON.stringify(data.data));
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
  return (
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

        <div className="mt-4">
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
  );
};

export default Login;
