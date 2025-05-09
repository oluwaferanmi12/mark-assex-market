import smallLogo from "@/assets/svgs/small-logo.svg";
import Image from "next/image";
export const AuthHeaderWrapper = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <span>
        <Image src={smallLogo} alt="" />
      </span>
      <p className="text-[#111111] font-work-sans-semi-bold text-2xl">{text}</p>
    </div>
  );
};
