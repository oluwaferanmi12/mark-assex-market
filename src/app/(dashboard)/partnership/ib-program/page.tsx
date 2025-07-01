"use client";

import { PageHeader } from "@/components/ui/text/page-header";
import React, { useState } from "react";
import arrowRight from "@/assets/svgs/arrow-right-icon.svg";
import Image from "next/image";
import arrowDown from "@/assets/svgs/arrow-down-black.svg";
import { AnimatePresence, motion } from "framer-motion";

function IBProgram() {
  const [buttonClicked, setButtonClicked] = useState(false);
  return (
    <>
      <PageHeader text="IB Program" />
      <div>
        <p className="text-[#707070]">
          View the current IB rewards and benefits you’re enrolled in.
        </p>
      </div>
      <div className="my-4">
        <motion.div
          layout
          className="border-[#BEBEBE] bg-white border-[0.5px] p-4 rounded-lg mb-5"
        >
          <div
            onClick={() => setButtonClicked((prev) => !prev)}
            className={`flex ${buttonClicked && 'mb-4'} items-center justify-between cursor-pointer`}
          >
            <div className="gap-2 flex items-center">
              <p className="text-[#404040] font-work-sans-regular">
                Partner Code:
              </p>
              <p className="text-[#111111] font-work-sans-medium">8197834</p>
            </div>
            <div>
              <Image src={arrowRight} alt="" />
            </div>
          </div>

          <motion.div
            layout
            initial={false}
            animate={{
              height: buttonClicked ? "auto" : 0,
              opacity: buttonClicked ? 1 : 0,
            }}
            style={{ overflow: "hidden" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex py-3 border-[#BEBEBE59] border-t-[0.5px] items-center justify-between">
              <p className="text-[#707070] text-xs font-work-sans-regular">
                IB Program
              </p>
              <p className="text-[#202020] text-xs">Traded Volume</p>
            </div>

            <div className="flex py-3 border-[#BEBEBE59] border-t-[0.5px] items-center justify-between">
              <p className="text-[#707070] text-xs font-work-sans-regular">
                Base reward for volume
              </p>
              <p className="text-[#202020] text-xs">$4.00</p>
            </div>

            <div className="flex py-3 border-[#BEBEBE59] border-t-[0.5px] items-center justify-between">
              <p className="text-[#707070] text-xs font-work-sans-regular">
                Base reward for spread
              </p>
              <p className="text-[#202020] text-xs">0%</p>
            </div>

            <div className="flex py-3 border-[#BEBEBE59] border-t-[0.5px] items-center justify-between">
              <p className="text-[#707070] text-xs font-work-sans-regular">
                Base reward for commissions
              </p>
              <p className="text-[#202020] text-xs">0%</p>
            </div>
          </motion.div>
        </motion.div>

        <div>
          <p className="mb-2 font-work-sans-medium">Sub IB Program</p>
          <div className="border-[0.5px] mb-5 flex items-center justify-between border-[#BEBEBE] bg-white p-4 rounded-lg">
            <div className="gap-2 flex items-center">
              <p className="text-[#707070]  font-work-sans-regular">
                Level 1 Percentage
              </p>
            </div>
            <div>
              <p className="text-[#202020]">15%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IBProgram;
