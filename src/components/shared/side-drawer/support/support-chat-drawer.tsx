import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/buttons/button";
import { ModalBody } from "../../modal-wrapper/modal-body";
import { ModalHeader } from "../../modal-wrapper/modal-header";
import { SupportChatWrapper } from "../../wrappers/support-chat-wrapper";
import { SideDrawerWrapper } from "../side-drawer";
import { SupportUserWrapper } from "../../wrappers/support-user-wrapper";
import { useGetTicketMessage, useReply } from "@/hooks/queries/useSupport";
import { CardGroupLoader } from "@/components/loaders/card-loader";
import { useQueryClient } from "@tanstack/react-query";
import { SupportMessage } from "@/types/support.types";

export const SupportChatDrawer = ({
  handleClose,
  showChatModal,
  activeTicketId,
  ticket,
}: {
  handleClose: () => void;
  showChatModal: boolean;
  activeTicketId: string;
  ticket?: SupportMessage;
}) => {
  const queryClient = useQueryClient();
  const { data, isPending } = useGetTicketMessage(activeTicketId);
  const [message, setMessage] = useState("");
  const reply = useReply(() => {
    setMessage("");
    queryClient.invalidateQueries({ queryKey: ["get-ticket-message"] });
  });

  // Optional: auto-scroll to bottom when messages load/update
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [data, showChatModal]);

  return (
    <SideDrawerWrapper
      active={showChatModal}
      handleClose={handleClose}
      fullHeight
    >
      {/* Header (fixed at top of drawer) */}
      <ModalHeader headText="Assex Market Support" handleCancel={handleClose} />

      {/* Scrollable chat area */}
      <ModalBody>
        <div ref={listRef} className="flex flex-col gap-3">
          {isPending ? (
            <CardGroupLoader />
          ) : (
            data?.map((item: any) => (
              <div key={item.id}>
                {item.admin ? (
                  <SupportChatWrapper chat={item} />
                ) : (
                  <SupportUserWrapper chat={item} />
                )}
              </div>
            ))
          )}
        </div>
      </ModalBody>

      {/* Fixed reply bar at the bottom */}
      {ticket?.status !== "CLOSED" && (
        <div className="p-4 border-t border-[#BEBEBE] bg-white">
          <div className="space-y-2">
            <textarea
              value={message}
              placeholder="Write a message"
              className="border font-work-sans-regular p-4 border-[#BEBEBE] w-full rounded-lg resize-none h-24"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <div className="flex justify-end">
              <Button
                action={() => {
                  reply.mutate({
                    attachment: "",
                    message: message,
                    id: activeTicketId,
                    type: "USER",
                  });
                }}
                loading={reply.isPending}
                text="Send"
                variant="green-bg"
                buttonSmaller
              />
            </div>
          </div>
        </div>
      )}
    </SideDrawerWrapper>
  );
};
