import Image from "next/image";

export const TransferInput = ({
  label,
  icon,
  greyBg,
}: {
  label: string;
  icon?: string;
  greyBg?: boolean;
}) => {
  return (
    <div className="w-full">
      <p className="text-[#707070] font-work-sans-regular text-sm lg:text-sm mb-1">
        {label}
      </p>
      <div className="relative">
        <input
          className={` ${
            greyBg ? "bg-[#F2F4F7] border border-[#BEBEBE80]" : ""
          } border w-full h-[48px] border-[#BEBEBE80] rounded-sm`}
        />
        {icon && (
          <span className="bg-[#E7F7F4] absolute right-2 top-[8px]  border border-[#0DAE94] p-1 rounded-lg">
            <Image src={icon} className="w-[20px] h-[20px]" alt="" />
          </span>
        )}
      </div>
    </div>
  );
};
