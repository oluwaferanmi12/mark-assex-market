import radioChecked from "@/assets/svgs/rounded-radio-filled.svg";
import radioUnchecked from "@/assets/svgs/radio-rounded.svg";
import Image from "next/image";
import { useState } from "react";

export const AgreementSetting = () => {
  const [isYes, setIsYes] = useState(true);
  return (
    <div>
      <p className="text-[#707070] font-work-sans-regular lg:text-sm text-xs">
        I confirm that I am not a citizen or tax resident of the United States.
      </p>
      <div className="flex cursor-pointer items-center gap-2 py-2">
        <div
          onClick={() => {
            setIsYes(true);
          }}
          className="bg-white border border-[#BEBEBE59] py-2 rounded-sm cursor-pointer px-4 flex items-center gap-1"
        >
          <Image src={isYes ? radioChecked : radioUnchecked} alt="" />
          <p
            className={`${
              isYes ? " text-[#202020]" : "text-[#707070]"
            }font-work-sans-regular lg:text-sm text-xs`}
          >
            {" "}
            Yes
          </p>
        </div>
        <div
          onClick={() => {
            setIsYes(false);
          }}
          className="bg-white border border-[#BEBEBE59] py-2 rounded-sm px-4 flex items-center gap-1"
        >
          <Image src={isYes ? radioUnchecked : radioChecked} alt="" />
          <p
            className={`${
              !isYes ? "text-[#202020]" : "text-[#707070]"
            }  font-work-sans-regular lg:text-sm text-xs`}
          >
            {" "}
            No
          </p>
        </div>
      </div>
    </div>
  );
};
