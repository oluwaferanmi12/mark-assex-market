"use client"

import alertIcon from "@/assets/svgs/alert-icon-octagon.svg";
import { Button } from "@/components/ui/buttons/button";
import Image from "next/image";

export const AccounVerificationPending = () => {
  return (
    <div className="w-full bg-[#1F0D3F] p-4 py-2 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image src={alertIcon} alt="" />
        <p className="text-white font-work-sans-regular">
          Your account verification is pending. Verifying your account enhances
          security and unlocks more features.
        </p>
      </div>
      <Button
        action={() => {}}
        loading={false}
        text="Verify account"
        variant="green-faded-border"
        buttonSmaller
      />
    </div>
  );
};
