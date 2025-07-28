"use client";
import radioChecked from "@/assets/svgs/radio-button-filled.svg";
import radioUnChecked from "@/assets/svgs/radio-button.svg";
import { PaymentMethod } from "@/types";
import { MoneyFormat } from "@/utils/money-format";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const DepositWrapper = ({
  active,
  index,
  setActiveIndex,
  enterUrl = "/deposit/proceed",
  method,
}: {
  active: boolean;
  index: number;
  setActiveIndex: (val: number) => void;
  enterUrl?: string;
  method: PaymentMethod;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  return (
    <div className="relative w-full">
      <div
        onClick={() => {
          setActiveIndex(index);
          router.push(`${enterUrl}?val=${method.slug}`);
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
        <Image width={50} height={50} src={method.image} alt="" />
        <div>
          <p className="lg:text-base text-sm font-work-sans-regular">
            {method.name}
          </p>
          <div className="mt-2">
            <div className="flex items-center text-xs gap-4 mb-1">
              <p className="text-[#707070]">Min Deposit:</p>

              <p className="text-[#202020]">${MoneyFormat(method.minAmount)}</p>
            </div>
            <div className="flex items-center text-xs gap-4 mb-1">
              <p className="text-[#707070]">Max Deposit:</p>
              <p className="text-[#202020]">${MoneyFormat(method.maxAmount)}</p>
            </div>
            <div className="flex items-center text-xs gap-4 mb-1">
              <p className="text-[#707070]">Deposit Time:</p>
              <p className="text-[#202020]">{method.time}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
