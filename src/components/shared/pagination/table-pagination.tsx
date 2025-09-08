import previousIcon from "@/assets/svgs/pagination-previous.svg";
import nextIcon from "@/assets/svgs/pagination-next.svg";
import Image from "next/image";
import { PaginationData } from "@/interfaces/ui-interfac";

export const TablePagination = ({
  nextPage,
  prevPage,
  total,
  totalPages,
  handleNext,
  handlePrev,
  currentPage,
}: PaginationData) => {
  return (
    <div className="w-full flex my-6 justify-between">
      <div className="bg-white px-4 py-2 flex items-center gap-3 rounded-lg">
        <p className="text-[#111111] text-xs font-work-sans-regular">
          SHOWING {currentPage ?? 1} - {totalPages} OF
        </p>
        <span className="bg-[#0DAE94] p-2 px-4 font-work-sans-regular text-white text-xs rounded-lg">
          {total}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {prevPage && (
          <button
            onClick={() => {
              if (handlePrev) {
                handlePrev();
              }
            }}
            style={{ boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
            className="flex items-center cursor-pointer border border-[#BEBEBE] px-4 py-2 rounded-xl gap-2 text-xs font-work-sans-regular"
          >
            <Image src={previousIcon} alt="" />
            <p>Prev</p>
          </button>
        )}

        {nextPage && (
          <button
            onClick={() => {
              if (handleNext) {
                handleNext();
              }
            }}
            style={{ boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
            className="flex items-center cursor-pointer border border-[#BEBEBE] px-4 py-2 rounded-xl gap-2 text-xs font-work-sans-regular"
          >
            <p>Next</p>
            <Image src={nextIcon} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};
