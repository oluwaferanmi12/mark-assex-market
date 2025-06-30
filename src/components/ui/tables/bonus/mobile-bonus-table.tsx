import { FadeIn } from "@/animation/fade-in";
import { TableStatus } from "@/components/ui/status/table-status";
import { TableRow } from "@/components/ui/tables/order/mobile-order-table";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import arrowRight from "@/assets/svgs/arrow-right-icon.svg";
import arrowDown from "@/assets/svgs/arrow-down-black.svg";


export const MobileBonusTable = ({
  index,
  activeIndex,
  setActiveIndex,
}: {
  index: number;
  activeIndex: number;
  setActiveIndex: (val: number) => void;
}) => {
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
             
            </FadeIn>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
