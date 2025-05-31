"use client";
import { PageHeader } from "@/components/ui/text/page-header";
import walletDollarIcon from "@/assets/svgs/wallet-dollar-icon.svg";
import React, { useState } from "react";
import Image from "next/image";
import arrowUp from "@/assets/svgs/arrow-multiple-up.svg";
import { Button } from "@/components/ui/buttons/button";
import arrowSlantDown from "@/assets/svgs/arrow-down-left-white.svg";
import arrowSlantUp from "@/assets/svgs/arrow-up-right-white.svg";
import internalTransferIcon from "@/assets/svgs/nav-transfer-active.svg";
import { SearchInput } from "@/components/ui/inputs/search-input";
import { DropDownList } from "@/components/ui/drop-down/dropdown-list";
import { DropDownListInterface } from "@/interfaces/ui-interfac";
import { DropDownTextWrapper } from "@/components/shared/wrappers/drop-down-text";
import { TransactionTable } from "@/components/ui/tables/transaction/transaction-table";
import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { VisibleOnMobile } from "@/components/shared/wrappers/visible-on-mobile";
import { MobileInput } from "@/components/ui/inputs/mobile-table-input";
import mobileFilterIcon from "@/assets/svgs/mobile-filter.svg";
import { MobileTransactionTable } from "@/components/ui/tables/transaction/mobile-transaction-table";

const Wallet = () => {
  const [statusSelected, setStatusSelected] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [typeSelected, setTypeSelected] = useState("All");
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
      <PageHeader text="Wallet" />
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-8">
        <div className="flex items-center gap-4 mb-4 lg:mb-0 ">
          <span>
            <Image src={walletDollarIcon} alt="" />
          </span>
          <div>
            <div className="flex items-center gap-2 ">
              <p className="text-[#202020] text-xs lg:text-sm font-work-sans-regular">
                Total Balance
              </p>
              <div className="flex items-center">
                <div>
                  <Image src={arrowUp} alt="" />
                </div>
              </div>
            </div>
            <p className="lg:text-3xl text-xl font-work-sans-semi-bold">
              $21,093.20
            </p>
          </div>
        </div>
        <VisibleOnDesktop>
          <div className="lg:flex items-center gap-3">
            <Button
              text="Deposit"
              loading={false}
              variant="green-bg"
              fullRounded
              icon={arrowSlantDown}
              action={() => {}}
            />
            <Button
              text="Withdraw"
              loading={false}
              variant="green-bg"
              fullRounded
              action={() => {}}
              icon={arrowSlantUp}
            />

            <Button
              text="Internal Transfer"
              loading={false}
              variant="green-bg-faded"
              fullRounded
              action={() => {}}
              icon={internalTransferIcon}
            />
          </div>
        </VisibleOnDesktop>
        <VisibleOnMobile>
          <div className="w-full flex items-center gap-4 mb-3">
            <Button
              text="Deposit"
              loading={false}
              variant="green-bg"
              icon={arrowSlantDown}
              action={() => {}}
              fullWidth
            />
            <Button
              text="Withdraw"
              loading={false}
              variant="green-bg"
              action={() => {}}
              fullWidth
              icon={arrowSlantUp}
            />
          </div>

          <Button
            text="Internal Transfer"
            loading={false}
            variant="green-bg-faded"
            fullWidth
            action={() => {}}
            icon={internalTransferIcon}
          />
        </VisibleOnMobile>
      </div>

      <div className="mt-8">
        <p className="lg:text-xl text-lg font-work-sans-medium lg:mb-12">
          Transaction History
        </p>
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
        <VisibleOnDesktop>
          <TransactionTable />
        </VisibleOnDesktop>
        <VisibleOnMobile>
          <div className="my-4">
            <MobileTransactionTable
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              index={0}
            />
            <MobileTransactionTable
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              index={1}
            />
          </div>
        </VisibleOnMobile>
      </div>
    </>
  );
};

export default Wallet;
