"use client";
import { PageHeader } from "@/components/ui/text/page-header";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/buttons/button";
import arrowSlantDown from "@/assets/svgs/arrow-down-left-white.svg";
import arrowSlantUp from "@/assets/svgs/arrow-up-right-white.svg";
import internalTransferIcon from "@/assets/svgs/nav-transfer-active.svg";
import { TransactionTable } from "@/components/ui/tables/transaction/transaction-table";
import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { VisibleOnMobile } from "@/components/shared/wrappers/visible-on-mobile";
import { useRouter } from "next/navigation";
import { useGetUserProfile } from "@/hooks/queries/useSettings";
import { MoneyFormat } from "@/utils/money-format";
import smallLogo from "@/assets/svgs/small-logo.svg";
import bigDollarIcon from "@/assets/svgs/big-dollar-icon.svg";
import eyeWhiteClosed from "@/assets/svgs/eye-white-closed.svg";
import eyeWhiteIconOpen from "@/assets/svgs/eye-white-icon.svg";
const Wallet = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const { data: user } = useGetUserProfile();

  const router = useRouter();
  return (
    <>
      <PageHeader text="Wallet" />
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-8">
        <div
          className="cardBg rounded-lg relative p-4 lg:w-[320px] mb-2 lg:mb-0 w-full
         h-[164px]"
        >
          <div className="flex items-center gap-2">
            <span>
              <Image src={smallLogo} alt="" />
            </span>
            <p className="text-base font-work-sans-semi-bold text-white">
              Wallet
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1">
            <p className="text-xs text-[#FFFFFFB2] font-work-sans-regular">
              Total Balance
            </p>
            <Image
              onClick={() => {
                setHideBalance((prev) => !prev);
              }}
              src={hideBalance ? eyeWhiteClosed : eyeWhiteIconOpen}
              alt=""
            />
          </div>
          <div>
            <p className="font-work-sans-semi-bold text-2xl text-white mt-2">
              {hideBalance
                ? "*****"
                : `$${MoneyFormat(user?.walletBalance ?? 0)}`}{" "}
            </p>
          </div>
          <div className="absolute bottom-2 right-2">
            <Image src={bigDollarIcon} alt="" />
          </div>
        </div>

        <VisibleOnDesktop>
          <div className="lg:flex items-center gap-3">
            <Button
              text="Deposit"
              loading={false}
              variant="green-bg"
              fullRounded
              icon={arrowSlantDown}
              action={() => {
                router.push("/deposit");
              }}
            />
            <Button
              text="Withdraw"
              loading={false}
              variant="green-bg"
              fullRounded
              action={() => {
                router.push("/withdrawal");
              }}
              icon={arrowSlantUp}
            />

            <Button
              text="Internal Transfer"
              loading={false}
              variant="green-bg-faded"
              fullRounded
              action={() => {
                router.push("/internal-transfer");
              }}
              icon={internalTransferIcon}
            />
          </div>
        </VisibleOnDesktop>
        <VisibleOnMobile>
          <div className="w-full flex items-center gap-4 mb-3">
            <Button
              text="Deposit"
              loading={false}
              variant="green-bg"
              icon={arrowSlantDown}
              action={() => {}}
              fullWidth
            />
            <Button
              text="Withdraw"
              loading={false}
              variant="green-bg"
              action={() => {}}
              fullWidth
              icon={arrowSlantUp}
            />
          </div>

          <Button
            text="Internal Transfer"
            loading={false}
            variant="green-bg-faded"
            fullWidth
            action={() => {}}
            icon={internalTransferIcon}
          />
        </VisibleOnMobile>
      </div>

      <div className="mt-8">
        <p className="lg:text-xl text-lg font-work-sans-medium lg:mb-12">
          Transaction History
        </p>

        <TransactionTable />
      </div>
    </>
  );
};

export default Wallet;
