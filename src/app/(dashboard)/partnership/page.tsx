"use client"

import { PageHeader } from "@/components/ui/text/page-header";
import React from "react";
import partnershipIcon from "@/assets/svgs/partnership-icon.svg";
import Image from "next/image";
import { Button } from "@/components/ui/buttons/button";

const Partnership = () => {
  return (
    <div className="h-full min-h-full flex flex-col">
      <PageHeader text="Partnership" />
      <div className="flex my-4 items-center mt-40 flex-grow flex-col justify-center h-full">
        <Image src={partnershipIcon} alt="" />
        <div className="py-4 flex justify-center flex-col items-center">
          <p className="text-[#111111] text-2xl font-work-sans-regular">
            Become a partner
          </p>
          <p className="text-[#707070] font-work-sans-regular">
            Apply now to receive your customized partnership terms
          </p>
          <div className="mt-6">
            <Button
              action={() => {}}
              loading
              text="Become a partner"
              variant="green-bg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnership;
