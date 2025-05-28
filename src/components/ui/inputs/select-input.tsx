import { ReactNode } from "react";

export const SelectInput = ({
  value,
  setValue,
  children,
  label,
}: {
  value: string;
  setValue: (val: string) => void;
  children: ReactNode;
  label: string;
}) => {
  return (
    <div className="w-full">
      <p className="text-[#707070] font-work-sans-regular text-xs lg:text-sm mb-1">
        {label}
      </p>
      <div className="w-full">
        <select
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          style={{
            boxShadow: "0px 2px 5px rgba(68, 68, 68, 0.1)",
          }}
          className="bg-white w-full border border-[#66666659] rounded-lg px-4 h-[36px] lg:h-[48px]"
        >
          {children}
        </select>
      </div>
    </div>
  );
};
