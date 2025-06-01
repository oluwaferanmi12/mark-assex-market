import rightArrowIcon from "@/assets/svgs/arrow-right-small-green.svg";
import Image from "next/image";

export const NotificationWrapper = () => {
  return (
    <div className="bg-white p-4 mb-3 rounded-lg">
      <div style={{ borderBottom: "0.5px solid #BEBEBE59" }} className="pb-4">
        <p className="text-[#111111] font-work-sans-medium">
          Deposit Successful
        </p>
        <p className="text-[#404040] mt-1 text-xs font-work-sans-regular">
          $100,000 has been credited to your trading account.
        </p>
      </div>
      <div className="pt-3 flex items-center justify-between">
        <p className="text-xs font-work-sans-regular">
          Today • <span className="text-[#F40E0E]">10:32 AM</span>{" "}
        </p>
        <div className="flex items-center gap-1 cursor-pointer">
          <p className="text-xs font-work-sans-regular text-[#0DAE94]">View</p>
          <Image src={rightArrowIcon} alt="" />
        </div>
      </div>
    </div>
  );
};
