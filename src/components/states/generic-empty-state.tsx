import Image from "next/image";
import { ReactNode } from "react";

export const GenericEmptyState = ({
  icon,
  text,
  children,
}: {
  icon: string;
  text: string;
  children: ReactNode;
}) => {
  return (
    <div className="h-[250px] my-4 min-h-[250px] rounded-lg bg-white flex items-center justify-center flex-col">
      <div className="mb-2 flex items-center justify-center flex-col">
        <div className="mb-2">
          <Image src={icon} alt="" />
        </div>
        <p className="text-[#404040] font-work-sans-regular">{text}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};
