import searchIconGreen from "@/assets/svgs/search-icon-green.svg";
import { debounce } from "lodash";
import Image from "next/image";
import { useMemo } from "react";

export const MobileInput = ({
  onChange,
  delay = 300, // default debounce delay
}: {
  onChange?: (val: string) => void;
  delay?: number;
}) => {
  const debouncedOnChange = useMemo(() => {
    if (!onChange) return undefined;
    return debounce((val: string) => {
      onChange(val);
    }, delay);
  }, [onChange, delay]);

  return (
    <>
      <div className="relative w-full">
        <Image src={searchIconGreen} alt="" className="absolute top-3 left-2" />
        <input
          onChange={(e) => {
            debouncedOnChange?.(e.target.value);
          }}
          className="py-1 focus:outline-none text-xs h-[40px] px-8 rounded-lg w-full border bg-[#F5F7FAB2] border-[#BEBEBE80]"
        />
      </div>
    </>
  );
};
