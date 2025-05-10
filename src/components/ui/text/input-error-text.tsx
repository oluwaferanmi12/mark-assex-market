import cautionIcon from "@/assets/svgs/duo-tone.svg";
import Image from "next/image";

export const InputErrorText = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-1 mt-2 ">
      <span className="flex items-center">
        <Image src={cautionIcon} alt="" />
      </span>
      <p className="text-[#F40E0E] text-xs">{text}</p>
    </div>
  );
};
