import { InputErrorText } from "@/components/ui/text/input-error-text";
import { error } from "console";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import eyeIcon from "@/assets/svgs/tabler-icon-eye.svg";
import eyeUnslash from "@/assets/svgs/tabler-icon-eye-unslash.svg";
import Image from "next/image";
import Link from "next/link";

export const GSelect = ({
  label,
  inputValue,
  setInputValue,
  errorState,
  children
}: {
  label: string;
  inputValue: string;
  setInputValue: (val: string) => void;
  errorState?: string;
  children: ReactNode
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
