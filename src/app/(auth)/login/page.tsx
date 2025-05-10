"use client";

import { AuthHeaderWrapper } from "@/components/shared/container/auth-header-wrapper";
import { AuthToggle } from "@/components/shared/container/auth-toggle";
import { GInput } from "@/components/ui/inputs/general-input";
import React, { useState } from "react";

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
      </form>
    </div>
  );
};

export default Login;
