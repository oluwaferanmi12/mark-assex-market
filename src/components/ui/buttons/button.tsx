import { ButtonInterface } from "@/interfaces/ui-interfac";
import Image from "next/image";

export const Button = ({
  text,
  action,
  icon,
  iconPosition = "left",
  loading,
  variant,
  fullRounded,
  fullWidth,
  type="button"
  
}: ButtonInterface) => {
  return (
    <button
    type={type}
      disabled={loading}
      className={`${
        variant === "green-bg"
          ? "bg-[#0DAE94] text-white"
          : variant === "grey-bg"
          ? "bg-[#F3F4F4] text-[#202020] border border-[#BEBEBE80]"
          : variant === "plain"
          ? "text-[#0DAE94]"
          : variant === "blue-bg"
          ? "bg-[#1F0D3F] text-white"
          : variant === "white-bg"
          ? "text-[#0DAE94] bg-white"
          : variant === "green-faded-border"
          ? "border border-[#0DAE94] text-[#0DAE94] bg-[#E7F7F4]"
          : variant === "red-faded-border"
          ? "border border-[#F40E0E80] bg-[#F40E0E0F] text-[#F40E0E]"
          : variant === "red-bg"
          ? "bg-[#D92D20] text-[#FEFEFE]"
          : variant === "green-bg-faded"
          ? "bg-[#0DAE9433] text-[#0DAE94]"
          : ""
      } ${fullWidth && "w-full"} ${
        fullRounded ? "rounded-full" : "rounded-md"
      } font-work-sans-regular flex items-center gap-2 justify-center  cursor-pointer  px-4 py-3`}
    >
      {icon && iconPosition === "left" && (
        <div>
          <Image src={icon} alt="" />
        </div>
      )}

      <p>{text}</p>

      {icon && iconPosition === "right" && (
        <div>
          <Image src={icon} alt="" />
        </div>
      )}
    </button>
  );
};
