"use client";

import { Button } from "@/components/ui/buttons/button";
import { PageHeader } from "@/components/ui/text/page-header";
import React, { useState } from "react";
import arrowTop from "@/assets/svgs/arrow-up-right-white.svg";
import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { SearchInput } from "@/components/ui/inputs/search-input";
import { DropDownList } from "@/components/ui/drop-down/dropdown-list";
import { DropDownTextWrapper } from "@/components/shared/wrappers/drop-down-text";
import { DropDownListInterface } from "@/interfaces/ui-interfac";
import { VisibleOnMobile } from "@/components/shared/wrappers/visible-on-mobile";
import { MobileInput } from "@/components/ui/inputs/mobile-table-input";
import Image from "next/image";
import mobileFilterIcon from "@/assets/svgs/mobile-filter.svg";
import { TransactionTable } from "@/components/ui/tables/transaction/transaction-table";
import { MobileTransactionTable } from "@/components/ui/tables/transaction/mobile-transaction-table";

function Analytics() {
  const [typeSelected, setTypeSelected] = useState("All");
  const [statusSelected, setStatusSelected] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
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
      <PageHeader text="Account #81978" />
      <div className="mt-4 bg-white border-[0.5px] border-[#BEBEBE80] p-4 rounded-lg">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-12">
            <div className="flex flex-col gap-4">
              <div className="bg-[#34C65933] rounded-lg">
                <p className="text-[#34C659] text-center text-sm font-work-sans-regular p-2 ">
                  Partner Account
                </p>
              </div>
              <p className="font-work-sans-semi-bold text-3xl">$120,000 USD</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-[#F1F5F9] rounded-lg">
                <p className="text-[#111111] text-center text-sm font-work-sans-regular p-2 ">
                  Account ID
                </p>
              </div>
              <p className="font-work-sans-regular text-[#111111] text-lg text-center">
                481978
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-[#F1F5F9] rounded-lg">
                <p className="text-[#0DAE94] text-center text-sm font-work-sans-regular p-2 ">
                  Withdrawal Balance
                </p>
              </div>
              <p className="font-work-sans-regular text-[#111111] text-lg text-center">
                481978
              </p>
            </div>
          </div>
          <div>
            <Button
              icon={arrowTop}
              iconPosition={"left"}
              action={() => {}}
              variant="green-bg"
              loading={false}
              text="Withdraw"
              buttonSmaller
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
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
      </div>
      <div className="mt-4">
        <VisibleOnDesktop>
          <TransactionTable />
        </VisibleOnDesktop>
        <VisibleOnMobile>
          <MobileTransactionTable
            activeIndex={activeIndex}
            index={0}
            setActiveIndex={setActiveIndex}
          />
          <MobileTransactionTable
            activeIndex={activeIndex}
            index={1}
            setActiveIndex={setActiveIndex}
          />
          <MobileTransactionTable
            activeIndex={activeIndex}
            index={2}
            setActiveIndex={setActiveIndex}
          />
          <MobileTransactionTable
            activeIndex={activeIndex}
            index={3}
            setActiveIndex={setActiveIndex}
          />
          <MobileTransactionTable
            activeIndex={activeIndex}
            index={4}
            setActiveIndex={setActiveIndex}
          />
        </VisibleOnMobile>
      </div>
    </>
  );
}

export default Analytics;
