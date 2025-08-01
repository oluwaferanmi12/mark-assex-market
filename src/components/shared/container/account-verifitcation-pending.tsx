"use client";

import alertIcon from "@/assets/svgs/alert-icon-octagon.svg";
import { Button } from "@/components/ui/buttons/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import timerIcon from "@/assets/svgs/timer-icon.svg";

export const AccounVerificationPending = () => {
  const router = useRouter();
  return (
    <div className="w-full lg:flex-row bg-[#0DAE94] lg:py-2  rounded-lg p-4 py-4 flex justify-between items-center flex-col">
      <div className="flex items-center mb-4 lg:mb-0 gap-2">
        <Image src={timerIcon} alt="" />
        <div>
          <p className="text-xl font-work-sans-semi-bold text-white">
            Account verification pending
          </p>
          <p className="text-white text-xs lg:text-sm font-work-sans-regular">
            Your account verification is pending. Verifying your account
            enhances security and unlocks more features.
          </p>
        </div>
      </div>
      <div className="lg:hidden w-full">
        <Button
          action={() => {}}
          loading={false}
          text="Verify account"
          variant="green-faded-border"
          buttonSmaller
          fullWidth
        />
      </div>
      <div className="hidden lg:block">
        <Button
          action={() => {
            router.push("/account-verification");
          }}
          loading={false}
          text="Verify account"
          variant="green-faded-border"
          buttonSmaller
        />
      </div>
    </div>
  );
};
