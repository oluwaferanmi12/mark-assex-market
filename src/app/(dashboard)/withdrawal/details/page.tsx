"use client";

import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { VisibleOnMobile } from "@/components/shared/wrappers/visible-on-mobile";
import { Button } from "@/components/ui/buttons/button";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { TransferInput } from "@/components/ui/inputs/transfer-input";
import { Col, Row } from "antd";
import Image from "next/image";
import walletDollarIcon from "@/assets/svgs/wallet-dollar-icon.svg";
import { useState } from "react";
import dollarIcon from "@/assets/svgs/dollar-green.svg";
import arrowRight from "@/assets/svgs/tabler-icon-rights.svg";
import { PageHeader } from "@/components/ui/text/page-header";
import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import bigXIcon from "@/assets/svgs/moda-big-x-icon.svg";
import checkCircle from "@/assets/svgs/check-circle.svg";
import bidirectionalIcon from "@/assets/svgs/nav-transfer-active.svg";
import arrowRightMultiple from "@/assets/svgs/chevron-right-white.svg";
import dollarGreen from "@/assets/svgs/dollar-green.svg";
import { OTPInput } from "@/components/ui/inputs/otp-input";
import { SuccessModal } from "@/components/shared/response-modal/success-modal";

const WithdrawalDetails = () => {
  const [accountType, setAccountType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [verificationModal, setVerificationModal] = useState(false);
  const [showDepositDetails, setShowDepositDetails] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPaymentSetup, setShowPaymentSetup] = useState(false);

  return (
    <>
      <SuccessModal
        active={showSuccessModal}
        closeAction={() => {
          setShowSuccessModal(false);
        }}
        buttonText="Close"
        mainText="Funds Deposited Successfully"
        subText="Your trading account has been funded with $4,000 successfully"
      />
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
      <PageHeader text="Withdrawal" />
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
                      From Account
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
                {showOtp ? (
                  <div className="mt-3">
                    <p className="text-base font-work-sans-medium">
                      Confirm Withdrawal
                    </p>
                    <p className="text-xs text-[#404040] font-work-sans-regular">
                      Enter the OTP sent to your phone number +234****9199. If
                      you didn't receive it, request a new code.
                    </p>
                    <div className="mt-3 flex justify-start">
                      <OTPInput />
                    </div>
                    <div className="my-4 flex items-center font-work-sans-light">
                      <p className="text-xs">
                        Didn't receive any code?{" "}
                        <span className="text-[#004DEF] cursor-pointer">
                          Resend code
                        </span>
                      </p>
                    </div>
                  </div>
                ) : (
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
                )}

                <div className="my-4">
                  <Button
                    action={() => {
                      //   setVerificationModal(true);
                      if (showOtp) {
                        // setShowSuccessModal(true);
                        setShowOtp(false);
                        setShowDepositDetails(false);
                        setShowPaymentSetup(true);
                      }
                      setShowOtp(true);
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
      ) : showPaymentSetup ? (
        <div className="bg-white p-4 rounded-lg mt-6">
          <div>
            <Row gutter={28} className="mb-4">
              <Col lg={24}>
                <div>
                  <p className="text-[#707070] text-lg font-work-sans-medium mb-1">
                    Payment setup
                  </p>
                  <p className=" text-[#404040] font-work-sans-regular text-xs">
                    Withdraw instantly to accounts you've previously sent funds
                    to. Fast, secure, and convenient.
                  </p>
                  <Row gutter={28}>
                    <Col xs={12}>
                      <div className="mt-6">
                        <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                          Choose from accounts you've previously withdrawn from
                        </p>
                        <select
                          style={{
                            boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                          }}
                          className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                        >
                          <option>Select Account</option>
                        </select>
                      </div>
                    </Col>
                  </Row>

                  <Row gutter={28} className="mt-4">
                    <Col xs={24} lg={12}>
                      <div>
                        <TransferInput greyBg label="Account number" />
                      </div>
                    </Col>
                    <Col xs={24} lg={12}>
                      <div>
                        <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                          Bank
                        </p>
                        <div>
                          <input
                            placeholder="Select bank account"
                            style={{
                              boxShadow:
                                "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                            }}
                            className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="my-3 flex items-center gap-2">
                    <p className="text-[#404040] font-work-sans-regular text-lg">
                      To be recieved:
                    </p>
                    <p className="text-[#111111] text-lg font-work-sans-semi-bold">
                      $10
                    </p>
                  </div>
                  <Button
                    action={() => {
                      setShowDepositDetails(true);
                    }}
                    loading={false}
                    text="Confirm"
                    variant="green-bg"
                    icon={arrowRightMultiple}
                    iconPosition="right"
                  />
                  <div className="my-4">
                    <Row>
                      <Col xs={12}>
                        <p className="text-[#1F0D3F] font-work-sans-medium">
                          Withdrawal Info:
                        </p>
                        <div className="my-4">
                          <div className="flex items-center my-2 justify-between">
                            <p className="text-[#707070] font-work-sans-regular text-base">
                              Amount
                            </p>
                            <p className="text-[#111111] font-work-sans-regular text-base">
                              ₦7,820
                            </p>
                          </div>
                          <div className="flex items-center my-2 justify-between">
                            <p className="text-[#707070] font-work-sans-regular text-base">
                              Commission
                            </p>
                            <p className="text-[#111111] font-work-sans-regular text-base">
                              No Commission
                            </p>
                          </div>
                          <div className="flex items-center my-2 justify-between">
                            <p className="text-[#707070] font-work-sans-regular text-base">
                              Conversion rate
                            </p>
                            <p className="text-[#111111] font-work-sans-regular text-base">
                              1 USD = 780.022 NGN
                            </p>
                          </div>
                          <div className="flex items-center my-2 justify-between">
                            <p className="text-[#707070] font-work-sans-regular text-base">
                              From account{" "}
                            </p>
                            <p className="text-[#111111] font-work-sans-regular text-base">
                              1232321
                            </p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 mt-6">
          <div>
            <Row gutter={28} className="mb-4">
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
              <Col lg={12} xs={24}>
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
                    <option>NGN</option>
                  </select>
                </div>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col lg={12} xs={24}>
                <div>
                  <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                    From Account
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
                  <TransferInput greyBg label="Amount to be Received" />
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

export default WithdrawalDetails;
