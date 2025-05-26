import searchIconGreen from "@/assets/svgs/search-icon-green.svg";
import Image from "next/image";

export const MobileInput = () => {
  return (
    <>
      <div className="relative w-full">
        <Image
          src={searchIconGreen}
          alt=""
          className="absolute top-3 left-2"
        />
        <input className="py-1 focus:outline-none text-xs h-[40px] px-8 rounded-lg w-full border bg-[#F5F7FAB2] border-[#BEBEBE80]" />
      </div>
    </>
  );
};
