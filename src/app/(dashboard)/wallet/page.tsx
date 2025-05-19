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
import { TransactionTable } from "@/components/ui/tables/transaction-table";

const Wallet = () => {
  const [statusSelected, setStatusSelected] = useState("All");
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
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center gap-4 ">
          <span>
            <Image src={walletDollarIcon} alt="" />
          </span>
          <div>
            <div className="flex items-center gap-2 ">
              <p className="text-[#202020] font-work-sans-regular">
                Total Balance
              </p>
              <div className="flex items-center">
                <div>
                  <Image src={arrowUp} alt="" />
                </div>
                <p className="text-[#34C659] text-[10px]">+4.8</p>
              </div>
            </div>
            <p className="text-3xl font-work-sans-semi-bold">$21,093.20</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
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
      </div>
      <div className="mt-8">
        <p className="text-xl font-work-sans-medium mb-12">
          Transaction History
        </p>
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
        <TransactionTable />
      </div>
    </>
  );
};

export default Wallet;
