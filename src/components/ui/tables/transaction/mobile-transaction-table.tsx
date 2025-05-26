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

export const MobileTransactionTable = ({
  index,
  activeIndex,
  setActiveIndex,
}: {
  index: number;
  activeIndex: number;
  setActiveIndex: (val: number) => void;
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
            <p className="font-work-sans-medium">$20,000</p>
            <p className="text-xs font-work-sans-regular text-[#707070]">
              10 Oct, 2025 <span className="text-[#D80027]">20:12</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TableStatus variant="Success" text="Successful" />
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
                <TableRow leftText="ID" rightText="1274597" />
                <TableRow leftText="Amount" rightText="$ 20,000" />
                <TableRow leftText="Type" rightText="Deposit" />
                <TableRow leftText="Payment method" rightText="korahq" />
                <TableRow leftText="Date" type="date" rightText="+12.54" last />
              </div>
              <div
                onClick={() => setShowReason((prev) => !prev)}
                className="flex items-center justify-center gap-2 cursor-pointer mb-4"
              >
                <p className="text-[#0DAE94] font-work-sans-regular">
                  View reason
                </p>
                <div>
                  <Image
                    src={showReason ? arrowUpGreen : arrowDownGreen}
                    alt=""
                  />
                </div>
              </div>
              <div className="px-4 pb-4">
                <TransactionErrorWrapper active={showReason}>
                  <div className="text-[#202020] text-xs">
                    <span className="font-work-sans-regular">
                      Insufficient Funds:{" "}
                    </span>
                    <span className="font-work-sans-light">
                      here wasn’t enough money in your account to complete the
                      transaction.
                    </span>
                  </div>
                </TransactionErrorWrapper>
              </div>
            </FadeIn>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
