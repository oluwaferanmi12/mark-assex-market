"use client";

import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { VisibleOnMobile } from "@/components/shared/wrappers/visible-on-mobile";
import { Button } from "@/components/ui/buttons/button";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { TransferInput } from "@/components/ui/inputs/transfer-input";
import { Col, Dropdown, MenuProps, Row } from "antd";
import Image from "next/image";
import walletDollarIcon from "@/assets/svgs/wallet-dollar-icon.svg";
import { useEffect, useState } from "react";
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
import {
  useGetPaymentMethodDetails,
  useGetPaymentMethods,
  usePaymentAccount,
  usePaymentBanks,
  useResolvePaymentAccount,
  useSaveWithdraw,
  useValidateBalance,
} from "@/hooks/queries/usePayment";
import { data } from "framer-motion/client";
import { useRouter } from "next/navigation";
import { useGetAccount, useGetAccountDetail } from "@/hooks/queries/useAccount";
import { toast } from "sonner";
import { MoneyFormat } from "@/utils/money-format";
import {
  CreateWithdrawalInterface,
  PaymentBank,
  UserBankAccountDetails,
} from "@/types";
import {
  useSendGenericOtp,
  useVerifyGenericOtp,
} from "@/hooks/queries/useGeneric";
import arrowDown from "@/assets/svgs/arrow-down-black.svg";
import accessPlaceholder from "@/assets/svgs/access-placeholder.svg";
import { useQueryClient } from "@tanstack/react-query";
import { PageGoBack } from "@/components/shared/page-go-back/page-go-back";

