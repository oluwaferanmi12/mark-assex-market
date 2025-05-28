"use client";

import { SelectInput } from "@/components/ui/inputs/select-input";
import { TransferInput } from "@/components/ui/inputs/transfer-input";
import { PageHeader } from "@/components/ui/text/page-header";
import { Col, Row } from "antd";
import React, { useState } from "react";
import walletDollarIcon from "@/assets/svgs/wallet-dollar-icon.svg";
import Image from "next/image";
import arrowRight from "@/assets/svgs/tabler-icon-rights.svg";
import { Button } from "@/components/ui/buttons/button";
import dollarIcon from "@/assets/svgs/dollar-green.svg";
import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { VisibleOnMobile } from "@/components/shared/wrappers/visible-on-mobile";

const Withdrawal = () => {
  const [accountType, setAccountType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  return (
    <>
      <PageHeader text="Withdrawal" />
      <div className="my-4">
        <Row>
          <Col xs={18} lg={6}>
            <SelectInput
              value={accountType}
              setValue={setAccountType}
              label="From Account"
            >
              <option></option>
            </SelectInput>
          </Col>
        </Row>
      </div>
      <div>
        <div className="flex items-center gap-4 my-4 lg:mb-0 ">
          <span>
            <Image src={walletDollarIcon} alt="" />
          </span>
          <div>
            <div className="flex items-center gap-2 ">
              <p className="text-[#202020] text-xs lg:text-sm font-work-sans-regular">
                Wallet balance
              </p>
            </div>
            <p className="lg:text-3xl text-xl font-work-sans-semi-bold">
              $21,093.20
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg lg:my-4 my-2 w-full">
        <div className="flex items-center gap-2 lg:gap-6 w-full lg:mb-4 mb-2">
          <SelectInput
            value={paymentMethod}
            setValue={setPaymentMethod}
            label="Payment method"
          >
            <option></option>
          </SelectInput>
          <div className="w-full opacity-0 hidden lg:block">
            <TransferInput label="Trader's Account" />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-6 w-full mb-2 lg:mb-4">
          <TransferInput label="Account number" />
          <SelectInput
            value={paymentMethod}
            setValue={setPaymentMethod}
            label="Bank"
          >
            <option></option>
          </SelectInput>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-6 w-full mb-4">
          <TransferInput label="Amount" icon={dollarIcon} />
          <TransferInput label="Amount to be recieved" greyBg />
        </div>
        <VisibleOnDesktop>
          <div className="my-4">
            <Button
              action={() => {}}
              loading={false}
              variant="green-bg"
              text="Proceed"
              icon={arrowRight}
              iconPosition="right"
            />
          </div>
        </VisibleOnDesktop>
        <VisibleOnMobile>
          <div className="my-4">
            <Button
              action={() => {}}
              loading={false}
              variant="green-bg"
              text="Proceed"
              icon={arrowRight}
              iconPosition="right"
              fullWidth
            />
          </div>
        </VisibleOnMobile>

        <div className="py-4 px-8 border border-[#BEBEBE80] rounded-sm">
          <Row>
            <Col xs={24} lg={12}>
              <div className="lg:mb-0 mb-3">
                <p className="font-work-sans-regular text-sm lg:text-lg">
                  {" "}
                  <span className=" text-[#404040]">Min Commission:</span>{" "}
                  <span className="text-[#111111]">$10.00</span>
                </p>
              </div>
              <div className="lg:mb-0 mb-3">
                <p className="font-work-sans-regular text-sm lg:text-lg">
                  {" "}
                  <span className=" text-[#404040]">Max Commission:</span>{" "}
                  <span className="text-[#111111]">$10,000,000</span>
                </p>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="lg:mb-0 mb-3">
                <p className="font-work-sans-regular text-sm lg:text-lg">
                  {" "}
                  <span className=" text-[#404040]">Fee:</span>{" "}
                  <span className="text-[#111111]">$0.00</span>
                </p>
              </div>
              <div className="lg:mb-0 mb-3">
                <p className="font-work-sans-regular text-sm lg:text-lg">
                  {" "}
                  <span className=" text-[#404040]">
                    Avg. Payment Time:
                  </span>{" "}
                  <span className="text-[#111111]">$0.00</span>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
