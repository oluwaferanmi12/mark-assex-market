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
  type = "button",
  buttonSmaller,
  textBolder,
  buttonDisabled,
}: ButtonInterface) => {
  return (
    <button
      onClick={action}
      type={type}
      disabled={loading || buttonDisabled}
      className={`${
        variant === "green-bg"
          ? "bg-[#0DAE94] text-white"
          : variant === "grey-bg"
          ? "bg-[#F3F4F4] text-[#202020] border border-[#BEBEBE80]"
          : variant === "plain"
          ? "text-[#0DAE94] shadow-[0px_4px_6px_#4444440D]"
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
          : variant === "grey-border"
          ? "border border-[#BEBEBE] bg-[#FFFFFF59] text-[#202020]"
          : variant === "transparent"
          ? "text-[#202020]"
          : ""
      } ${fullWidth && "w-full"} ${
        fullRounded ? "rounded-full" : "rounded-md"
      } ${
        buttonSmaller ? "py-2 px-4 text-xs" : "px-4 py-3 text-xs lg:text-sm"
      } ${
        textBolder ? "font-work-sans-medium" : "font-work-sans-regular "
      } flex  items-center gap-1 justify-center  cursor-pointer  whitespace-nowrap  ${
        (loading || buttonDisabled) && "opacity-20"
      }  `}
    >
      {icon && iconPosition === "left" && (
        <div>
          <Image src={icon} alt="" />
        </div>
      )}

      <p>{loading ? "Loading..." : text}</p>

      {icon && iconPosition === "right" && (
        <div>
          <Image src={icon} alt="" />
        </div>
      )}
    </button>
  );
};
