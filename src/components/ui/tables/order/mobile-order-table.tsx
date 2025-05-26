import { TableStatus } from "@/components/ui/status/table-status";
import arrowDown from "@/assets/svgs/arrow-down-black.svg";
import Image from "next/image";
import { DateViewer } from "@/components/shared/wrappers/date-viewer";

export const MobileOrderTable = ({
  index,
  activeIndex,
  setActiveIndex,
}: {
  index: number;
  activeIndex: number;
  setActiveIndex: (val: number) => void;
}) => {
  return (
    <div
      onClick={() => {
        setActiveIndex(index);
      }}
      className="border border-[#BEBEBE80] bg-white rounded-lg mb-4"
    >
      <div className="flex border-b border-[#BEBEBE80] justify-between p-4">
        <div>
          <p className="font-work-sans-medium">EUR/USD</p>
          <p className="text-xs font-work-sans-regular text-[#707070]">Buy</p>
        </div>
        <div className="flex items-center gap-2">
          <TableStatus variant="Success" text="Executed" />
          <Image src={arrowDown} alt="" />
        </div>
      </div>

      {activeIndex === index && (
        <div className="p-4">
          <TableRow leftText="Currency Pair" rightText="EUR/USD" />
          <TableRow leftText="Type" rightText="BUY" />
          <TableRow leftText="Order Type" rightText="Market" />
          <TableRow leftText="Profit/Loss" rightText="+12.54" />
          <TableRow leftText="Date" type="date" rightText="+12.54" last />
        </div>
      )}
    </div>
  );
};

const TableRow = ({
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
        <DateViewer />
      ) : (
        <p className="text-[#111111] font-work-sans-regular">{rightText}</p>
      )}
    </div>
  );
};
