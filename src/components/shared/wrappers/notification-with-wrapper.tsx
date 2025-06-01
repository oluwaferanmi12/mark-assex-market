import rightArrowIcon from "@/assets/svgs/arrow-right-small-green.svg";
import Image from "next/image";
import bullishImage from "@/assets/svgs/bull-image.svg";

export const NotificationWithImage = () => {
  return (
    <>
      <div>
        <Image src={bullishImage} alt="" />
      </div>
      <div className="bg-white p-4 mb-3 rounded-lg">
        <div style={{ borderBottom: "0.5px solid #BEBEBE59" }} className="pb-4">
          <p className="text-[#111111] font-work-sans-medium">
            Bullish Momentum Detected
          </p>
          <p className="text-[#404040] mt-1 text-xs font-work-sans-regular">
            Gold (XAU/USD) is showing strong upward movement, up 2.1% in the
            last hour.
          </p>
        </div>
        <div className="pt-3 flex items-center justify-between">
          <p className="text-xs font-work-sans-regular">
            Today • <span className="text-[#F40E0E]">10:32 AM</span>{" "}
          </p>
          
        </div>
      </div>
    </>
  );
};
