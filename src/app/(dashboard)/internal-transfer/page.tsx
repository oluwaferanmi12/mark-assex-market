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

const InternalTransfer = () => {
  const [activeOption, setActiveOption] = useState(0);
  const { data } = useGetUserProfile();
  const [senderAccount, setSenderAccount] = useState("");
  const [receiverAccount, setRecieverAccount] = useState("");
  const [email, setEmail] = useState("");
  const { data: userAccounts } = useGetAccount();
  const [amount, setAmount] = useState(0);
  const internalTransferMutate = useInternalTransfer();
  const externalTransferMutate = useExternalTransfer();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!senderAccount) {
      // try to remove this user from current data
      setRecieverAccount("");
    }
  }, [senderAccount]);

  const handleValidate = () => {
    if (activeOption) {
      if (!amount || !receiverAccount || !email || !token) {
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
        fromAccount: fromAccount,
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
                  <option value={item.id}>
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
                    <option value={item.id}>
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
                    if (activeOption) {
                    } else {
                    }
                  }}
                  loading={false}
                  variant="green-bg"
                  text="Send"
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
    </>
  );
};

export default InternalTransfer;