const WithdrawalDetails = () => {
  const queryClient = useQueryClient();
  const [accountType, setAccountType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [verificationModal, setVerificationModal] = useState(false);
  const [showDepositDetails, setShowDepositDetails] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPaymentSetup, setShowPaymentSetup] = useState(false);
  const { data: paymentMethods } = useGetPaymentMethods();
  const { data: accounts } = useGetAccount();
  const { data: banks } = usePaymentBanks();
  const { data: previousAccts } = usePaymentAccount();
  const [selectedBank, setSelectedBank] = useState<PaymentBank>();
  const verifyMutate = useValidateBalance(() => {
    sendGenericOtp.mutate({ channel: "email" });
  });
  const [obtainedDetails, setObtainedDetails] =
    useState<UserBankAccountDetails | null>(null);
  const mutateVerifyOtp = useVerifyGenericOtp((data) => {
    setShowOtp(false);
    setShowDepositDetails(false);
    setShowPaymentSetup(true);
    setWithdrawPayload((prev) => ({ ...prev, token: data }));
  });
  const mutateResolveAccount = useResolvePaymentAccount((data) => {
    setWithdrawPayload((prev) => ({ ...prev, accountName: data.account_name }));
    setObtainedDetails(data);
  });

  const [fromAccount, setFromAccount] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const sendGenericOtp = useSendGenericOtp(() => {
    setShowOtp(true);
  });
  const { data: activePaymentDetails } = useGetPaymentMethodDetails(
    accountType!
  );

  const [withdrawPayload, setWithdrawPayload] =
    useState<CreateWithdrawalInterface>({
      accountName: "",
      accountNumber: "",
      amount: 0,
      bank: "",
      bankCode: "",
      coin: "",
      currency: "",
      fromAccount: "",
      methodSlug: "",
      network: "",
      paymentAccountId: "",
      routingNo: "",
      token: "",
      walletAddress: "",
    });
  const mutateWithdraw = useSaveWithdraw((data) => {
    setShowSuccessModal(true);
    queryClient.invalidateQueries({ queryKey: ["user-profile"] });
  });
  const router = useRouter();
  const items: MenuProps["items"] =
    previousAccts &&
    previousAccts?.map((item, index) => {
      return {
        key: index,
        label: (
          <div className="flex items-center gap-2">
            <div>
              <p className="font-work-sans-regular">{item.accountName}</p>
              <p className="text-xs">
                <span className="text-[#0DAE94]">{item.accountNumber} </span>
                {item.bank}
              </p>
            </div>
          </div>
        ),
      };
    });

  const bankDropDown: MenuProps["items"] = banks?.map((item, index) => {
    return {
      key: index,
      label: (
        <div
          onClick={() => {
            setSelectedBank(item);
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div>
            <p className="font-work-sans-regular">{item.name}</p>
          </div>
        </div>
      ),
    };
  });

  const customMethods: MenuProps["items"] = paymentMethods?.map(
    (item, index) => {
      return {
        key: index,
        label: (
          <div
            onClick={() => {
              setAccountType(item.slug);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image src={item.image} width={18} height={18} alt="" />
            <div>
              <p className="font-work-sans-regular">{item.name}</p>
            </div>
          </div>
        ),
      };
    }
  );

  const resolvePreviousAccountDetails = () => {
    const result = previousAccts?.find(
      (item) => item.id === withdrawPayload.paymentAccountId
    );
    return result;
  };

  const getMethodName = () => {
    const result = paymentMethods?.find((item) => item.slug === accountType);
    return result?.name;
  };

  const getSelectedAccountDetails = () => {
    if (withdrawPayload.fromAccount) {
      const result = accounts?.find(
        (item) => item.id === withdrawPayload.fromAccount
      );
      return result;
    }
    return null;
  };

  const handleAddWithdraw = async () => {
    const payload = { ...withdrawPayload };
    if (selectedBank) {
      payload.bank = selectedBank.name;
      payload.bankCode = selectedBank.nibss_bank_code;
    }
    mutateWithdraw.mutate(payload);
  };

  useEffect(() => {
    const urlVal = new URLSearchParams(window.location.search);
    const val_ = urlVal.get("val");
    if (val_) {
      setWithdrawPayload((prev) => ({ ...prev, methodSlug: val_ }));
      setAccountType(val_);
    }
  }, []);

  useEffect(() => {
    if (accountType) {
      setWithdrawPayload((prev) => ({ ...prev, methodSlug: accountType }));
      router.push(`/withdrawal/details?val=${accountType}`);
    }
  }, [accountType]);

  useEffect(() => {
    if (
      withdrawPayload.accountNumber &&
      withdrawPayload.accountNumber.length === 10 &&
      selectedBank
    ) {
      mutateResolveAccount.mutate({
        accountNumber: withdrawPayload.accountNumber,
        bankCode: selectedBank.nibss_bank_code,
      });
    } else {
      setObtainedDetails(null);
    }
  }, [withdrawPayload.accountNumber, selectedBank]);

  return (
    <>
      <SuccessModal
        active={showSuccessModal}
        closeAction={() => {
          setShowSuccessModal(false);
          router.push("/transactions");
        }}
        buttonText="Close"
        mainText="Funds Withdraw In Progress"
        subText={`Request for the withdraw of ${MoneyFormat(
          withdrawPayload.amount
        )} in progress `}
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
      <div className="my-4">
        <PageGoBack
          action={() => {
            if (showDepositDetails) {
              setShowDepositDetails(false);
            }
          }}
        />
      </div>

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
                    {getMethodName()}
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
                      ${MoneyFormat(withdrawPayload.amount)}
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
                      {getSelectedAccountDetails()
                        ? getSelectedAccountDetails()?.mt5Id
                        : "No account selected"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2  py-2">
                    <p className="text-[#404040] font-work-sans-regular">
                      To be withdrawn:
                    </p>
                    <p className="text-[#111111]  font-work-sans-semi-bold">
                      ${MoneyFormat(withdrawPayload.amount)}
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
                      Enter the OTP sent to your email address. If you didn't
                      receive it, request a new code.
                    </p>
                    <div className="mt-3 flex justify-start">
                      <OTPInput setOtpValue={setOtpValue} />
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

                <div className="my-4 ">
                  <Button
                    action={() => {
                      //   setVerificationModal(true);
                      if (showOtp) {
                        // setShowSuccessModal(true);
                        mutateVerifyOtp.mutate({
                          otp: otpValue,
                          withToken: true,
                        });
                        return;
                      }
                      // sendGenericOtp.mutate({ channel: "email" });
                      // setShowOtp(true);
                      verifyMutate.mutate({
                        accountId: withdrawPayload.fromAccount,
                        amount: withdrawPayload.amount,
                      });
                    }}
                    loading={
                      mutateVerifyOtp.isPending || verifyMutate.isPending
                    }
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
                  {accountType.includes("tether") ||
                  accountType.includes("btc") ||
                  accountType.includes("eth") ||
                  accountType.includes("trx") ? (
                    <div>
                      <Row gutter={12} className="my-4">
                        <Col xs={24} lg={12}>
                          <TransferInput
                            placeholder="Enter your wallet address"
                            greyBg
                            label="Wallet Address"
                            handleInput={(e) => {
                              setWithdrawPayload((prev) => ({
                                ...prev,
                                walletAddress: e,
                              }));
                            }}
                          />
                        </Col>
                        <Col xs={24} lg={12}>
                          <TransferInput
                            disabled
                            placeholder={getMethodName()}
                            greyBg
                            label="Network"
                          />
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <>
                      <Row gutter={28}>
                        <Col xs={12}>
                          <div className="mt-6">
                            <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                              Choose from accounts you've previously withdrawn
                              from
                            </p>
                            <Dropdown menu={{ items }}>
                              <div
                                style={{
                                  boxShadow:
                                    "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                                }}
                                className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular flex items-center justify-between"
                              >
                                {withdrawPayload.paymentAccountId ? (
                                  <p>
                                    {
                                      resolvePreviousAccountDetails()
                                        ?.accountName
                                    }
                                  </p>
                                ) : (
                                  "Select account"
                                )}
                                <Image src={arrowDown} alt="" />
                              </div>
                            </Dropdown>
                          </div>
                        </Col>
                      </Row>

                      <Row gutter={28} className="mt-4">
                        <Col xs={24} lg={12}>
                          <div>
                            <TransferInput
                              handleInput={(e) => {
                                if (e.length < 11) {
                                  setWithdrawPayload((prev) => ({
                                    ...prev,
                                    accountNumber: e,
                                  }));
                                }
                              }}
                              inputVal={withdrawPayload.accountNumber}
                              greyBg
                              label="Account number"
                            />
                          </div>
                        </Col>
                        <Col xs={24} lg={12}>
                          <div>
                            <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                              Bank
                            </p>
                            <Dropdown menu={{ items: bankDropDown }}>
                              <div
                                style={{
                                  boxShadow:
                                    "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                                }}
                                className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular flex items-center justify-between"
                              >
                                <p>{selectedBank?.name ?? "Select Bank"}</p>
                                <Image src={arrowDown} alt="" />
                              </div>
                            </Dropdown>
                          </div>
                        </Col>
                      </Row>
                      {obtainedDetails && (
                        <p className="font-work-sans-regular text-[#34C659] mt-2">
                          {obtainedDetails?.account_name}
                        </p>
                      )}

                      <div className="my-3 flex items-center gap-2">
                        <p className="text-[#404040] font-work-sans-regular text-lg">
                          To be recieved:
                        </p>
                        <p className="text-[#111111] text-lg font-work-sans-semi-bold">
                          ${withdrawPayload.amount}
                        </p>
                      </div>
                    </>
                  )}

                  <Button
                    action={() => {
                      handleAddWithdraw();
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
                              ${MoneyFormat(withdrawPayload.amount)}
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
                              {getSelectedAccountDetails()
                                ? getSelectedAccountDetails()?.mt5Id
                                : "No account selected"}
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

                  <Dropdown menu={{ items: customMethods }}>
                    <div
                      style={{
                        boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                      }}
                      className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                    >
                      {getMethodName()}
                    </div>
                  </Dropdown>
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
                    onChange={(e) => {
                      setWithdrawPayload((prev) => ({
                        ...prev,
                        fromAccount: e.target.value,
                      }));
                    }}
                    className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                  >
                    <option value={""}>wallet</option>
                    {accounts &&
                      accounts.length &&
                      accounts.map((item, index) => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.server}: {item.mt5Id} ($
                            {item.balance})
                          </option>
                        );
                      })}
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
                      onChange={(e) => {
                        setWithdrawPayload((prev) => ({
                          ...prev,
                          amount: +e.target.value,
                        }));
                      }}
                      value={withdrawPayload.amount}
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
                  if (withdrawPayload.amount) {
                    setShowDepositDetails(true);
                    return;
                  } else if (!withdrawPayload.amount) {
                    toast.error("Kindly enter an amount");
                  }
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
                      <p className="text-[#111111]">
                        ${MoneyFormat(activePaymentDetails?.minAmount ?? 0)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mb-4 text-lg font-work-sans-regular">
                      <p className="text-[#404040]">Max Deposit:</p>
                      <p className="text-[#111111]">
                        ${MoneyFormat(activePaymentDetails?.maxAmount ?? 0)}
                      </p>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="flex items-center gap-4 mb-4 text-lg font-work-sans-regular">
                      <p className="text-[#404040]">Commission:</p>
                      <p className="text-[#111111]">{0}</p>
                    </div>
                    <div className="flex items-center gap-4 mb-4 text-lg font-work-sans-regular">
                      <p className="text-[#404040]">Deposit Time:</p>
                      <p className="text-[#111111]">
                        {activePaymentDetails?.time}
                      </p>
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
