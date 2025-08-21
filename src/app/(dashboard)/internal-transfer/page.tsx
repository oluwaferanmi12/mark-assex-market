"use client";

import { PageHeader } from "@/components/ui/text/page-header";
import React, { useEffect, useState } from "react";
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
import { useGetUserProfile } from "@/hooks/queries/useSettings";
import { MoneyFormat } from "@/utils/money-format";
import { useGetAccount } from "@/hooks/queries/useAccount";
import { toast } from "sonner";
import {
  useExternalTransfer,
  useInternalTransfer,
} from "@/hooks/queries/usePayment";
import { useQueryClient } from "@tanstack/react-query";
import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import { ModalHeader } from "@/components/shared/modal-wrapper/modal-header";
import { useRouter } from "next/navigation";
import { ModalBody } from "@/components/shared/modal-wrapper/modal-body";
import successIcon from "@/assets/svgs/transaction-success-icon.svg";
import { ModalFooter } from "@/components/shared/modal-wrapper/modal-footer";
import { Account } from "@/types";
import { PageGoBack } from "@/components/shared/page-go-back/page-go-back";
import { OTPInput } from "@/components/ui/inputs/otp-input";
import {
  useSendGenericOtp,
  useVerifyGenericOtp,
} from "@/hooks/queries/useGeneric";
import { isValidEmail } from "@/utils/email-validate";

