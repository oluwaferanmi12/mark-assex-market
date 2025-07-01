"use client";

import LiveAccount from "@/app/select-account-type/live/page";
import { PageGoBack } from "@/components/shared/page-go-back/page-go-back";
import { AccountToggle } from "@/components/shared/toggle/live-toggle";
import { Button } from "@/components/ui/buttons/button";
import React, { useState } from "react";

function ClientDetails() {
  const [activeAccount, setActiveAccount] = useState<"live" | "demo">("live");
  return (
    <>
      <PageGoBack />
      <div>
        <AccountToggle
          activeAccount={activeAccount}
          setActiveAccount={setActiveAccount}
        />
      </div>
      <div className="mt-4">
        <div className="my-4 bg-white border-[0.5px] border-[#BEBEBE80] p-4 rounded-lg">
          <div className="flex items-end justify-between">
            <div className="flex items-center justify-between w-4/5">
              <div className="flex flex-col gap-4">
                <div className="bg-[#34C65933] rounded-lg">
                  <p className="text-[#34C659] text-center text-sm font-work-sans-regular p-2 ">
                    Leverage plus
                  </p>
                </div>
                <p className="font-work-sans-semi-bold text-3xl">
                  $120,000 USD
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-[#F1F5F9] rounded-lg">
                  <p className="text-[#111111] text-center text-sm font-work-sans-regular p-2 ">
                    Account ID
                  </p>
                </div>
                <p className="font-work-sans-regular text-[#111111] text-lg text-center">
                  481978
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-[#F1F5F9] rounded-lg">
                  <p className="text-[#0DAE94] text-center text-sm font-work-sans-regular p-2 ">
                    Equity
                  </p>
                </div>
                <p className="font-work-sans-regular text-[#111111] text-lg text-center">
                  48,869.01 USD
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-[#F1F5F9] rounded-lg">
                  <p className="text-[#0DAE94] text-center text-sm font-work-sans-regular p-2 ">
                    Leverage
                  </p>
                </div>
                <p className="font-work-sans-regular text-[#111111] text-lg text-center">
                  1:200
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 bg-white border-[0.5px] border-[#BEBEBE80] p-4 rounded-lg">
          <div className="flex items-end justify-between">
            <div className="flex items-center justify-between w-4/5">
              <div className="flex flex-col gap-4">
                <div className="bg-[#34C65933] rounded-lg">
                  <p className="text-[#34C659] text-center text-sm font-work-sans-regular p-2 ">
                    Standard
                  </p>
                </div>
                <p className="font-work-sans-semi-bold text-3xl">
                  $120,000 USD
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-[#F1F5F9] rounded-lg">
                  <p className="text-[#111111] text-center text-sm font-work-sans-regular p-2 ">
                    Account ID
                  </p>
                </div>
                <p className="font-work-sans-regular text-[#111111] text-lg text-center">
                  481978
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-[#F1F5F9] rounded-lg">
                  <p className="text-[#0DAE94] text-center text-sm font-work-sans-regular p-2 ">
                    Equity
                  </p>
                </div>
                <p className="font-work-sans-regular text-[#111111] text-lg text-center">
                  48,869.01 USD
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-[#F1F5F9] rounded-lg">
                  <p className="text-[#0DAE94] text-center text-sm font-work-sans-regular p-2 ">
                    Leverage
                  </p>
                </div>
                <p className="font-work-sans-regular text-[#111111] text-lg text-center">
                  1:200
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 bg-white border-[0.5px] border-[#BEBEBE80] p-4 rounded-lg">
          <div className="flex items-end justify-between">
            <div className="flex items-center justify-between w-4/5">
              <div className="flex flex-col gap-4">
                <div className="bg-[#1F0D3F33] rounded-lg">
                  <p className="text-[#1F0D3F] text-center text-sm font-work-sans-regular p-2 ">
                    Raw Spread
                  </p>
                </div>
                <p className="font-work-sans-semi-bold text-3xl">
                  $120,000 USD
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-[#F1F5F9] rounded-lg">
                  <p className="text-[#111111] text-center text-sm font-work-sans-regular p-2 ">
                    Account ID
                  </p>
                </div>
                <p className="font-work-sans-regular text-[#111111] text-lg text-center">
                  481978
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-[#F1F5F9] rounded-lg">
                  <p className="text-[#0DAE94] text-center text-sm font-work-sans-regular p-2 ">
                    Equity
                  </p>
                </div>
                <p className="font-work-sans-regular text-[#111111] text-lg text-center">
                  48,869.01 USD
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-[#F1F5F9] rounded-lg">
                  <p className="text-[#0DAE94] text-center text-sm font-work-sans-regular p-2 ">
                    Leverage
                  </p>
                </div>
                <p className="font-work-sans-regular text-[#111111] text-lg text-center">
                  1:200
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientDetails;
