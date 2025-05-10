import { InputErrorText } from "@/components/ui/text/input-error-text";
import { error } from "console";
import { Dispatch, SetStateAction, useState } from "react";
import eyeIcon from "@/assets/svgs/tabler-icon-eye.svg";
import Image from "next/image";

export const GInput = ({
  label,
  placeholder,
  inputValue,
  setInputValue,
  errorState,
  type = "text",
}: {
  label: string;
  placeholder: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  errorState?: string;
  type?: "password" | "text";
}) => {
  // This sort of only represents an input field that is a string
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-4">
      <label className="w-full font-work-sans-regular text-[#404040] pb-4">
        {label}
      </label>
      <div className="mt-1 relative">
        {type === "password" && (
          <span
            onClick={() => {
              setShowPassword(prev => !prev );
            }}
            className="absolute cursor-pointer top-3 right-4 "
          >
            <Image src={eyeIcon} alt="" />
          </span>
        )}
        <input
          type={type === "password" && !showPassword ? "password" : 'text'}
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
