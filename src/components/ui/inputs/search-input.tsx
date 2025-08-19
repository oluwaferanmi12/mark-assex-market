"use client";

import { useMemo } from "react";
import searchIcon from "@/assets/svgs/searchIcon.svg";
import Image from "next/image";
import { debounce } from "lodash";

export const SearchInput = ({
  onChange,
  delay = 300, // default debounce delay
}: {
  onChange?: (val: string) => void;
  delay?: number;
}) => {
  // Create debounced callback
  const debouncedOnChange = useMemo(() => {
    if (!onChange) return undefined;
    return debounce((val: string) => {
      onChange(val);
    }, delay);
  }, [onChange, delay]);

  return (
    <div className="relative">
      <span className="absolute top-3 left-3">
        <Image src={searchIcon} alt="" />
      </span>
      <input
        onChange={(e) => {
          debouncedOnChange?.(e.target.value);
        }}
        placeholder="Search..."
        className="bg-white focus:outline-none font-work-sans-regular py-2 px-4 pl-8 rounded-xl border border-[#BEBEBE59]"
      />
    </div>
  );
};
