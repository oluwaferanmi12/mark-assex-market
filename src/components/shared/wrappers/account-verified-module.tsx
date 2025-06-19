import { ModuleVerifiedStatus } from "@/interfaces/ui-interfac";
import doubleMarked from "@/assets/svgs/double-marked.svg";
import Image from "next/image";
import hourGlassIcon from "@/assets/svgs/hour-glass.svg";

export const ModuleVerified = ({
  status,
  text,
}: {
  status: ModuleVerifiedStatus;
  text: string;
}) => {
  return (
    <div
      className={` border-b ${
        status === "verified"
          ? " border-[#0DAE94]"
          : status === "verifying"
          ? "border-[#EE9507]"
          : "border-[#BEBEBE]"
      } flex items-center lg:gap-3 lg:mb-2 py-3 lg:pr-0 pr-3`}
    >
      <span
        className={`w-[30px] h-[30px] ${
          status === "not-verified" && "opacity-0"
        } hidden lg:block`}
      >
        <Image
          alt=""
          src={status === "verified" ? doubleMarked : hourGlassIcon}
        />
      </span>
      <span
        className={`w-[30px] h-[30px] ${
          status === "not-verified" && "opacity-0"
        } lg:hidden`}
      >
        <Image alt="" src={status === "verified" && doubleMarked} />
      </span>
      <p
        className={`text-xs lg:text-sm whitespace-nowrap font-work-sans-regular ${
          status === "not-verified" ? "text-[#707070]" : "text-[#202020]"
        }`}
      >
        {text}
      </p>
    </div>
  );
};
