'use client'

import { AuthHeaderWrapper } from "@/components/shared/container/auth-header-wrapper";
import { Button } from "@/components/ui/buttons/button";
import { OTPInput } from "@/components/ui/inputs/otp-input";
import { useRouter } from "next/navigation";
import arrowLeft from "@/assets/svgs/arrow-left-green.svg";

const RegisterOtp = () => {
    const router = useRouter()
    return (
      <>
        <>
          <AuthHeaderWrapper
            jl
            text="Enter OTP"
            subText="Enter the OTP sent to your email Sam****@gmail.com. If you didn't receive it, request a new code."
          />
          <form className="my-4">
            <div className="mb-4">
              <OTPInput />
            </div>
            <div className="my-4 flex items-center font-work-sans-light">
              <p className="text-xs">
                Didn't receive any code?{" "}
                <span className="text-[#004DEF] cursor-pointer">
                  Resend code
                </span>
              </p>
            </div>
            <Button
              variant="green-bg"
              fullWidth
              text="Continue"
              action={() => {
                router.push("/select-account-type");
              }}
              loading={false}
            />
          </form>
        </>
      </>
    );
}

export default RegisterOtp