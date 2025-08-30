import { TableStatus } from "@/components/ui/status/table-status";
import arrowDown from "@/assets/svgs/arrow-down-black.svg";
import Image from "next/image";
import { DateViewer } from "@/components/shared/wrappers/date-viewer";
import { AnimatePresence } from "framer-motion";
import { FadeIn } from "@/animation/fade-in";
import arrowRight from "@/assets/svgs/arrow-right-icon.svg";
import { AccountHistory } from "@/types";
import { MoneyFormat } from "@/utils/money-format";

export const MobileOrderTable = ({
  index,
  activeIndex,
  setActiveIndex,
  history,
}: {
  index: number;
  activeIndex: number;
  setActiveIndex: (val: number) => void;
  history: AccountHistory;
}) => {
  return (
    <div
      onClick={() => {
        if (activeIndex === index) {
          setActiveIndex(-1);
          return;
        }
        setActiveIndex(index);
      }}
      className="border border-[#BEBEBE80] bg-white rounded-lg mb-4"
    >
      <div className="flex border-b border-[#BEBEBE80] justify-between p-4">
        <div>
          <p className="font-work-sans-medium">{history.symbol}</p>
          <p className="text-xs font-work-sans-regular text-[#707070]">
            {history.type}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <TableStatus variant="SUCCESS" text="Executed" />
          <Image src={activeIndex === index ? arrowDown : arrowRight} alt="" />
        </div>
      </div>
      <AnimatePresence>
        {activeIndex === index && (
          <FadeIn>
            <div className="p-4">
              <TableRow leftText="Currency Pair" rightText={history.symbol} />
              <TableRow leftText="Type" rightText={history.type} />
              <TableRow leftText="Order ID" rightText={history.orderId} />
              <TableRow
                leftText="Profit/Loss"
                rightText={
                  (history.profit >= 0 ? "+" : "-") +
                  MoneyFormat(history.profit)
                }
              />
              <TableRow
                leftText="Date"
                type="date"
                rightText={history.date}
                last
              />
            </div>
          </FadeIn>
        )}
      </AnimatePresence>
    </div>
  );
};

export const TableRow = ({
  leftText,
  rightText,
  type = "text",
  last,
}: {
  leftText: string;
  rightText: string;
  type?: "date" | "text";
  last?: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-between py-2 ${
        !last && "border-b border-dashed border-[#BEBEBE80]"
      } `}
    >
      <p className="text-[#404040] font-work-sans-regular">{leftText}</p>
      {type === "date" ? (
        <DateViewer date={rightText} />
      ) : (
        <p className="text-[#111111] font-work-sans-regular">{rightText}</p>
      )}
    </div>
  );
};
