"use client";

import { DropDownTextWrapper } from "@/components/shared/wrappers/drop-down-text";
import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { VisibleOnMobile } from "@/components/shared/wrappers/visible-on-mobile";
import { DropDownList } from "@/components/ui/drop-down/dropdown-list";
import { MobileInput } from "@/components/ui/inputs/mobile-table-input";
import { SearchInput } from "@/components/ui/inputs/search-input";
import { PageHeader } from "@/components/ui/text/page-header";
import { DropDownListInterface } from "@/interfaces/ui-interfac";
import React, { useState } from "react";
import Image from "next/image";
import mobileFilterIcon from "@/assets/svgs/mobile-filter.svg";
import { TransactionTable } from "@/components/ui/tables/transaction/transaction-table";
import { MobileTransactionTable } from "@/components/ui/tables/transaction/mobile-transaction-table";
import { useGetPayments } from "@/hooks/queries/usePayment";

const Transaction = () => {
  const [typeSelected, setTypeSelected] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [statusSelected, setStatusSelected] = useState("All");
  const { data } = useGetPayments();
  const statusDropDownList: DropDownListInterface[] = [
    { text: "All", id: "" },
    { text: "Successful", id: "" },
    { text: "Pending", id: "" },
    { text: "Failed", id: "" },
  ];

  const typeDropDownList: DropDownListInterface[] = [
    { text: "All", id: "" },
    { text: "Deposit", id: "" },
    { text: "Withdraw", id: "" },
  ];

  return (
    <>
      <PageHeader text="Transaction History" />
      <div className="my-4">
        <VisibleOnDesktop>
          <div className="flex justify-between items-end">
            <div>
              <SearchInput />
            </div>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-[#707070] text-xs font-work-sans-regular mb-1">
                  Type
                </p>
                <DropDownList
                  dropDownList={typeDropDownList}
                  selected={typeSelected}
                  setSelected={setTypeSelected}
                >
                  <div>
                    <DropDownTextWrapper filterSelected={statusSelected} />
                  </div>
                </DropDownList>
              </div>
              <div>
                <p className="text-[#707070] text-xs font-work-sans-regular mb-1">
                  Status
                </p>
                <DropDownList
                  dropDownList={statusDropDownList}
                  selected={statusSelected}
                  setSelected={setStatusSelected}
                >
                  <div>
                    <DropDownTextWrapper filterSelected={statusSelected} />
                  </div>
                </DropDownList>
              </div>
            </div>
          </div>
        </VisibleOnDesktop>
        <VisibleOnMobile>
          <div className="flex items-center gap-2 mt-4">
            <MobileInput />
            <div className="h-[40px]">
              <Image
                src={mobileFilterIcon}
                objectFit="cover"
                alt=""
                className="h-full"
              />
            </div>
          </div>
        </VisibleOnMobile>
        <div className="mt-4">
          <VisibleOnDesktop>
            <TransactionTable data={data} />
          </VisibleOnDesktop>
          <VisibleOnMobile>
            {data?.length ? (
              data.map((item, index) => {
                return (
                  <MobileTransactionTable
                    key={index}
                    activeIndex={activeIndex}
                    index={index}
                    setActiveIndex={setActiveIndex}
                    payment={item}
                  />
                );
              })
            ) : (
              <></>
            )}
          </VisibleOnMobile>
        </div>
      </div>
    </>
  );
};

export default Transaction;
