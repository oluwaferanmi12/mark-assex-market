"use client";

import { AuthHeaderWrapper } from "@/components/shared/container/auth-header-wrapper";
import { Button } from "@/components/ui/buttons/button";
import { GInput } from "@/components/ui/inputs/general-input";
import { PasswordValidateText } from "@/components/ui/text/password-validate-text";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import arrowLeft from "@/assets/svgs/arrow-left-green.svg";
import { localStorageGetter } from "@/utils/localstorage-setter";
import { useCreateNewPassword } from "@/hooks/queries/useAuth";
import { toast } from "sonner";

const CreateNewPassword = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [token, setToken] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cPasswordError, setCPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const createPasswordMutate = useCreateNewPassword((result) => {
    toast.success("Password updated");
    router.replace("/login");
  });
  const handleCreateNewPassword = () => {
    let validated = true;
    if (!password) {
      setPasswordError("Password is required");
      validated = false;
    } else if (
      !(password.length >= 8) ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      setPasswordError("Criteria for password does not match");
      validated = false;
    } else if (password !== confirmPassword) {
      setPassword("Mismatch between password");
      setCPasswordError("Mismatch between password");
      validated = false;
    }
    if (!validated) {
      return;
    }

    createPasswordMutate.mutate({ password, confirmPassword, email, token });
  };

  useEffect(() => {
    const token = localStorageGetter("reset-otp-token");
    setToken(token);
    const otpEmail = localStorageGetter("otp-email");
    setEmail(otpEmail);
  }, []);
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
          errorState={passwordError}
          placeholder="Enter new password"
        />
        <GInput
          setInputValue={setConfirmPassword}
          type="password"
          errorState={cPasswordError}
          inputValue={confirmPassword}
          label="Confirm Password"
          placeholder="Confirm Password"
        />
        {!!password.length && (
          <div className="mb-3">
            <PasswordValidateText
              validated={password.length >= 8}
              text="At least 8 characters"
            />
            <PasswordValidateText
              validated={/[A-Z]/.test(password)}
              text="At least one uppercase letter (A–Z)"
            />
            <PasswordValidateText
              validated={/[0-9]/.test(password)}
              text="At least one number (0–9)"
            />
            <PasswordValidateText
              validated={/[^A-Za-z0-9]/.test(password)}
              text="At least one special character (e.g. !, @, #, $)"
            />
          </div>
        )}

        <Button
          variant="green-bg"
          fullWidth
          text="Reset Password"
          action={() => {
            handleCreateNewPassword();
          }}
          loading={createPasswordMutate.isPending}
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
