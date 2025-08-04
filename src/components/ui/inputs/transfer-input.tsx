import Image from "next/image";

export const TransferInput = ({
  label,
  icon,
  greyBg,
  disabled,
  placeholder,
  handleInput,
  inputVal,
}: {
  label: string;
  icon?: string;
  greyBg?: boolean;
  disabled?: boolean;
  placeholder?: string;
  handleInput?: (val: string) => void;
  inputVal?: string;
}) => {
  return (
    <div className="w-full">
      <p className="text-[#707070] font-work-sans-regular text-xs lg:text-sm mb-1">
        {label}
      </p>
      <div className="relative">
        <input
          value={inputVal}
          placeholder={placeholder}
          disabled={disabled}
          className={` ${
            greyBg ? "bg-[#F2F4F7] border border-[#BEBEBE80]" : ""
          } border w-full h-[36px] lg:h-[48px] border-[#BEBEBE80] rounded-sm px-4`}
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
