"use client";

import { PageHeader } from "@/components/ui/text/page-header";
import React, { useState } from "react";
import checkedIcon from "@/assets/svgs/round-checked.svg";
import unCheckedIcon from "@/assets/svgs/round-unchecked.svg";
import Image from "next/image";
import walletDollarIcon from "@/assets/svgs/wallet-dollar-icon.svg";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { TransferInput } from "@/components/ui/inputs/transfer-input";
import dollarIcon from "@/assets/svgs/dollar-green.svg";
import { Button } from "@/components/ui/buttons/button";
import arrowRight from "@/assets/svgs/tabler-icon-rights.svg";
import { Col, Row } from "antd";
import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { VisibleOnMobile } from "@/components/shared/wrappers/visible-on-mobile";

const InternalTransfer = () => {
  const [activeOption, setActiveOption] = useState(-1);
  const [senderAccount, setSenderAccount] = useState(
    "Standard: 8197834 ($0 USD)"
  );
  return (
    <>
      <PageHeader text="Internal Transfer" />
      <div className="py-4">
        <p className="text-[#707070] mb-2 lg:text-sm text-xs font-work-sans-regular">
          Select option
        </p>
        <div className="flex lg:flex-row flex-col  items-center gap-2">
          <div
            onClick={() => {
              setActiveOption(0);
            }}
            className="bg-white  px-4 py-2 border cursor-pointer border-[#BEBEBE59] rounded-lg flex items-center gap-2"
          >
            <Image
              src={activeOption === 0 ? checkedIcon : unCheckedIcon}
              alt=""
            />
            <p
              className={`font-work-sans-regular text-xs lg:text-sm ${
                activeOption === 0 ? "text-[#202020]" : "text-[#707070]"
              } `}
            >
              Between your accounts
            </p>
          </div>
          <div
            onClick={() => {
              setActiveOption(1);
            }}
            className={
              "bg-white px-4 cursor-pointer py-2 border border-[#BEBEBE59] rounded-lg flex items-center gap-2"
            }
          >
            <Image
              src={activeOption === 1 ? checkedIcon : unCheckedIcon}
              alt=""
            />
            <p
              className={`font-work-sans-regular text-xs lg:text-sm ${
                activeOption === 1 ? "text-[#202020]" : "text-[#707070]"
              } `}
            >
              To another trader's account
            </p>
          </div>
        </div>
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
              $0
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg my-4 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-6 w-full mb-3 lg:mb-4">
            <SelectInput
              value={senderAccount}
              setValue={setSenderAccount}
              label="Sender Account"
            >
              <option></option>
            </SelectInput>
            <TransferInput label="Trader's Account" />
          </div>
          <div className="flex items-center flex-col lg:flex-row gap-3 lg:gap-6 w-full mb-4">
            <TransferInput label="Amount" icon={dollarIcon} />
            <TransferInput   label="Amount to be recieved" disabled greyBg />
          </div>
          <div className="my-4">
            <VisibleOnDesktop>
              <Button
                action={() => {}}
                loading={false}
                variant="green-bg"
                text="Send"
                icon={arrowRight}
                iconPosition="right"
              />
            </VisibleOnDesktop>
            <VisibleOnMobile>
              <Button
                action={() => {}}
                loading={false}
                variant="green-bg"
                text="Send"
                icon={arrowRight}
                iconPosition="right"
                fullWidth
              />
            </VisibleOnMobile>
          </div>
          <div className="py-4 px-8 border border-[#BEBEBE80] rounded-sm">
            <Row>
              <Col lg={12} xs={24}>
                <div className="lg:mb-0 mb-3">
                  <p className="font-work-sans-regular text-sm lg:text-lg">
                    {" "}
                    <span className=" text-[#404040]">
                      Min Commission:
                    </span>{" "}
                    <span className="text-[#111111]">$10.00</span>
                  </p>
                </div>
              </Col>
              <Col lg={12} xs={24}>
                <div>
                  <p className="font-work-sans-regular text-sm lg:text-lg">
                    {" "}
                    <span className=" text-[#404040] text-sm lg:text-lg">
                      Max Commission:
                    </span>{" "}
                    <span className="text-[#111111] text-sm lg:text-lg">
                      $10,000,000
                    </span>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternalTransfer;
