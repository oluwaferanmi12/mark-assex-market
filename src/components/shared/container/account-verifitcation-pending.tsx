"use client";

import alertIcon from "@/assets/svgs/alert-icon-octagon.svg";
import { Button } from "@/components/ui/buttons/button";
import Image from "next/image";

export const AccounVerificationPending = () => {
  return (
    <div className="w-full lg:flex-row bg-[#1F0D3F] lg:py-2  rounded-lg p-4 py-4 flex justify-between items-center flex-col">
      <div className="flex items-center mb-4 lg:mb-0 gap-2">
        <Image src={alertIcon} alt="" />
        <p className="text-white text-xs lg:text-sm font-work-sans-regular">
          Your account verification is pending. Verifying your account enhances
          security and unlocks more features.
        </p>
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
          action={() => {}}
          loading={false}
          text="Verify account"
          variant="green-faded-border"
          buttonSmaller
        />
      </div>
    </div>
  );
};
