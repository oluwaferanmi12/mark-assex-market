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
      } flex items-center gap-3 mb-2 py-3`}
    >
      <span className={`${status === "not-verified" && "opacity-0"}`}>
        <Image
          alt=""
          src={status === "verified" ? doubleMarked : hourGlassIcon}
        />
      </span>
      <p
        className={` font-work-sans-regular ${
          status === "not-verified" ? "text-[#707070]" : "text-[#202020]"
        }`}
      >
        {text}
      </p>
    </div>
  );
};
