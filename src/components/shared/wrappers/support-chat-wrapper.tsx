import supportIcon from "@/assets/svgs/support-chat-icon.svg";
import Image from "next/image";
export const SupportChatWrapper = () => {
  return (
    <div className="flex gap-3 mt-4">
      <div>
        <Image src={supportIcon} alt="" />
      </div>
      <div className="w-4/5">
        <p className="text-[#707070] font-work-sans-regular text-xs">
          Assex Market Support 10 Oct, 2025{" "}
          <span className="text-[#D80027]">14:10</span>
        </p>
        <div
          style={{ border: "0.35px solid #BEBEBE59" }}
          className="w-full mt-2 p-4 rounded-b-lg rounded-tr-lg bg-[#E9E9E9] text-[#111111]"
        >
          <p className=" font-work-sans-medium ">How can we help you?</p>
          <p className="font-work-sans-regular mt-1 ">
            {`Welcome! I’m your Assistant, always here to help. Just let me know
            what you need.`}
          </p>
        </div>
      </div>
    </div>
  );
};
