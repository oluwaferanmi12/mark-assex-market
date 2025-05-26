"use client";
import radioChecked from "@/assets/svgs/radio-button-filled.svg";
import radioUnChecked from "@/assets/svgs/radio-button.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export const DepositWrapper = ({
  icon,
  active,
  text,
  index,
  setActiveIndex,
}: {
  icon: string;
  active: boolean;
  text: string;
  index: number;
  setActiveIndex: (val: number) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative w-full">
      <div
        onClick={() => {
          setActiveIndex(index);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${
          active
            ? "border-l-2 border-b-2 border-[#0DAE9480]"
            : "border-[#BEBEBE59] border"
        }  w-full py-6  bg-white rounded-2xl p-4 flex items-center gap-2 cursor-pointer `}
      >
        <Image src={active ? radioChecked : radioUnChecked} alt="" />
        <Image src={icon} alt="" />
        <p className="text-base font-work-sans-regular">{text}</p>
      </div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="bg-[#FFFFFF] w-full p-8 absolute -bottom-40 mt-2 rounded-lg shadow-md z-20"
        >
          <div className="flex items-center gap-8 mb-3">
            <p className="text-[#404040] font-work-sans-regular">
              Min Deposit:
            </p>
            <p className="font-work-sans-regular text-[#111111]">$10.00</p>
          </div>
          <div className="flex items-center gap-8 mb-3">
            <p className="text-[#404040] font-work-sans-regular">
              Max Deposit:
            </p>
            <p className="font-work-sans-regular text-[#111111]">
              $50,000,000.00
            </p>
          </div>
          <div className="flex items-center gap-8 mb-3">
            <p className="text-[#404040] font-work-sans-regular">Commission:</p>
            <p className="font-work-sans-regular text-[#111111]">
              From $0.00 to $01.00
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
