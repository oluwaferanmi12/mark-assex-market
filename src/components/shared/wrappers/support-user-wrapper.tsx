import userIcon from "@/assets/svgs/user-chat-icon.svg"
import Image from "next/image";
import doubleCheckIcon from "@/assets/svgs/double-marked.svg"


export const SupportUserWrapper = () => {
    return (
      <div className="flex justify-end gap-3 mt-4">
        <div className="w-4/5">
          <p className="text-[#707070] text-end font-work-sans-regular text-xs">
            Me 10 Oct, 2025 <span className="text-[#D80027]">14:10</span>
          </p>
          <div
            style={{ border: "0.35px solid #0DAE94" }}
            className="w-full mt-2 p-4 rounded-b-lg rounded-tl-lg bg-[#E7F7F4] text-[#111111]"
          >
            <p className="font-work-sans-regular mt-1 ">
              Unable to withdraw funds even when my balance is enough
            </p>
          </div>
          <div className="flex items-center  mt-1 justify-end">
            <Image className="w-[16px] h-[16px]" src={doubleCheckIcon} alt="" />
            <p className="text-xs text-[#34C659] font-work-sans-regular">Sent</p>
          </div>
        </div>
        <div>
          <Image src={userIcon} alt="" />
        </div>
      </div>
    );
}