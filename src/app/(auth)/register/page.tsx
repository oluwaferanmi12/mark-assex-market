"use client";

import { AuthHeaderWrapper } from "@/components/shared/container/auth-header-wrapper";
import { AuthToggle } from "@/components/shared/container/auth-toggle";
import { GInput } from "@/components/ui/inputs/general-input";
import { CitizenConfirmation } from "@/components/ui/text/citizen-confirmation-text";
import { PasswordValidateText } from "@/components/ui/text/password-validate-text";
import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [citizenChecked, setCitizenChecked] = useState(true);
  return (
    <div>
      <AuthHeaderWrapper text="Create your account" />
      <AuthToggle active="register" />
      <form>
        <GInput
          inputValue={email}
          setInputValue={setEmail}
          label="Email Address"
          placeholder="Enter email address"
        />
        <GInput
          inputValue={email}
          setInputValue={setEmail}
          placeholder="Select country"
          label="Country / Region Of Residence"
        />
        <GInput
          inputValue={email}
          setInputValue={setEmail}
          label="Password"
          placeholder="Enter email address"
          type="password"
        />
        <GInput
          inputValue={email}
          setInputValue={setEmail}
          label="Confirm password"
          placeholder="Confirm password"
          type="password"
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
        <GInput
          inputValue={email}
          setInputValue={setEmail}
          label="Promo code"
          placeholder="Enter promo code"
        />

        <CitizenConfirmation
          checkVal={citizenChecked}
          setCheckVal={setCitizenChecked}
        />
      </form>
    </div>
  );
};

export default Register;
