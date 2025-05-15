"use client";

import Image from "next/image";
import eyeIcon from "@/assets/svgs/top-nav-eye-icon.svg";
import wallet from "@/assets/svgs/top-nav-wallet.svg";
import notificationIcon from "@/assets/svgs/icon-notification.svg";
import dailyIcon from "@/assets/svgs/icon-24-hours.svg";
import profilePlaceholder from "@/assets/svgs/profile-placeholder.svg";
import arrowDown from "@/assets/svgs/filled-arrow-down.svg";
import smallLogo from "@/assets/svgs/nav-logo.svg";
import hamburgerIcon from "@/assets/svgs/hamburger-icon.svg";
import { useEffect, useState } from "react";
import { DashboardSideNav } from "@/components/ui/navbar/dashboard-side-nav";
import { AnimatePresence, motion } from "framer-motion";

export const DashboardTopNav = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  useEffect(() => {
    if (showSideNav) {
      document.body.style.overflow = "hidden";
    }
  }, [showSideNav]);
  return (
    <>
      <AnimatePresence>
        {showSideNav && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-4/5 bg-white z-50 shadow-lg"
            >
              <DashboardSideNav />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowSideNav(false)} // closes the side nav on click
            />
          </>
        )}
      </AnimatePresence>

      <div className="lg:hidden flex w-full border-b border-[#BEBEBE59] bg-white z-30  fixed top-0  items-center justify-center py-6">
        <span
          className="absolute left-4 cursor-pointer "
          onClick={() => {
            setShowSideNav(true);
          }}
        >
          <Image src={hamburgerIcon} alt="" />
        </span>
        <div className="flex items-center">
          <span>
            <Image width={36} height={36} src={smallLogo} alt="" />
          </span>
          <p className="flex items-center font-work-sans-medium gap-1">
            <span className="text-[#0DAE94]">Assex</span> <span>Markets</span>
          </p>
        </div>
      </div>
      <div className="absolute hidden lg:flex items-center justify-between bg-[#FFFFFF4D] top-0 border-b px-8 py-4 w-full border-[#BEBEBE80]">
        <div>
          <p className="text-[#111111] text-lg font-work-sans-medium">
            Hello, Blaise
          </p>
          <p className="text-xs text-[#666666] font-work-sans-regular">
            Welcome back! The market awaits.
          </p>
        </div>
        <div className="flex items-end gap-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs font-work-sans-regular text-[#707070] ">
                Wallet balance
              </p>
              <span>
                <Image src={eyeIcon} alt="" />
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <span>
                <Image src={wallet} alt="" />
              </span>
              <p className="text-[#202020] text-base font-work-sans-semi-bold">
                $21,034.00
              </p>
            </div>
          </div>
          <div>
            <Image src={notificationIcon} alt="" />
          </div>
          <div>
            <Image src={dailyIcon} alt="" />
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={profilePlaceholder}
              className="w-[30px] h-[30px]"
              alt=""
            />
            <Image src={arrowDown} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
