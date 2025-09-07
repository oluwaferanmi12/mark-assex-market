import supportIcon from "@/assets/svgs/support-chat-icon.svg";
import { SupportTicketMessage } from "@/types/support.types";
import moment from "moment";
import Image from "next/image";
export const SupportChatWrapper = ({
  chat,
}: {
  chat: SupportTicketMessage;
}) => {
  return (
    <div className="flex gap-3 mt-4">
      <div>
        <Image src={supportIcon} alt="" />
      </div>
      <div className="w-4/5">
        <p className="text-[#707070] font-work-sans-regular text-xs">
          Assex Market Support {moment(chat.createdAt).format("DD MMM, YYYY")}{" "}
          <span className="text-[#D80027]">
            {moment(chat.createdAt).format("HH:mm")}
          </span>
        </p>
        <div
          style={{ border: "0.35px solid #BEBEBE59" }}
          className="w-full mt-2 p-4 rounded-b-lg rounded-tr-lg bg-[#E9E9E9] text-[#111111]"
        >
          <p className="font-work-sans-regular mt-1 ">{chat.message}</p>
        </div>
      </div>
    </div>
  );
};
