"use client";

import { DashboardCardWrapper } from "@/components/shared/wrappers/dashboard-card-wrapper";
import { DropDownTextWrapper } from "@/components/shared/wrappers/drop-down-text";
import { DropDownList } from "@/components/ui/drop-down/dropdown-list";
import { PageHeader } from "@/components/ui/text/page-header";
import { DropDownListInterface } from "@/interfaces/ui-interfac";
import { Col, Row } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import smallCardIcon from "@/assets/svgs/dashboard-card-icon.svg";
import eyeOff from "@/assets/svgs/top-nav-eye-icon.svg";
import infoIcon from "@/assets/svgs/info-icon.svg";
import arrowRightGreen from "@/assets/svgs/arrow-right-green.svg";
import { useRouter } from "next/navigation";
import { TransactionSummary } from "@/components/shared/container/transaction-summary";
import { AnalyticsTable } from "@/components/ui/tables/analytics/analytics-table";

const Analytics = () => {
  const [statusSelected, setStatusSelected] = useState(
    "Standard: 8197834 ($0 USD)"
  );
  const statusDropDownList: DropDownListInterface[] = [
    { text: "Standard: 8197834 ($0 USD)", id: "" },
  ];
  const router = useRouter();

  return (
    <>
      <PageHeader text="Analytics" />
      <div>
        <div className="mt-4">
          <Row>
            <Col xs={4}>
              <p className="text-[#707070] text-xs font-work-sans-regular mb-1">
                Account
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
            </Col>
          </Row>
        </div>
        <div className="mt-4 flex flex-col lg:flex-row items-center gap-2">
          <DashboardCardWrapper>
            <div className="flex items-center gap-3">
              <span>
                <Image src={smallCardIcon} alt="" />
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 ">
                  <p className="text-[#404040] text-xs font-work-sans-medium">
                    Wallet balance
                  </p>
                  <span>
                    <Image src={eyeOff} alt="" />
                  </span>
                </div>
                <p className="text-[#111111] text-base lg:text-[20px] font-work-sans-semi-bold">
                  $ 0
                </p>
              </div>
            </div>
          </DashboardCardWrapper>
          <DashboardCardWrapper>
            <div className="flex items-center gap-3">
              <span>
                <Image src={smallCardIcon} alt="" />
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 ">
                  <p className="text-[#404040] text-xs font-work-sans-medium">
                    Total Revenue{" "}
                    <span className="text-[#707070] font-work-sans-regular">
                      (Live account)
                    </span>
                  </p>
                  <span>
                    <Image src={eyeOff} alt="" />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[#111111] font-work-sans-semi-bold text-base lg:text-[20px] ">
                    $ 0
                  </p>
                  <p className="text-[#34C659] text-xs font-work-sans-semi-bold">
                    +14%
                  </p>
                </div>
              </div>
            </div>
          </DashboardCardWrapper>
          <DashboardCardWrapper>
            <div className="flex items-center gap-3">
              <span>
                <Image src={smallCardIcon} alt="" />
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 ">
                  <p className="text-[#404040] text-xs font-work-sans-medium">
                    No. of trades
                  </p>
                  <span>
                    <Image src={eyeOff} alt="" />
                  </span>
                </div>
                <p className="text-[#111111] text-base lg:text-[20px]  font-work-sans-semi-bold">
                  2,023
                </p>
                <p className="text-[#34C659] text-xs font-work-sans-semi-bold">
                  Active: 5 I Closed: 2,018{" "}
                </p>
              </div>
            </div>
          </DashboardCardWrapper>
          <DashboardCardWrapper>
            <span className="absolute cursor-pointer top-4 right-4">
              <Image src={infoIcon} alt="" />
            </span>
            <div className="flex items-center gap-4 ">
              <span>
                <Image src={smallCardIcon} alt="" />
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 ">
                  <p className="text-[#404040] text-xs font-work-sans-medium">
                    Most Profitable Trade
                  </p>
                  <span>
                    <Image src={eyeOff} alt="" />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[#111111] text-base lg:text-[20px]  font-work-sans-semi-bold">
                    +$300,000
                  </p>
                  <p className="text-[#34C659] text-xs font-work-sans-semi-bold">
                    XAUUSD
                  </p>
                </div>
              </div>
            </div>
          </DashboardCardWrapper>
        </div>
        <div className="mt-4">
          <Row gutter={20}>
            <Col xs={16}>
              <div className="bg-white rounded-lg p-4 border border-[#BEBEBE59]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-work-sans-medium">Overview</p>
                    <div className=" flex items-center gap-6 mt-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#0DAE94] p-2 rounded-sm"></span>
                        <p className="text-[#5A607F] font-work-sans-regular">
                          Profit
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#F40E0E] p-2 rounded-sm"></span>
                        <p className="text-[#5A607F] font-work-sans-regular">
                          Loss
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="border border-[#05C16833] bg-[#05C16833] px-4 py-2 rounded-lg font-work-sans-regular text-xs text-[#14CA74]">
                    Showing last 7 days
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={8}>
              <div className="bg-white rounded-xl border border-[#BEBEBE33] p-4">
                <div className="flex items-center justify-between">
                  <p className="font-work-sans-medium text-base">
                    Recent Transactions
                  </p>
                  <div
                    onClick={() => {
                      router.push("/insight/transaction");
                    }}
                    className="text-xs flex cursor-pointer items-center gap-2 underline text-[#0DAE94] font-work-sans-regular"
                  >
                    <p>View all</p>
                    <Image src={arrowRightGreen} alt="" />
                  </div>
                </div>
                <div>
                  <TransactionSummary
                    amount={20000}
                    paymentMethod="korahq"
                    transactionStatus="success"
                    transactionType="Withdrawal"
                  />
                  <TransactionSummary
                    amount={20000}
                    paymentMethod="crypto"
                    transactionStatus="success"
                    transactionType="Deposit"
                  />
                  <TransactionSummary
                    amount={20000}
                    paymentMethod="paystack"
                    transactionStatus="failed"
                    transactionType="Deposit"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="mt-4">
          <p className="font-work-sans-medium text-base">Assex Market Update</p>
          <p className="text-[#707070] font-work-sans-regular">
            Latest market news, posted at the time of the trend.
          </p>
          <div className="mt-4">
            <AnalyticsTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
