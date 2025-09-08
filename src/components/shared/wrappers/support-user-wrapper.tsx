import Image from "next/image";
import doubleCheckIcon from "@/assets/svgs/double-marked.svg";
import { SupportTicketMessage } from "@/types/support.types";
import moment from "moment";
import { Avatar } from "../avatar/avatar";

export const SupportUserWrapper = ({
  chat,
  userIcon,
}: {
  chat: SupportTicketMessage;
  userIcon?: string | null;
}) => {
  return (
    <div className="flex justify-end gap-3 mt-4">
      <div className="w-4/5">
        <p className="text-[#707070] text-end font-work-sans-regular text-xs">
          Me {moment(chat.createdAt).format("DD MMM, YYYY")}{" "}
          <span className="text-[#D80027]">
            {moment(chat.createdAt).format("HH:mm")}
          </span>
        </p>
        <div
          style={{ border: "0.35px solid #0DAE94" }}
          className="w-full mt-2 lg:p-4 p-2 rounded-b-lg rounded-tl-lg bg-[#E7F7F4] text-[#111111]"
        >
          <p className="font-work-sans-regular mt-1 lg:text-sm text-xs ">{chat.message}</p>
        </div>
        <div className="flex items-center  mt-1 justify-end">
          <Image className="w-[16px] h-[16px]" src={doubleCheckIcon} alt="" />
          <p className="text-xs text-[#34C659] font-work-sans-regular">Sent</p>
        </div>
      </div>
      <div>
        <Avatar avatar={userIcon ?? ""} />
      </div>
    </div>
  );
};
