"use client";

import priceIconWrap from "@/assets/svgs/price-icon-wrap.svg";
import { Button } from "@/components/ui/buttons/button";
import checkIcon from "@/assets/svgs/tabler-icon-checkbox.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AccountGroupInterface } from "@/types";
import { useState } from "react";

const ACTIVE_SHADOW =
  "0px 16px 48px 0px rgba(0, 204, 177, 0.12), 0px 4px 12px 0px rgba(10, 124, 255, 0.24), 0px 0px 0px 4px #00CCB1";

const INACTIVE_SHADOW =
  "0px 0px 1px 0px rgba(36, 38, 41, 0.24), 0px 1px 2px 0px rgba(36, 38, 41, 0.08)";

export const AccountTypeWrapper = ({
  item,
  active,
}: {
  item: AccountGroupInterface;
  active?: boolean;
}) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const showActive = Boolean(active || hovered);

  return (
    <div
      className={`p-8 rounded-lg mb-4 lg:mb-0 min-h-[500px] bg-white transition-[box-shadow,transform] duration-200 ease-out ${
        showActive ? "translate-y-0" : "hover:-translate-y-1"
      } ${active ? "" : "focus-within:-translate-y-1"}`}
      style={{ boxShadow: showActive ? ACTIVE_SHADOW : INACTIVE_SHADOW }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}   // keyboard focus support
      onBlur={() => setHovered(false)}
      role="region"
      aria-pressed={active}
      tabIndex={0} // enables keyboard focus to preview active state
    >
      <div className="flex justify-between items-center">
        <span className="bg-[#00CCB11F] border border-[#00CCB11F] text-[#0DAE94] rounded-lg text-xs px-4 py-2 font-work-sans-medium">
          {item.name}
        </span>
        {item.logo && (
          <span>
            <Image src={item.logo} width={50} height={50} alt="" />
          </span>
        )}
      </div>

      <div className="my-4">
        <p className="lg:text-base text-sm font-work-sans-regular leading-7">
          {item.description}
        </p>
      </div>

      <div className="my-4">
        <Button
          text="Create Account"
          variant="green-bg"
          action={() => router.push("/create-account")}
          loading={false}
          fullRounded
          fullWidth
        />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Image src={checkIcon} alt="" />
          <p className="text-[#404040] text-xs lg:text-sm font-work-sans-regular">
            Maximum Deposit ${item.maxDeposit}
          </p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Image src={checkIcon} alt="" />
          <p className="text-[#404040] text-xs lg:text-sm font-work-sans-regular">
            Spread from {item.spread}
          </p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Image src={checkIcon} alt="" />
          <p className="text-[#404040] text-xs lg:text-sm font-work-sans-regular">
            Comission ${item.commission}
          </p>
        </div>
      </div>
    </div>
  );
};
