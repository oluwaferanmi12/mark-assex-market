import smallLogo from "@/assets/svgs/small-logo.svg";
import { subtle } from "crypto";
import Image from "next/image";
export const AuthHeaderWrapper = ({
  text,
  jl,
  subText,
}: {
  text: string;
  jl?: boolean;
  subText?: string;
}) => {
  return (
    <div
      className={`${
        jl ? "justify-start flex-col items-start" : "justify-center flex-row"
      } flex items-center justify-center gap-2`}
    >
      <span>
        <Image src={smallLogo} alt="" />
      </span>
      <p
        className={`text-[#111111] font-work-sans-semi-bold text-2xl ${
          jl && "mt-4"
        }`}
      >
        {text}
      </p>
      {subText && (
        <p className="text-[#404040] text-xs font-work-sans-regular ">
          {subText}
        </p>
      )}
    </div>
  );
};
