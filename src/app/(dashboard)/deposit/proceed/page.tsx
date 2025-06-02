"use client";
import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { Col, Row } from "antd";
import arrowRightMultiple from "@/assets/svgs/chevron-right-white.svg";
import dollarGreen from "@/assets/svgs/dollar-green.svg";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/buttons/button";
import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import bigXIcon from "@/assets/svgs/moda-big-x-icon.svg";
import { PageHeader } from "@/components/ui/text/page-header";
import { TransferInput } from "@/components/ui/inputs/transfer-input";
import bidirectionalIcon from "@/assets/svgs/nav-transfer-active.svg";
import checkCircle from "@/assets/svgs/check-circle.svg";

const Proceed = () => {
  const [verificationModal, setVerificationModal] = useState(false);
  const [showDepositDetails, setShowDepositDetails] = useState(false);
  return (
    <>
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
      {showDepositDetails ? (
        <div className="bg-white p-4 rounded-lg mt-6">
          <div>
            <p className="font-work-sans-regular text-[#707070]">
              Payment Method
            </p>
            <Row>
              <Col xs={12}>
                <div
                  style={{ border: "0.2px solid #0DAE94" }}
                  className=" rounded-lg p-4 flex items-center gap-3 mt-2"
                >
                  <Image src={bidirectionalIcon} alt="" />
                  <p className="text-[#202020] font-work-sans-regular">
                    Instant Bank Transfer
                  </p>
                </div>
                <div className="mt-4">
                  <div
                    style={{
                      borderBottom: "0.5px solid #BEBEBE80",
                      borderStyle: "dashed",
                    }}
                    className="flex items-center justify-between py-2"
                  >
                    <p className="text-[#707070] font-work-sans-regular">
                      Amount
                    </p>
                    <p className="text-[#111111] font-work-sans-regular">
                      ₦7,820
                    </p>
                  </div>

                  <div
                    style={{
                      borderBottom: "0.5px solid #BEBEBE80",
                      borderStyle: "dashed",
                    }}
                    className="flex items-center justify-between py-2"
                  >
                    <p className="text-[#707070] font-work-sans-regular">
                      Commission
                    </p>
                    <p className="text-[#111111] font-work-sans-regular">
                      No Commission
                    </p>
                  </div>
                  <div
                    style={{
                      borderBottom: "0.5px solid #BEBEBE80",
                      borderStyle: "dashed",
                    }}
                    className="flex items-center justify-between py-2"
                  >
                    <p className="text-[#707070] font-work-sans-regular">
                      Conversion Rate
                    </p>
                    <p className="text-[#111111] font-work-sans-regular">
                      1 USD = 780.022 NGN
                    </p>
                  </div>
                  <div
                    style={{
                      borderBottom: "0.5px solid #BEBEBE80",
                      borderStyle: "dashed",
                    }}
                    className="flex items-center justify-between py-2"
                  >
                    <p className="text-[#707070] font-work-sans-regular">
                      To account
                    </p>
                    <p className="text-[#111111] font-work-sans-regular">
                      1232321
                    </p>
                  </div>

                  <div className="flex items-center gap-2  py-2">
                    <p className="text-[#404040] font-work-sans-regular">
                      To be deposited:
                    </p>
                    <p className="text-[#111111]  font-work-sans-semi-bold">
                      $10.00
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={24}>
                <div className="bg-[#E7F7F4] p-4 rounded-lg flex items-center gap-4">
                  <Image src={checkCircle} alt="" />
                  <p>
                    <span className="text-sm text-[#1F0D3F] font-work-sans-medium">
                      Important Information:{" "}
                    </span>
                    <span className="font-work-sans-regular">
                      This is an estimated amount. The final value may vary
                      slightly due to currency conversion rate fluctuations.
                    </span>
                  </p>
                </div>
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
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 mt-6">
          <div>
            <Row className="mb-4">
              <Col lg={12} xs={24}>
                <div>
                  <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                    Payment Method
                  </p>
                  <select
                    style={{
                      boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                    }}
                    className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                  >
                    <option>Select Method</option>
                  </select>
                </div>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col lg={12} xs={24}>
                <div>
                  <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                    To account
                  </p>
                  <select
                    style={{
                      boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                    }}
                    className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                  >
                    <option>Standard: 8197834 ($10,000)</option>
                  </select>
                </div>
              </Col>
            </Row>
            <Row gutter={28}>
              <Col xs={24} lg={12}>
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
              <Col xs={24} lg={12}>
                <div>
                  <TransferInput greyBg label="Amount to be Deposited" />
                </div>
              </Col>
            </Row>
            <div className="my-4">
              <Button
                action={() => {
                  setShowDepositDetails(true);
                }}
                loading={false}
                text="Proceed"
                variant="green-bg"
                icon={arrowRightMultiple}
                iconPosition="right"
              />
            </div>
            <VisibleOnDesktop>
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
            </VisibleOnDesktop>
          </div>
        </div>
      )}
    </>
  );
};

export default Proceed;
