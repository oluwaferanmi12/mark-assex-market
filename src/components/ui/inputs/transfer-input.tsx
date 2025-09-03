import Image from "next/image";
import usIcon from "@/assets/svgs/us-icon.svg";

export const TransferInput = ({
  label,
  icon,
  greyBg,
  disabled,
  placeholder,
  handleInput,
  inputVal,
  showUsd,
  borderBlue
}: {
  label: string;
  icon?: string;
  greyBg?: boolean;
  disabled?: boolean;
  placeholder?: string;
  handleInput?: (val: string) => void;
  inputVal?: string;
  showUsd?: boolean;
  borderBlue?: boolean
}) => {
  return (
    <div className="w-full">
      <p className="text-[#707070] font-work-sans-regular text-xs lg:text-sm mb-1">
        {label}
      </p>

      <div className="relative">
        {showUsd && (
          <span className="absolute flex items-center gap-2 right-3 top-3">
            <p>USD</p>
            <Image src={usIcon} alt="" />
          </span>
        )}

        <input
          value={inputVal}
          placeholder={placeholder}
          disabled={disabled}
          className={` ${
            greyBg ? "bg-[#F2F4F7] " : ""
          } border w-full h-[36px]  lg:h-[48px] ${borderBlue ? "border-[#007BFF]" :  "border-[#BEBEBE80] "} rounded-xl px-4`}
          onChange={(e) => {
            if (handleInput) {
              handleInput(e.target.value);
            }
          }}
        />
        {icon && (
          <span className="bg-[#E7F7F4] absolute right-2 top-[4px] lg:top-[8px]  border border-[#0DAE94] p-1 rounded-lg">
            <Image
              src={icon}
              className="lg:w-[20px] lg:h-[20px] w-[16px] h-[16px]"
              alt=""
            />
          </span>
        )}
      </div>
    </div>
  );
};