const InternalTransfer = () => {
  const queryClient = useQueryClient();
  const [activeOption, setActiveOption] = useState(0);
  const { data } = useGetUserProfile();
  const [senderAccount, setSenderAccount] = useState("");
  const [receiverAccount, setRecieverAccount] = useState("");
  const [email, setEmail] = useState("");
  const { data: userAccounts } = useGetAccount();
  const [amount, setAmount] = useState(0);
  const [transactionSuccessful, setTransactionSuccessful] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const internalTransferMutate = useInternalTransfer(() => {
    queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    setTransactionSuccessful(true);
  });
  const [selectedAccountDetail, setSelectedAccountDetail] = useState<Account>();
  const [fromAccountDetails, setFromAccountDetails] = useState<Account>();
  const sendGenericOtp = useSendGenericOtp(() => {
    setShowOtp(true);
  });
  const router = useRouter();
  const externalTransferMutate = useExternalTransfer(() => {
    queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    setTransactionSuccessful(true);
  });
  const verifyOtp = useVerifyGenericOtp((data) => {
    externalTransferMutate.mutate({
      token: data,
      amount: amount,
      email: email,
      fromAccount: senderAccount === "wallet" ? "" : senderAccount,
    });
  });

  const [otpValue, setOtpValue] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!senderAccount) {
      // try to remove this user from current data
      setRecieverAccount("");
    }
  }, [senderAccount]);

  const handleValidate = () => {
    if (activeOption) {
      if (!amount || !receiverAccount || !email) {
        return false;
      }
      return true;
    } else {
      if (!amount || !receiverAccount || !senderAccount) {
        return false;
      }
      return true;
    }
  };

  const handleTransfer = () => {
    if (!handleValidate()) {
      toast.error("All fields are required!");
      return;
    }
    const fromAccount = senderAccount === "wallet" ? "" : senderAccount;
    const toAccount = receiverAccount === "wallet" ? "" : receiverAccount;
    if (activeOption) {
      externalTransferMutate.mutate({
        amount: amount,
        fromAccount: fromAccount === "wallet" ? "" : fromAccount,
        email: email,
        token: token,
      });
    } else {
      internalTransferMutate.mutate({
        amount: amount,
        fromAccount: fromAccount,
        toAccount: toAccount,
      });
    }
  };

  useEffect(() => {
    if (receiverAccount && userAccounts) {
      const result = userAccounts.find((item) => item.id === receiverAccount);
      setSelectedAccountDetail(result);
    }
    if (senderAccount && userAccounts) {
      const result = userAccounts.find((item) => item.id === senderAccount);
      setFromAccountDetails(result);
    }
  }, [receiverAccount, userAccounts, senderAccount]);
  return (
    <>
      <PageHeader text="Internal Transfer" />
      <ModalContainer
        active={transactionSuccessful}
        handleClose={() => {
          setTransactionSuccessful(false);
          router.push("/wallet");
        }}
      >
        <ModalBody>
          <div className="flex items-center justify-center">
            <Image src={successIcon} alt="" />
          </div>
          <p className="text-center text-2xl font-work-sans-medium my-1">
            Transaction Successful
          </p>
          <p className="text-[#404040] font-work-sans-regular w-4/5 mx-auto text-center">
            Your transfer of ${MoneyFormat(amount)} to trading account
            {!email
              ? receiverAccount === "wallet"
                ? "Wallet"
                : `#${selectedAccountDetail?.mt5Id}`
              : " " + email + " "}
            has been completed Successfully.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            action={() => {
              setTransactionSuccessful(false);
              router.push("/wallet");
            }}
            text="View Transaction"
            loading={false}
            variant="green-bg"
            fullWidth
          />
        </ModalFooter>
      </ModalContainer>
      {showOtp ? (
        <Row>
          <Col xs={24} lg={12}>
            <div className="bg-white rounded-lg p-4  my-4">
              <PageGoBack action={() => setShowOtp(false)} />
              <div className="mt-4">
                <p className="text-[#1F0D3F] text-lg font-work-sans-medium">
                  Transfer Details
                </p>
              </div>
              <div className="">
                <div
                  style={{ borderBottom: "0.5px dashed #BEBEBE80" }}
                  className="flex items-center justify-between py-4"
                >
                  <p className="text-[#707070]  text-base font-work-sans-regular">
                    Sender
                  </p>
                  <p className="text-[#111111] font-work-sans-regular  text-base">
                    {senderAccount === "wallet" ? (
                      "Wallet"
                    ) : (
                      <>
                        {fromAccountDetails?.accountGroup?.name}(
                        {fromAccountDetails?.mt5Id})
                      </>
                    )}
                  </p>
                </div>
                <div
                  style={{ borderBottom: "0.5px dashed #BEBEBE80" }}
                  className="flex items-center justify-between py-4"
                >
                  <p className="text-[#707070]  text-base font-work-sans-regular">
                    Reciepient Account
                  </p>
                  <p className="text-[#111111] font-work-sans-regular  text-base">
                    {email}
                  </p>
                </div>
                <div
                  style={{ borderBottom: "0.5px dashed #BEBEBE80" }}
                  className="flex items-center justify-between py-4"
                >
                  <p className="text-[#707070]  text-base font-work-sans-regular">
                    Amount
                  </p>
                  <p className="text-[#111111] font-work-sans-regular  text-base">
                    USD {MoneyFormat(amount)}
                  </p>
                </div>
                <div
                  style={{ borderBottom: "0.5px dashed #BEBEBE80" }}
                  className="flex items-center justify-between py-4"
                >
                  <p className="text-[#707070]  text-base font-work-sans-regular">
                    Commission
                  </p>
                  <p className="text-[#111111] font-work-sans-regular  text-base">
                    No Commission
                  </p>
                </div>
                <div className="flex items-center justify-between py-4">
                  <p className="text-[#111111] font-work-sans-regular  text-base">
                    To be recieved:{" "}
                    <span className="font-work-sans-semi-bold">
                      USD {MoneyFormat(amount)}
                    </span>
                  </p>
                </div>

                <div className="mt-3">
                  <p className="text-lg font-work-sans-medium">
                    Confirm Transfer
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
                  <Button
                    action={() => {
                      verifyOtp.mutate({ otp: otpValue, withToken: true });
                    }}
                    loading={verifyOtp.isPending}
                    text="Confirm"
                    variant="green-bg"
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      ) : (
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
                ${MoneyFormat(data?.walletBalance ?? 0)}
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
                <option value="">Select an account</option>
                <option value={"wallet"}>Wallet</option>
                {userAccounts?.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.accountGroup.name}: {item.mt5Id} ($
                      {MoneyFormat(item.balance)})
                    </option>
                  );
                })}
              </SelectInput>
              {activeOption ? (
                <TransferInput
                  label="Trader's Email"
                  inputVal={email}
                  handleInput={(e) => {
                    setEmail(e);
                  }}
                  placeholder="Enter trader's email"
                />
              ) : (
                <SelectInput
                  value={receiverAccount}
                  setValue={(e) => {
                    if (e === senderAccount) {
                      toast.error(
                        "You can not select the same account for transfer"
                      );
                      return;
                    } else if (!senderAccount) {
                      toast.error("Select a sender account");
                      return;
                    }
                    setRecieverAccount(e);
                  }}
                  label="Recipient Account"
                >
                  <option value="">Select an account</option>
                  <option value={"wallet"}>Wallet</option>
                  {userAccounts?.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.accountGroup.name}(${item.balance})
                      </option>
                    );
                  })}
                </SelectInput>
              )}
            </div>
            <div className="flex items-center flex-col lg:flex-row gap-3 lg:gap-6 w-full mb-4">
              <TransferInput
                label="Amount"
                inputVal={String(amount)}
                handleInput={(e) => {
                  setAmount(+e);
                }}
              />
              <TransferInput
                inputVal={String(amount)}
                handleInput={(e) => {
                  setAmount(+amount);
                }}
                label="Amount to be recieved"
                disabled
                greyBg
              />
            </div>
            <div className="my-4">
              <VisibleOnDesktop>
                {activeOption ? (
                  <Button
                    action={() => {
                      if (!handleValidate()) {
                        if (isValidEmail(email)) {
                          sendGenericOtp.mutate({ channel: "email" });
                        } else {
                          toast.error("Invalid email entered");
                        }
                      } else {
                        toast.error("All fields are required");
                      }
                    }}
                    loading={sendGenericOtp.isPending}
                    variant="green-bg"
                    text="Proceed"
                    icon={arrowRight}
                    iconPosition="right"
                  />
                ) : (
                  <Button
                    action={() => {
                      handleTransfer();
                    }}
                    loading={internalTransferMutate.isPending}
                    variant="green-bg"
                    text="Send"
                    icon={arrowRight}
                    iconPosition="right"
                  />
                )}
              </VisibleOnDesktop>
              <VisibleOnMobile>
                {activeOption ? (
                  <Button
                    action={() => {}}
                    loading={false}
                    variant="green-bg"
                    text="Send"
                    icon={arrowRight}
                    iconPosition="right"
                    fullWidth
                  />
                ) : (
                  <Button
                    action={() => {}}
                    loading={false}
                    variant="green-bg"
                    text="Send"
                    icon={arrowRight}
                    iconPosition="right"
                    fullWidth
                  />
                )}
              </VisibleOnMobile>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InternalTransfer;
