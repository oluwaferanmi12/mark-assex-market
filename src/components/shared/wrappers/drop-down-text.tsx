import arrowDown from "@/assets/svgs/filled-arrow-down.svg";
import Image from "next/image";

export const DropDownTextWrapper = ({
  filterSelected,
}: {
  filterSelected: string;
}) => {
  return (
    
      <div
        style={{ boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)" }}
        className="border border-[#BEBEBE80] justify-between min-w-[200px] flex bg-white rounded-lg px-4 py-2"
      >
        <p className="font-work-sans-medium lg:text-sm text-xs">
          {filterSelected}
        </p>
        <Image src={arrowDown} alt="" />
      </div>
  );
};
