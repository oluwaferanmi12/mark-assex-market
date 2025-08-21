"use client";

import { DropDownList } from "@/components/ui/drop-down/dropdown-list";
import { DropDownListInterface } from "@/interfaces/ui-interfac";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import arrowDown from "@/assets/svgs/filled-arrow-down.svg";
import { TradeContainer } from "@/components/shared/wrappers/trade-container";
import { DropDownTextWrapper } from "@/components/shared/wrappers/drop-down-text";
import { OrderTable } from "@/components/ui/tables/order/order-table";
import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { VisibleOnMobile } from "@/components/shared/wrappers/visible-on-mobile";
import { MobileOrderTable } from "@/components/ui/tables/order/mobile-order-table";
import { MobileInput } from "@/components/ui/inputs/mobile-table-input";
import mobileFilterIcon from "@/assets/svgs/mobile-filter.svg";
import {
  useGetAccountDetail,
  useGetAccountTradingHistory,
} from "@/hooks/queries/useAccount";
import { SearchInput } from "@/components/ui/inputs/search-input";
import { GetAccountHistoryPayloadInterface } from "@/types";
import { TableEmptyState } from "@/components/shared/states/empty/table-empty-state";

const AccountDetails = () => {
  const [filterSelected, setFilterSelected] = useState("Newest");
  const [orderTypeSelected, setOrderTypeSelected] = useState("All");
  const [indexActive, setIndexActive] = useState(0);
  const [id, setId] = useState("");
  const [queryParam, setQueryParam] =
    useState<GetAccountHistoryPayloadInterface>({
      id: id ?? "",
      keyword: "",
      type: "",
    });

  const [statusSelected, setStatusSelected] = useState("All");
  const tradingHistory = useGetAccountTradingHistory(queryParam);

  const { data } = useGetAccountDetail(id ?? "");
  const filterDropDownList: DropDownListInterface[] = [
    { text: "All", id: "" },
    { text: "Newest", id: "" },
    { text: "Oldest", id: "" },
  ];
  const orderDropDownList: DropDownListInterface[] = [
    { text: "All", id: "" },
    { text: "BUY", id: "BUY" },
    { text: "SELL", id: "SELL" },
  ];

  const statusDropDownList: DropDownListInterface[] = [
    { text: "All", id: "" },
    { text: "Executed", id: "" },
    { text: "Pending", id: "" },
    { text: "Cancelled", id: "" },
  ];

  useEffect(() => {
    const idVal = new URLSearchParams(window.location.search);
    const idQuery = idVal.get("id");
    setQueryParam((prev) => ({ ...prev, id: idQuery ?? "" }));
    setId(idQuery ?? "");
  }, []);
  return (
    <div>
      <p className="text-2xl font-work-sans-medium">Account #{data?.mt5Id}</p>
      <div className="mt-8">
        <div className="flex">
          <DropDownList
            dropDownList={filterDropDownList}
            selected={filterSelected}
            setSelected={setFilterSelected}
          >
            <div
              style={{ boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)" }}
              className="border border-[#BEBEBE80] justify-between min-w-[200px] flex bg-white rounded-lg px-4 py-2"
            >
              <p className="font-work-sans-medium lg:text-sm text-xs">
                {filterSelected}
              </p>
              <Image src={arrowDown} alt="" />
            </div>
          </DropDownList>
        </div>
      </div>
      {data && <TradeContainer tradeLink="" account={data} />}

      <div className="mt-6">
        <p className="lg:text-xl text-base font-work-sans-medium">Orders</p>
        <VisibleOnDesktop>
          <div className="flex items-center justify-between">
            <div>
              <SearchInput
                onChange={(e) => {
                  setQueryParam((prev) => ({ ...prev, keyword: e }));
                }}
              />
            </div>
            <div className="flex justify-end items-center gap-2">
              <div>
                <p className="text-[#707070] text-xs font-work-sans-regular mb-1">
                  Operations
                </p>
                <DropDownList
                  dropDownList={orderDropDownList}
                  selected={orderTypeSelected}
                  setSelected={setOrderTypeSelected}
                  setSelectedId={(e) => {
                    setQueryParam((prev) => ({ ...prev, type: e as string }));
                  }}
                >
                  <div>
                    <DropDownTextWrapper filterSelected={orderTypeSelected} />
                  </div>
                </DropDownList>
              </div>

              {/* <div>
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
              </div> */}
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
      </div>
      <div className="my-4">
        <VisibleOnDesktop>
          <OrderTable
            loading={tradingHistory.isPending}
            history={tradingHistory.data}
          />
        </VisibleOnDesktop>
        <VisibleOnMobile>
          {tradingHistory.isPending ? (
            <p>Loading...</p>
          ) : !tradingHistory.data ? (
            <TableEmptyState icon="" tableText="No Orders" />
          ) : (
            tradingHistory.data.map((item, index) => {
              return (
                <MobileOrderTable
                  history={item}
                  key={item.id}
                  index={index}
                  activeIndex={indexActive}
                  setActiveIndex={setIndexActive}
                />
              );
            })
          )}
        </VisibleOnMobile>
      </div>
    </div>
  );
};

export default AccountDetails;
