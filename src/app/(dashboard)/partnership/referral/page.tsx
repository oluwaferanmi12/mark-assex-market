import { PageHeader } from "@/components/ui/text/page-header";
import React from "react";
import anchorIcon from "@/assets/svgs/anchor.svg";
import Image from "next/image";
import copyIcon from "@/assets/svgs/copyIcon.svg";
import downloadButton from "@/assets/svgs/download-button.svg";
import graphPlaceHolder from "@/assets/svgs/placeholder-image.svg";
function Referral() {
  return (
    <>
      <PageHeader text="Referral Link" />
      <div>
        <p className="text-[#707070]">
          Earn rewards by sharing your unique referral link. Invite others and
          grow your earnings.
        </p>
      </div>
      <div className="mt-3">
        <p className="text-[#202020] font-work-sans-regular mb-2 ">
          Your referral code
        </p>
        <div className="min-h-[50px] rounded-lg overflow-hidden border border-[#BEBEBE52] h-[50px] flex items-center">
          <div className=" flex items-center justify-center bg-[#E7F7F4] h-full px-6">
            <Image src={anchorIcon} alt="" />
          </div>
          <input
            value="https://my.assexmarkets.com/auth/register?partner_code=000000"
            className="h-full w-full px-4 focus:outline-none outline:none border-none text-[#707070] font-grotesk-regular"
          />
          <div className="px-6 h-full gap-2 bg-[#0DAE94E5] flex items-center justify-center ">
            <Image src={copyIcon} alt="" />
            <p className="text-white font-work-sans-medium">Copy</p>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-[#FFFFFF] rounded-lg p-4  ">
        <div className="flex items-center justify-between">
          <div>
            <div>
              <p className="text-[#111111] font-work-sans-medium">Statistics</p>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-[#0DAE94] rounded-sm"></span>
                <p className="text-[#5A607F] font-work-sans-regular">Clicks</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="p-2 bg-[#1F0D3F] rounded-sm"></span>
                <p className="text-[#5A607F] font-work-sans-regular">
                  Registered
                </p>
              </div>
            </div>
          </div>
          <div>
            <Image src={downloadButton} alt="" />
          </div>
        </div>
        <div className="flex items-center ">
          <Image className="w-full" src={graphPlaceHolder} alt="" />
        </div>
      </div>
    </>
  );
}

export default Referral;
