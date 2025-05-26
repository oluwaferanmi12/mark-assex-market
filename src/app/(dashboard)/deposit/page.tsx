"use client";

import { DepositWrapper } from "@/components/shared/wrappers/deposit-wrapper";
import { DropDownTextWrapper } from "@/components/shared/wrappers/drop-down-text";
import { DropDownList } from "@/components/ui/drop-down/dropdown-list";
import { PageHeader } from "@/components/ui/text/page-header";
import { DropDownListInterface } from "@/interfaces/ui-interfac";
import { Col, Row } from "antd";
import React, { useState } from "react";
import koraHq from "@/assets/svgs/korahq.svg";
import paystack from "@/assets/svgs/paystack.svg";
import crypto from "@/assets/svgs/deposit-crypto.svg";
import cautionIcon from "@/assets/svgs/caution-icon.svg";
import Image from "next/image";
import { Button } from "@/components/ui/buttons/button";
import arrowRightMultiple from "@/assets/svgs/chevron-right-white.svg";
import dollarGreen from "@/assets/svgs/dollar-green.svg";
import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import bigXIcon from "@/assets/svgs/moda-big-x-icon.svg";

const Deposit = () => {
  const [statusSelected, setStatusSelected] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [verificationModal, setVerificationModal] = useState(false);
  const statusDropDownList: DropDownListInterface[] = [
    { text: "All", id: "" },
    { text: "Successful", id: "" },
    { text: "Pending", id: "" },
    { text: "Failed", id: "" },
  ];

  const depositObject = [
    { text: "Crypto Chilll", icon: crypto },
    { text: "Korahq", icon: koraHq },
    { text: "Paystack", icon: paystack },
  ];

  return (
    <React.Fragment>
      <ModalContainer
        active={verificationModal}
        handleClose={() => {
          setVerificationModal(false);
        }}
      >
        <div className="flex flex-col items-center py-4 px-8 justify-center">
          <div>
            <Image src={bigXIcon} alt="" />
          </div>
          <p className="text-[#202020] font-work-sans-semi-bold text-xl mb-3">
            Verification required
          </p>
          <p className="text-center text-[#707070] mb-4 font-work-sans-regular">
            To make a deposit, your account needs to be verified Please complete
            the verification process to proceed.
          </p>
          <Button
            action={() => {}}
            loading={false}
            text="Verify Account"
            variant="green-bg"
            fullWidth
          />
        </div>
      </ModalContainer>
      <PageHeader text="Deposit" />
      <div className="mt-4">
        <Row>
          <Col xs={4}>
            <p className="text-[#707070] text-xs font-work-sans-regular mb-1">
              My Account
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
      <div className="mt-8 flex gap-4">
        {depositObject.map((item, index) => {
          return (
            <DepositWrapper
              setActiveIndex={setActiveIndex}
              index={index}
              text={item.text}
              active={index === activeIndex}
              icon={item.icon}
            />
          );
        })}
      </div>
      {!showForm ? (
        <div>
          <div className="bg-white rounded-lg mt-6 p-4">
            <div className="bg-[#EE95071A] p-4 flex items-center gap-3 rounded-lg">
              <Image src={cautionIcon} alt="" />
              <div>
                <span className="font-work-sans-medium text-sm">
                  Important Information:{" "}
                </span>
                <span className="font-work-sans-regular text-sm">
                  Depositing with Crypto Chill? Here’s What You Need to Know
                </span>
              </div>
            </div>
            <div className="my-6 text-base">
              <span className="font-work-sans-medium">Note:</span>{" "}
              <span className="font-work-sans-regular">
                AssexMarkets Global Limited does not impose or charge any fees
                for deposits. However, you are solely responsible for any
                applicable network or blockchain processing fees.
              </span>
            </div>
            <div className="mb-4 text-base">
              <p className="font-work-sans-medium">
                1. Use the Correct Wallet Address:
              </p>
              <p className="font-work-sans-regular">
                {`Always double-check that you’re using the correct wallet address. Sending funds to an incorrect address may result in permanent loss.`}
              </p>
            </div>
            <div className="mb-4 text-base">
              <p className="font-work-sans-medium">
                {"2. "}Ensure Network Compatibility:
              </p>
              <p className="font-work-sans-regular">
                {`Only send Crypto from platforms or wallets
      that support Crypto transactions. Unsupported networks may lead to failed
      or lost deposits`}
              </p>
            </div>
            <div className="mb-4 text-base">
              <p className="font-work-sans-medium">
                3. Verify the Minimum Deposit Amount:
              </p>
              <p className="font-work-sans-regular">
                {`Make sure your deposit meets the
      platform’s required minimum. Some exchanges may enforce specific limits
      for Crypto deposits.`}
              </p>
            </div>

            <div className="mb-4 text-base">
              <p className="font-work-sans-medium">
                4. Track Transaction Confirmations:
              </p>
              <p className="font-work-sans-regular">
                After initiating your deposit, monitor the blockchain for
                confirmation. Confirmation times can vary based on network
                activity and congestion.
              </p>
            </div>

            <div className="mb-4 text-base">
              <p className="font-work-sans-medium">
                5. Keep a Record of Your Transaction:
              </p>
              <p className="font-work-sans-regular">
                {`Save details such as the wallet
      address, transaction ID, amount, and timestamp. These records are vital
      for tracking your deposit and resolving any issues that may arise.`}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <Button
              iconPosition="right"
              icon={arrowRightMultiple}
              loading={false}
              action={() => {
                setShowForm(true);
              }}
              text="Proceed"
              variant="green-bg"
            />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 mt-6">
          <div>
            <Row className="mb-4">
              <Col xs={12}>
                <div>
                  <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                    Currency
                  </p>
                  <select
                    style={{
                      boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                    }}
                    className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                  >
                    <option>Select Currency</option>
                  </select>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div>
                  <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                    Amount
                  </p>
                  <div>
                    <span className="absolute flex items-center justify-center top-8 right-4 bg-[#E7F7F4] rounded-lg border border-#0DAE94[] py-1 px-2">
                      <Image src={dollarGreen} alt="" />
                    </span>

                    <input
                      placeholder="Enter amount"
                      style={{
                        boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                      }}
                      className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <div className="my-4">
              <Button
                action={() => {
                  setVerificationModal(true);
                }}
                loading={false}
                text="Proceed"
                variant="green-bg"
                icon={arrowRightMultiple}
                iconPosition="right"
              />
            </div>
            <div className="bg-white border border-[#BEBEBE80] p-4 rounded-sm">
              <Row>
                <Col xs={12}>
                  <div className="flex items-center gap-4 mb-4 text-lg font-work-sans-regular">
                    <p className="text-[#404040]">Min Deposit:</p>
                    <p className="text-[#111111]">$10.00</p>
                  </div>
                  <div className="flex items-center gap-4 mb-4 text-lg font-work-sans-regular">
                    <p className="text-[#404040]">Max Deposit:</p>
                    <p className="text-[#111111]">$50,000,000.00</p>
                  </div>
                </Col>
                <Col xs={12}>
                  <div className="flex items-center gap-4 mb-4 text-lg font-work-sans-regular">
                    <p className="text-[#404040]">Commission:</p>
                    <p className="text-[#111111]">From $0.00 to $01.00</p>
                  </div>
                  <div className="flex items-center gap-4 mb-4 text-lg font-work-sans-regular">
                    <p className="text-[#404040]">Deposit Time:</p>
                    <p className="text-[#111111]">Instant</p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Deposit;
