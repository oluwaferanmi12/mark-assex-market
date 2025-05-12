"use client";

import { AccounVerificationPending } from "@/components/shared/container/account-verifitcation-pending";
import { Button } from "@/components/ui/buttons/button";
import React, { useEffect, useRef, useState } from "react";
import plusIcon from "@/assets/svgs/table-icon-plus.svg";
import { motion } from "framer-motion";
import { DashboardCardWrapper } from "@/components/shared/wrappers/dashboard-card-wrapper";
import smallCardIcon from "@/assets/svgs/dashboard-card-icon.svg";
import Image from "next/image";
import eyeOff from "@/assets/svgs/top-nav-eye-icon.svg";
import infoIcon from "@/assets/svgs/info-icon.svg";
import arrowDown from "@/assets/svgs/filled-arrow-down.svg";
import iconTransaction from "@/assets/svgs/icon-transaction.svg";
import arrowUpRight from "@/assets/svgs/arrow-up-right.svg";
import arrowDownLeft from "@/assets/svgs/arrow-down-left.svg";
import ellipsis from "@/assets/svgs/ellipsis.svg";
import editIconBlack from "@/assets/svgs/edit-icon-dark.svg";
import editIconWhite from "@/assets/svgs/edit-icon-white.svg";

const Account = () => {
  const [activeAccount, setActiveAccount] = useState<"live" | "demo">("live");
  const liveRef = useRef<HTMLParagraphElement>(null);
  const demoRef = useRef<HTMLParagraphElement>(null);
  const [highlightStyles, setHighlightStyles] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const targetRef = activeAccount === "live" ? liveRef : demoRef;
    if (targetRef.current) {
      const { offsetLeft, offsetWidth } = targetRef.current;
      setHighlightStyles({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeAccount]);
  return (
    <div>
      <AccounVerificationPending />
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-work-sans-semi-bold">My Accounts</p>
          <Button
            variant="green-bg"
            action={() => {}}
            loading={false}
            text="Open Live Account"
            icon={plusIcon}
            buttonSmaller
            textBolder
          />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="relative bg-[#F1F5F9] gap-2 flex items-center p-2 rounded-sm">
            {/* Animated background slider */}
            <motion.div
              className="absolute top-2 bottom-2 rounded-sm bg-white shadow"
              animate={{
                left: highlightStyles.left,
                width: highlightStyles.width,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Tabs */}
            <p
              ref={liveRef}
              onClick={() => setActiveAccount("live")}
              className={`relative z-10 font-work-sans-medium cursor-pointer p-2 text-sm rounded-sm ${
                activeAccount === "live" ? "text-[#111111]" : "text-[#707070]"
              }`}
            >
              Live Account
            </p>
            <p
              ref={demoRef}
              onClick={() => setActiveAccount("demo")}
              className={`relative z-10 font-work-sans-medium cursor-pointer p-2 text-sm rounded-sm ${
                activeAccount === "demo" ? "text-[#111111]" : "text-[#707070]"
              }`}
            >
              Demo Account
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <DashboardCardWrapper>
            <div className="flex items-center gap-3">
              <span>
                <Image src={smallCardIcon} alt="" />
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 ">
                  <p className="text-[#404040] text-xs font-work-sans-medium">
                    Wallet balance
                  </p>
                  <span>
                    <Image src={eyeOff} alt="" />
                  </span>
                </div>
                <p className="text-[#111111] text-[20px] font-work-sans-semi-bold">
                  $ 21,522,400
                </p>
              </div>
            </div>
          </DashboardCardWrapper>
          <DashboardCardWrapper>
            <div className="flex items-center gap-3">
              <span>
                <Image src={smallCardIcon} alt="" />
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 ">
                  <p className="text-[#404040] text-xs font-work-sans-medium">
                    Total Revenue{" "}
                    <span className="text-[#707070] font-work-sans-regular">
                      (Live account)
                    </span>
                  </p>
                  <span>
                    <Image src={eyeOff} alt="" />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[#111111] text-[20px] font-work-sans-semi-bold">
                    $ 21,522,400
                  </p>
                  <p className="text-[#34C659] text-xs font-work-sans-semi-bold">
                    +14%
                  </p>
                </div>
              </div>
            </div>
          </DashboardCardWrapper>
          <DashboardCardWrapper>
            <div className="flex items-center gap-3">
              <span>
                <Image src={smallCardIcon} alt="" />
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 ">
                  <p className="text-[#404040] text-xs font-work-sans-medium">
                    No. of trades
                  </p>
                  <span>
                    <Image src={eyeOff} alt="" />
                  </span>
                </div>
                <p className="text-[#111111] text-[20px] font-work-sans-semi-bold">
                  2,023
                </p>
                <p className="text-[#34C659] text-xs font-work-sans-semi-bold">
                  Active: 5 I Closed: 2,018{" "}
                </p>
              </div>
            </div>
          </DashboardCardWrapper>
          <DashboardCardWrapper>
            <span className="absolute cursor-pointer top-4 right-4">
              <Image src={infoIcon} alt="" />
            </span>
            <div className="flex items-center gap-4 ">
              <span>
                <Image src={smallCardIcon} alt="" />
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 ">
                  <p className="text-[#404040] text-xs font-work-sans-medium">
                    Most Profitable Trade
                  </p>
                  <span>
                    <Image src={eyeOff} alt="" />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[#111111] text-[20px] font-work-sans-semi-bold">
                    +$300,000
                  </p>
                  <p className="text-[#34C659] text-xs font-work-sans-semi-bold">
                    XAUUSD
                  </p>
                </div>
              </div>
            </div>
          </DashboardCardWrapper>
        </div>
        <div className="mt-8">
          <div className="flex">
            <div
              style={{ boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)" }}
              className="border border-[#BEBEBE80] justify-between min-w-[200px] flex bg-white rounded-lg px-4 py-2"
            >
              <p>Newest</p>
              <Image src={arrowDown} alt="" />
            </div>
          </div>
          <div
            style={{ border: "0.5px solid #BEBEBE " }}
            className="my-4  bg-white  rounded-lg"
          >
            <div
              style={{ borderBottom: "0.5px solid #BEBEBE " }}
              className="flex p-6 border-b   justify-between items-stretch"
            >
              <div className="flex flex-col gap-4 ">
                <div className="flex items-center gap-3">
                  <span className="bg-[#34C65933] rounded-sm text-xs text-[#34C659] px-2 py-1 font-work-sans-regular">
                    Live
                  </span>
                  <span className="bg-[#1F0D3F1A] rounded-sm text-xs text-[#1F0D3F] px-2 py-1 font-work-sans-regular">
                    Raw Spread
                  </span>
                  <span className="bg-[#F1F5F9] rounded-sm text-xs text-black px-2 py-1 font-work-sans-regular">
                    Account #81978
                  </span>
                </div>
                <p className="text-3xl font-work-sans-semi-bold">$50,000 USD</p>
              </div>
              <div className="flex items-center gap-12 ">
                <div className="flex items-center gap-4 flex-col justify-center">
                  <p className="text-[#0DAE94]  font-work-sans-regular">
                    Equity
                  </p>
                  <p className="text-lg font-work-sans-regular">50,000 USD</p>
                </div>
                <div className="flex gap-4 items-center flex-col justify-center">
                  <p className="text-[#0DAE94] font-work-sans-regular">
                    Leverage
                  </p>
                  <p className="text-lg font-work-sans-regular">1:500</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 ">
                <div className="flex justify-end">
                  <Button
                    icon={iconTransaction}
                    variant="green-bg"
                    buttonSmaller
                    text="Trade"
                    loading={false}
                    action={() => {}}
                    textBolder
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    icon={arrowDownLeft}
                    variant="green-bg-faded"
                    buttonSmaller
                    text="Deposit"
                    loading={false}
                    action={() => {}}
                    textBolder
                    fullRounded
                  />
                  <Button
                    icon={arrowUpRight}
                    variant="green-bg-faded"
                    buttonSmaller
                    text="Withdraw"
                    loading={false}
                    action={() => {}}
                    textBolder
                    fullRounded
                  />
                  <span>
                    <Image src={ellipsis} alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6  flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <p className="text-[#707070] text-lg font-work-sans-regular">
                  Balance
                </p>
                <p className="text-[#707070] text-lg font-work-sans-regular">
                  Equity
                </p>
                <p className="text-[#707070] text-lg font-work-sans-regular">
                  MT5 Login: <span className="text-[#1F0D3F]">81978</span>
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-[#707070] flex items-center gap-12 text-lg font-work-sans-regular">
                  <p className="text-[#202020]">$ 50,000</p>
                  <p>Actual leverage</p>
                </div>
                <div className="text-[#707070] flex items-center gap-12 text-lg font-work-sans-regular">
                  <p className="text-[#202020]">$ 50,000</p>
                  <p>Available to withdraw</p>
                </div>
                <p className="text-[#707070] text-lg font-work-sans-regular">
                  Server:{" "}
                  <span className="text-[#1F0D3F]">Assexmarkets MT5</span>
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-[#707070] flex items-center gap-1 text-lg font-work-sans-regular justify-end">
                  <p className="text-[#202020]">1:200</p>
                  <Image src={editIconBlack} alt="" />
                </div>
                <p className="text-[#202020] flex justify-end items-center text-lg font-work-sans-regular">
                  $ 49,000
                </p>
                <div>
                  <Button
                    variant="green-bg"
                    action={() => {}}
                    loading={false}
                    text="Change password"
                    buttonSmaller
                    icon={editIconWhite}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ border: "0.5px solid #BEBEBE " }}
            className="my-4  bg-white  rounded-lg"
          >
            <div
              style={{ borderBottom: "0.5px solid #BEBEBE " }}
              className="flex p-6 border-b   justify-between items-stretch"
            >
              <div className="flex flex-col gap-4 ">
                <div className="flex items-center gap-3">
                  <span className="bg-[#34C65933] rounded-sm text-xs text-[#34C659] px-2 py-1 font-work-sans-regular">
                    Demo
                  </span>
                  <span className="bg-[#1F0D3F1A] rounded-sm text-xs text-[#1F0D3F] px-2 py-1 font-work-sans-regular">
                    Standard
                  </span>
                  <span className="bg-[#F1F5F9] rounded-sm text-xs text-black px-2 py-1 font-work-sans-regular">
                    Account #81978
                  </span>
                </div>
                <p className="text-3xl font-work-sans-semi-bold">$50,000 USD</p>
              </div>
              <div className="flex items-center gap-12 ">
                <div className="flex items-center gap-4 flex-col justify-center">
                  <p className="text-[#0DAE94]  font-work-sans-regular">
                    Equity
                  </p>
                  <p className="text-lg font-work-sans-regular">50,000 USD</p>
                </div>
                <div className="flex gap-4 items-center flex-col justify-center">
                  <p className="text-[#0DAE94] font-work-sans-regular">
                    Leverage
                  </p>
                  <p className="text-lg font-work-sans-regular">1:500</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 ">
                <div className="flex justify-end">
                  <Button
                    icon={iconTransaction}
                    variant="green-bg"
                    buttonSmaller
                    text="Trade"
                    loading={false}
                    action={() => {}}
                    textBolder
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    icon={arrowDownLeft}
                    variant="green-bg-faded"
                    buttonSmaller
                    text="Deposit"
                    loading={false}
                    action={() => {}}
                    textBolder
                    fullRounded
                  />
                  <Button
                    icon={arrowUpRight}
                    variant="green-bg-faded"
                    buttonSmaller
                    text="Withdraw"
                    loading={false}
                    action={() => {}}
                    textBolder
                    fullRounded
                  />
                  <span>
                    <Image src={ellipsis} alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6  flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <p className="text-[#707070] text-lg font-work-sans-regular">
                  Balance
                </p>
                <p className="text-[#707070] text-lg font-work-sans-regular">
                  Equity
                </p>
                <p className="text-[#707070] text-lg font-work-sans-regular">
                  MT5 Login: <span className="text-[#1F0D3F]">81978</span>
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-[#707070] flex items-center gap-12 text-lg font-work-sans-regular">
                  <p className="text-[#202020]">$ 50,000</p>
                  <p>Actual leverage</p>
                </div>
                <div className="text-[#707070] flex items-center gap-12 text-lg font-work-sans-regular">
                  <p className="text-[#202020]">$ 50,000</p>
                  <p>Available to withdraw</p>
                </div>
                <p className="text-[#707070] text-lg font-work-sans-regular">
                  Server:{" "}
                  <span className="text-[#1F0D3F]">Assexmarkets MT5</span>
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-[#707070] flex items-center gap-1 text-lg font-work-sans-regular justify-end">
                  <p className="text-[#202020]">1:200</p>
                  <Image src={editIconBlack} alt="" />
                </div>
                <p className="text-[#202020] flex justify-end items-center text-lg font-work-sans-regular">
                  $ 49,000
                </p>
                <div>
                  <Button
                    variant="green-bg"
                    action={() => {}}
                    loading={false}
                    text="Change password"
                    buttonSmaller
                    icon={editIconWhite}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
