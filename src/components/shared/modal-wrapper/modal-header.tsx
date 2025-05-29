import cancelIcon from "@/assets/svgs/modal-x-icon.svg";
import Image from "next/image";

export const ModalHeader = ({
  headText,
  handleCancel,
  iconType,
}: {
  headText: string;
  handleCancel: () => void;
  iconType?: boolean;
}) => {
  return (
    <div className="bg-white flex items-center justify-between rounded-t-xl border-b border-[#BEBEBE59] p-4 py-2">
      {iconType ? (
        <Image src={headText} alt="" />
      ) : (
        <p className="text-[#111111] font-work-sans-medium text-xl">
          {headText}
        </p>
      )}

      <span className="cursor-pointer" onClick={handleCancel}>
        <Image src={cancelIcon} alt="" />
      </span>
    </div>
  );
};
