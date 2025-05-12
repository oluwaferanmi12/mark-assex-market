import placeholder from "@/assets/svgs/profile-placeholder.svg";
import Image from "next/image";

export const DashboardUserDetails = () => {
  return (
    <>
      <div className="flex items-center gap-2 mt-4">
        <span>
          <Image src={placeholder} alt="" />
        </span>
        <div>
          <p className="text-[#202020] font-work-sans-medium">Tarique</p>
          <p className="text-xs font-work-sans-light">Blaise@gmail.com</p>
        </div>
      </div>
    </>
  );
};
