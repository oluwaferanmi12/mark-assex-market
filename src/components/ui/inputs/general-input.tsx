import { InputErrorText } from "@/components/ui/text/input-error-text";
import { error } from "console";
import { Dispatch, SetStateAction, useState } from "react";
import eyeIcon from "@/assets/svgs/tabler-icon-eye.svg";
import eyeUnslash from "@/assets/svgs/tabler-icon-eye-unslash.svg";
import Image from "next/image";
import Link from "next/link";

export const GInput = ({
  label,
  placeholder,
  inputValue,
  setInputValue,
  errorState,
  type = "text",
  showForgotPassword,
}: {
  label: string;
  placeholder: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  errorState?: string;
  type?: "password" | "text";
  showForgotPassword?: boolean;
}) => {
  // This sort of only represents an input field that is a string
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between w-full m-0 p-0">
        <label className="font-work-sans-regular text-[#404040]">{label}</label>
        {showForgotPassword && (
          <Link href={"/forgot-password"}>
            <p className="text-[#004DF4] underline font-work-sans-regular">
              Forgot Password
            </p>
          </Link>
        )}
      </div>

      <div className="mt-1 relative">
        {type === "password" && (
          <span
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
            className="absolute cursor-pointer top-3 right-4 "
          >
            <Image src={showPassword ? eyeUnslash : eyeIcon} alt="" />
          </span>
        )}
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          className="w-full px-4 py-3 border border-[#BEBEBE59] bg-[#F3F4F4] rounded-lg placeholder:text-[#8A8A8A] placeholder:font-work-sans-regular outline-none font-work-sans-medium"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {errorState && (
          <InputErrorText text="Please select your country to continue" />
        )}
      </div>
    </div>
  );
};
