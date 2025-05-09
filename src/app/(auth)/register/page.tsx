import { AuthHeaderWrapper } from "@/components/shared/container/auth-header-wrapper";
import { AuthToggle } from "@/components/shared/container/auth-toggle";
import React from "react";

const Register = () => {
  return (
    <div>
      <AuthHeaderWrapper text="Create your account" />
      <AuthToggle active="register" />
    </div>
  );
};

export default Register;
