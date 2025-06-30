import { TableTextInterface } from "@/interfaces/ui-interfac";
import Image from "next/image";

export const TableText = ({ text, variant, icon }: TableTextInterface) => {
  return (
    <div className="flex items-center gap-2 justify-center">
      {icon && <Image src={icon} alt="" />}

      <p
        className={`${
          variant === "header"
            ? "text-xs font-work-sans-regular "
            : variant === "body"
            ? "font-work-sans-regular text-sm  py-4"
            : "font-work-sans-regular "
        } text-center`}
      >
        {text}
      </p>
    </div>
  );
};
