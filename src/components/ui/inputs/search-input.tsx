import searchIcon from "@/assets/svgs/searchIcon.svg";
import Image from "next/image";

export const SearchInput = () => {
  return (
    <>
      <div className="relative">
        <span className="absolute top-3 left-3">
          <Image src={searchIcon} alt="" />
        </span>
        <input
          placeholder="Search..."
          className="bg-white focus:outline-none font-work-sans-regular py-2 px-4 pl-8 rounded-xl border border-[#BEBEBE59]"
        />
      </div>
    </>
  );
};
