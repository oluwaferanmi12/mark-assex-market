"use client";
import { PageHeader } from "@/components/ui/text/page-header";
import walletDollarIcon from "@/assets/svgs/wallet-dollar-icon.svg";
import React, { useEffect, useMemo, useState } from "react";
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
import { TransactionTable } from "@/components/ui/tables/transaction/transaction-table";
import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { VisibleOnMobile } from "@/components/shared/wrappers/visible-on-mobile";
import { MobileInput } from "@/components/ui/inputs/mobile-table-input";
import mobileFilterIcon from "@/assets/svgs/mobile-filter.svg";
import { MobileTransactionTable } from "@/components/ui/tables/transaction/mobile-transaction-table";
import { useRouter } from "next/navigation";
import { useGetPayments } from "@/hooks/queries/usePayment";
import { useGetUserProfile } from "@/hooks/queries/useSettings";
import { MoneyFormat } from "@/utils/money-format";
import searchIcon from "@/assets/svgs/searchIcon.svg";
import { debounce } from "lodash";
import { PaymentMethodTypes, PaymentQueries } from "@/types";
import smallLogo from "@/assets/svgs/small-logo.svg";
import bigDollarIcon from "@/assets/svgs/big-dollar-icon.svg";
import eyeWhiteClosed from "@/assets/svgs/eye-white-closed.svg";
const Wallet = () => {
  const [statusSelected, setStatusSelected] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [typeSelected, setTypeSelected] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const { data: user } = useGetUserProfile();
  const [payloadQuery, setPayloadQuery] = useState<PaymentQueries>({
    status: "",
    type: "",
    keyword: "",
    methodSlug: "",
  });
  const { data, isPending } = useGetPayments(payloadQuery);
  const [methodSelected, setMethodSelected] = useState("All");
  const statusDropDownList: DropDownListInterface[] = [
    { text: "All", id: "" },
    { text: "Successful", id: "SUCCESS" },
    { text: "Pending", id: "PENDING" },
    { text: "Failed", id: "FAILED" },
  ];

  const typeDropDownList: DropDownListInterface[] = [
    { text: "All", id: "" },
    { text: "Deposit", id: "DEPOSIT" },
    { text: "Withdraw", id: "WITHDRAWAL" },
    { text: "Transfer", id: "TRANSFER" },
  ];

  const methodDropDownList: DropDownListInterface[] = useMemo(() => {
    let i = 0;
    const methodList = Object.values(PaymentMethodTypes).map((value) => ({
      text: value as string,
      id: value as string,
    }));
    return [{ text: "All", id: "" }, ...methodList];
  }, []);
  useEffect(() => {
    setPayloadQuery((prev) => ({
      ...prev,
      type:
        typeDropDownList.find((item) => item.text === typeSelected)?.id ?? "",
      status:
        statusDropDownList.find((item) => item.text === statusSelected)?.id ??
        "",
      methodSlug: methodSelected === "All" ? "" : methodSelected,
      keyword: searchValue,
    }));
  }, [typeSelected, statusSelected, methodSelected, searchValue]);

  const router = useRouter();
  return (
    <>
      <PageHeader text="Wallet" />
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-8">
        <div className="cardBg relative p-4 w-[320px] h-[164px]">
          <div className="flex items-center gap-2">
            <span>
              <Image src={smallLogo} alt="" />
            </span>
            <p className="text-base font-work-sans-semi-bold text-white">
              Wallet
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1">
            <p className="text-xs text-[#FFFFFFB2] font-work-sans-regular">
              Total Balance
            </p>
            <Image src={eyeWhiteClosed} alt="" />
          </div>
          <div>
            <p className="font-work-sans-semi-bold text-2xl text-white mt-2">
              $ {MoneyFormat(user?.walletBalance ?? 0)}
            </p>
          </div>
          <div className="absolute bottom-2 right-2">
            <Image src={bigDollarIcon} alt="" />
          </div>
        </div>
        {/* <div className="flex items-center gap-4 mb-4 lg:mb-0 ">
          <span>
            <Image src={walletDollarIcon} alt="" />
          </span>
         
          <div>
            <div className="flex items-center gap-2 ">
              <p className="text-[#202020] text-xs lg:text-sm font-work-sans-regular">
                Total Balance
              </p>
            </div>
            <p className="lg:text-3xl text-xl font-work-sans-semi-bold">
              $ {MoneyFormat(user?.walletBalance ?? 0)}
            </p>
          </div>
        </div> */}
        <VisibleOnDesktop>
          <div className="lg:flex items-center gap-3">
            <Button
              text="Deposit"
              loading={false}
              variant="green-bg"
              fullRounded
              icon={arrowSlantDown}
              action={() => {
                router.push("/deposit");
              }}
            />
            <Button
              text="Withdraw"
              loading={false}
              variant="green-bg"
              fullRounded
              action={() => {
                router.push("/withdrawal");
              }}
              icon={arrowSlantUp}
            />

            <Button
              text="Internal Transfer"
              loading={false}
              variant="green-bg-faded"
              fullRounded
              action={() => {
                router.push("/internal-transfer");
              }}
              icon={internalTransferIcon}
            />
          </div>
        </VisibleOnDesktop>
        <VisibleOnMobile>
          <div className="w-full flex items-center gap-4 mb-3">
            <Button
              text="Deposit"
              loading={false}
              variant="green-bg"
              icon={arrowSlantDown}
              action={() => {}}
              fullWidth
            />
            <Button
              text="Withdraw"
              loading={false}
              variant="green-bg"
              action={() => {}}
              fullWidth
              icon={arrowSlantUp}
            />
          </div>

          <Button
            text="Internal Transfer"
            loading={false}
            variant="green-bg-faded"
            fullWidth
            action={() => {}}
            icon={internalTransferIcon}
          />
        </VisibleOnMobile>
      </div>

      <div className="mt-8">
        <p className="lg:text-xl text-lg font-work-sans-medium lg:mb-12">
          Transaction History
        </p>
        <VisibleOnDesktop>
          <div className="flex justify-between items-end">
            <div>
              <SearchInput
                onChange={(e) => {
                  setSearchValue(e);
                }}
              />
            </div>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-[#707070] text-xs font-work-sans-regular mb-1">
                  Payment Method
                </p>
                <DropDownList
                  dropDownList={methodDropDownList}
                  selected={methodSelected}
                  setSelected={setMethodSelected}
                >
                  <div>
                    <DropDownTextWrapper filterSelected={methodSelected} />
                  </div>
                </DropDownList>
              </div>
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
                    <DropDownTextWrapper filterSelected={typeSelected} />
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
        </VisibleOnDesktop>
        <VisibleOnMobile>
          <div className="flex items-center gap-2 mt-4">
            <MobileInput />
            <div className="h-[40px]">
              <Image
                src={mobileFilterIcon}
                objectFit="cover"
                alt=""
                className="h-full"
              />
            </div>
          </div>
        </VisibleOnMobile>
        <VisibleOnDesktop>
          <TransactionTable loading={isPending} data={data} />
        </VisibleOnDesktop>
        <VisibleOnMobile>
          <div className="my-4">
            {data?.length ? (
              data.map((item, index) => {
                return (
                  <MobileTransactionTable
                    payment={item}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    index={index}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
        </VisibleOnMobile>
      </div>
    </>
  );
};

export default Wallet;
