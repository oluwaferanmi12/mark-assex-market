import { TableStatus } from "@/components/ui/status/table-status";
import { TableRow } from "@/components/ui/tables/order/mobile-order-table";
import Image from "next/image";
import arrowDown from "@/assets/svgs/arrow-down-black.svg";
import arrowDownGreen from "@/assets/svgs/arrow-down-green.svg";
import arrowUpGreen from "@/assets/svgs/arrowUpGreen.svg";
import { useState } from "react";
import { TransactionErrorWrapper } from "@/components/shared/wrappers/transaction-error-wrapper";
import { AnimatePresence } from "framer-motion";
import { FadeIn } from "@/animation/fade-in";
import arrowRight from "@/assets/svgs/arrow-right-icon.svg";
import { Payment } from "@/types";
import { MoneyFormat } from "@/utils/money-format";
import { TableDate } from "@/utils/date-formatter";
import { SupportMessage } from "@/types/support.types";

export const MobileSupportTable = ({
  index,
  activeIndex,
  setActiveIndex,
  message,
}: {
  index: number;
  activeIndex: number;
  setActiveIndex: (val: number) => void;
  message: SupportMessage;
}) => {
  const [showReason, setShowReason] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          if (index === activeIndex) {
            setActiveIndex(-1);
            return;
          }
          setActiveIndex(index);
        }}
        className="border  border-[#BEBEBE80] bg-white rounded-lg mb-4"
      >
        <div className="flex border-b border-[#BEBEBE80] justify-between p-4">
          <div>
            <p className="font-work-sans-medium">{message.issue}</p>
            <p className="text-xs font-work-sans-regular text-[#707070]">
              {TableDate(message.createdAt)}{" "}
              {/* <span className="text-[#D80027]">20:12</span> */}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TableStatus
              variant={message.status === "OPEN" ? "PENDING" : "SUCCESS"}
              text={message.status}
            />
            <Image
              src={activeIndex === index ? arrowDown : arrowRight}
              alt=""
            />
          </div>
        </div>
        <AnimatePresence>
          {activeIndex === index && (
            <FadeIn>
              <div className="p-4">
                <TableRow leftText="ID" rightText={message.ticketNumber} />
                <TableRow leftText="Title" rightText={message.issue} />
                <TableRow leftText="Status" rightText={message.status} />
                <TableRow leftText="Status" rightText={message.status} />

                <TableRow
                  leftText="Date"
                  type="date"
                  rightText={message.createdAt}
                  last
                />
              </div>
            </FadeIn>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
