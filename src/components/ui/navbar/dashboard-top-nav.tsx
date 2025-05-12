import Image from "next/image";
import eyeIcon from "@/assets/svgs/top-nav-eye-icon.svg";
import wallet from "@/assets/svgs/top-nav-wallet.svg";
import notificationIcon from "@/assets/svgs/icon-notification.svg";
import dailyIcon from "@/assets/svgs/icon-24-hours.svg"
import profilePlaceholder from "@/assets/svgs/profile-placeholder.svg"
import arrowDown from "@/assets/svgs/filled-arrow-down.svg"

export const DashboardTopNav = () => {
  return (
    <div className="absolute flex items-center justify-between bg-[#FFFFFF4D] top-0 border-b px-8 py-4 w-full border-[#BEBEBE80]">
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
          <Image src={profilePlaceholder} className="w-[30px] h-[30px]" alt="" />
          <Image src={arrowDown} alt="" />
        </div>
      </div>
    </div>
  );
};
