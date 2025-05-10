import Image from "next/image";
import checkIcon from "@/assets/svgs/tabler-icon-checkbox.svg";
import cancelIcon from "@/assets/svgs/tabler-icon-x.svg"

export const PasswordValidateText = ({
  validated,
  text
}: {
  validated: boolean;
  text: string;
}) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span>
        <Image src={validated ? checkIcon : cancelIcon} alt="" />
      </span>
      <p
        className={`text-xs ${
          validated ? "text-[#0DAE94]" : "text-[#707070]"
        }  font-work-sans-regular`}
      >
        {text}
      </p>
    </div>
  );
};
