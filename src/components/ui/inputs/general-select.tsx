import { InputErrorText } from "@/components/ui/text/input-error-text";
import { ReactNode, SetStateAction, useState } from "react";
export const GSelect = ({
  label,
  inputValue,
  setInputValue,
  errorState,
  children,
  disabled,
}: {
  label: string;
  inputValue: string;
  setInputValue: (val: string) => void;
  errorState?: string;
  children: ReactNode;
  disabled?: boolean;
}) => {
  // This sort of only represents an input field that is a string
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between w-full m-0 p-0">
        <label className="font-work-sans-regular text-xs text-[#404040] ;lg:text-sm">
          {label}
        </label>
      </div>

      <div className="mt-1 relative">
        <select
          disabled={disabled}
          className="w-full px-4 py-3 border border-[#BEBEBE59] bg-[#F3F4F4] rounded-lg placeholder:text-[#8A8A8A] placeholder:font-work-sans-regular outline-none text-xs font-work-sans-medium "
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        >
          {children}
        </select>
        {errorState && <InputErrorText text={errorState} />}
      </div>
    </div>
  );
};
