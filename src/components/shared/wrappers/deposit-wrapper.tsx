"use client";
import radioChecked from "@/assets/svgs/radio-button-filled.svg";
import radioUnChecked from "@/assets/svgs/radio-button.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  return (
    <div className="relative w-full">
      <div
        onClick={() => {
          setActiveIndex(index);
          router.push("/deposit/proceed");
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${
          active
            ? "border-l-2 border-b-2 border-[#0DAE9480]"
            : "border-[#BEBEBE59] border"
        }  w-full py-6  bg-white rounded-2xl p-4 flex items-start gap-2 cursor-pointer`}
      >
        {/* <Image src={active ? radioChecked : radioUnChecked} alt="" /> */}
        <Image src={icon} alt="" />
        <div>
          <p className="lg:text-base text-sm font-work-sans-regular">{text}</p>
          <div className="mt-2">
            <div className="flex items-center text-xs gap-4 mb-1">
              <p className="text-[#707070]">Min Deposit:</p>
              <p className="text-[#202020]">$10.00</p>
            </div>
            <div className="flex items-center text-xs gap-4 mb-1">
              <p className="text-[#707070]">Max Deposit:</p>
              <p className="text-[#202020]">$10.00</p>
            </div>
            <div className="flex items-center text-xs gap-4 mb-1">
              <p className="text-[#707070]">Deposit Time:</p>
              <p className="text-[#202020]">Instant - 12hrs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
