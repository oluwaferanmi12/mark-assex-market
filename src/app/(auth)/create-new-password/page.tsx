"use client";

import { AuthHeaderWrapper } from "@/components/shared/container/auth-header-wrapper";
import { Button } from "@/components/ui/buttons/button";
import { GInput } from "@/components/ui/inputs/general-input";
import { PasswordValidateText } from "@/components/ui/text/password-validate-text";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import arrowLeft from "@/assets/svgs/arrow-left-green.svg"

const CreateNewPassword = () => {
  const [password, setPassword] = useState("");
  const router = useRouter()
  return (
    <>
      <AuthHeaderWrapper
        jl
        text="Create new password"
        subText="Please Fill in the fields below"
      />
      <form className="my-4">
        <GInput
          setInputValue={setPassword}
          type="password"
          inputValue={password}
          label="Password"
          placeholder="Enter new password"
        />
        <GInput
          setInputValue={setPassword}
          type="password"
          inputValue={password}
          label="Confirm Password"
          placeholder="Confirm Password"
        />
        <div className="mb-3">
          <PasswordValidateText validated text="At least 8 characters" />
          <PasswordValidateText
            validated
            text="At least one uppercase letter (A–Z)"
          />
          <PasswordValidateText
            validated={false}
            text="At least 8 characters"
          />
          <PasswordValidateText
            validated={false}
            text="At least one special character (e.g. !, @, #, $)"
          />
        </div>

        <Button
          variant="green-bg"
          fullWidth
          text="Reset Password"
          action={() => {}}
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

export default CreateNewPassword;
