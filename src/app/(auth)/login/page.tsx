"use client";

import { AuthHeaderWrapper } from "@/components/shared/container/auth-header-wrapper";
import { AuthToggle } from "@/components/shared/container/auth-toggle";
import { Button } from "@/components/ui/buttons/button";
import { GInput } from "@/components/ui/inputs/general-input";
import React, { useState } from "react";
import googleIcon from "@/assets/svgs/google-icon.svg";

const Login = () => {
  const [email, setEmailAddress] = useState("");
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
          setInputValue={setEmailAddress}
          label="Password"
          inputValue={email}
          placeholder="Enter password"
          type="password"
          showForgotPassword
        />
        <div className="mt-4">
          <Button
            text="Sign in"
            variant="green-bg"
            action={() => {}}
            loading={false}
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
