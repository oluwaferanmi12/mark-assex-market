"use client";

import { TablePagination } from "@/components/shared/pagination/table-pagination";
import { TableEmptyState } from "@/components/shared/states/empty/table-empty-state";
import { TableText } from "@/components/shared/table/table-text";
import { TableStatus } from "@/components/ui/status/table-status";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import horizontalEllipsis from "@/assets/svgs/horizontal-ellipsis.svg";
import { SideDrawerWrapper } from "@/components/shared/side-drawer/side-drawer";
import { ModalHeader } from "@/components/shared/modal-wrapper/modal-header";
import { ModalBody } from "@/components/shared/modal-wrapper/modal-body";
import cancelIcon from "@/assets/svgs/xIcon.svg";
import { Button } from "@/components/ui/buttons/button";
import { Payment, PaymentMethodTypes, PaymentQueries } from "@/types";
import graphIcon from "@/assets/svgs/order-empty-icon.svg";
import { MoneyFormat } from "@/utils/money-format";
import { TableLoader } from "@/components/loaders/table-loader";
import { DateViewer } from "@/components/shared/wrappers/date-viewer";
import transactionSuccessIcon from "@/assets/svgs/transaction-success-icon.svg";
import failedIcon from "@/assets/svgs/transaction-failed-icon.svg";
import { VisibleOnMobile } from "@/components/shared/wrappers/visible-on-mobile";
import { MobileTransactionTable } from "./mobile-transaction-table";
import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { DropDownListInterface } from "@/interfaces/ui-interfac";
import { SearchInput } from "../../inputs/search-input";
import { DropDownList } from "../../drop-down/dropdown-list";
import { DropDownTextWrapper } from "@/components/shared/wrappers/drop-down-text";
import mobileFilterIcon from "@/assets/svgs/mobile-filter.svg";
import { MobileInput } from "../../inputs/mobile-table-input";
import { useGetPayments } from "@/hooks/queries/usePayment";
import pendingIcon from "@/assets/svgs/pending-icon.svg";
import { TransactionFilter } from "../../modal/transaction/transaction-filter";
import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import { Col, Row } from "antd";
import { ModalFooter } from "@/components/shared/modal-wrapper/modal-footer";

export const TransactionTable = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [payloadQuery, setPayloadQuery] = useState<PaymentQueries>({
    status: "",
    type: "",
    keyword: "",
    methodSlug: "",
    page: 1,
    perPage: 20,
  });
  const { data, isPending: loading } = useGetPayments(payloadQuery);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Payment | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [statusSelected, setStatusSelected] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [typeSelected, setTypeSelected] = useState("All");

  const columnHelper = createColumnHelper<Payment>();
  const [showFilter, setShowFilter] = useState(false);
  const columns = useMemo(
    () => [
      columnHelper.accessor("reference", {
        cell: (info) => (
          <div className="flex justify-start pl-4">
            <TableText variant="body" text={info.getValue()} />
          </div>
        ),
        header: () => (
          <div className="flex justify-start ">
            <TableText variant="header" text="ID" />
          </div>
        ),
      }),
      columnHelper.accessor("amount", {
        cell: (info) => (
          <TableText
            variant="body"
            text={
              info.row.original.currency +
              " " +
              MoneyFormat(+(info.row.original.amountInCurrency ?? 0))
            }
          />
        ),
        header: () => <TableText variant="header" text="Amount" />,
      }),
      columnHelper.accessor("type", {
        cell: (info) => <TableText variant="body" text={info.getValue()} />,
        header: () => <TableText variant="header" text="Type" />,
      }),
      columnHelper.accessor("method", {
        cell: (info) => (
          <TableText
            variant="body"
            text={info.getValue()?.name ?? "Internal Transfer"}
          />
        ),
        header: () => <TableText variant="header" text="Payment Method" />,
      }),
      columnHelper.accessor("createdAt", {
        cell: (info) => (
          <div className="flex items-center justify-center">
            <DateViewer date={info.getValue()} />
          </div>
        ),
        header: () => <TableText variant="header" text="Date" />,
      }),
      columnHelper.accessor("status", {
        cell: (info) => (
          <TableStatus variant={info.getValue()} text={info.getValue()} />
        ),
        header: () => <TableText variant="header" text="Status" />,
      }),
      columnHelper.display({
        id: "action",
        cell: () => (
          <div className="flex justify-center">
            <Image src={horizontalEllipsis} alt="" />
          </div>
        ),
        header: () => <TableText variant="header" text="Action" />,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const hasData = (data?.data?.length ?? 0) > 0;
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
      perPage: 30,
    }));
  }, [typeSelected, statusSelected, methodSelected, searchValue]);

  return (
    <>
      {/* Drawer */}

      <ModalContainer
        active={showFilter}
        handleClose={() => {
          setShowFilter(false);
        }}
      >
        <ModalBody>
          <div>
            <p className="text-[#202020] font-work-sans-medium text-base">
              Filters
            </p>
          </div>
          <Row className="mt-4">
            <Col xs={24}>
              <div className="mb-3">
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
            </Col>
            <Col xs={24}>
              <div className="mb-3">
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
            </Col>
            <Col xs={24}>
              <div className="mb-3">
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
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <div className="mb-2">
            <Button
              variant="green-faded-border"
              fullWidth
              text="Clear all"
              action={() => {
                setMethodSelected("");
                setTypeSelected("");
                setStatusSelected("");
              }}
              loading={false}
            />
          </div>
          <div>
            <Button
              variant="green-bg"
              fullWidth
              text="Filter"
              action={() => {
                setShowFilter(false);
              }}
              loading={false}
            />
          </div>
        </ModalFooter>
      </ModalContainer>

      <SideDrawerWrapper
        active={showSideDrawer}
        handleClose={() => setShowSideDrawer(false)}
        fullHeight
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <ModalHeader
              headText="Transaction Details"
              handleCancel={() => setShowSideDrawer(false)}
            />
            <ModalBody>
              <div className="flex items-center flex-col justify-center">
                <Image
                  src={
                    selectedTransaction?.status === "SUCCESS"
                      ? transactionSuccessIcon
                      : selectedTransaction?.status === "PENDING"
                      ? pendingIcon
                      : failedIcon
                  }
                  className="mb-2"
                  alt=""
                />
                <TableStatus
                  text={
                    selectedTransaction?.status === "SUCCESS"
                      ? "Completed"
                      : selectedTransaction?.status === "PENDING"
                      ? "Pending"
                      : "Failed"
                  }
                  variant={selectedTransaction?.status ?? "PENDING"}
                />
                <div>
                  <p className="text-[#1F0D3F] mt-2 text-[32px] font-work-sans-semi-bold">
                    {`${selectedTransaction?.currency} ${MoneyFormat(
                      +(selectedTransaction?.amountInCurrency ?? "")
                    )}`}
                  </p>
                </div>
                <p className="text-[#404040] text-xs font-work-sans-regular">
                  {selectedTransaction?.method.name}
                </p>
              </div>
              <div className="mt-4 flex flex-col h-full flex-1 justify-between">
                <div>
                  <div className="flex border-[#BEBEBE80] mb-2 items-center justify-between py-2 border-b border-dashed">
                    <p className="text-[#707070] font-work-sans-regular">
                      Transaction ID
                    </p>
                    <p className="text-[#111111] font-work-sans-regular">
                      {selectedTransaction?.reference}
                    </p>
                  </div>
                  <div className="flex border-[#BEBEBE80] mb-2 items-center justify-between py-2 border-b border-dashed">
                    <p className="text-[#707070] font-work-sans-regular">
                      Amount
                    </p>
                    <p className="text-[#111111] font-work-sans-regular">
                      {"USD " +
                        MoneyFormat(+(selectedTransaction?.amount ?? 0))}
                    </p>
                  </div>
                  <div className="flex border-[#BEBEBE80] mb-2 items-center justify-between py-2 border-b border-dashed">
                    <p className="text-[#707070] font-work-sans-regular">
                      Conversion Rate
                    </p>
                    <p className="text-[#111111] font-work-sans-regular">
                      {`${MoneyFormat(
                        +(selectedTransaction?.amount ?? 0)
                      )} USD = ${selectedTransaction?.currency} ${MoneyFormat(
                        +(selectedTransaction?.amountInCurrency ?? 0)
                      )}`}
                    </p>
                  </div>
                  <div className="flex border-[#BEBEBE80] mb-2 items-center justify-between py-2 border-b border-dashed">
                    <p className="text-[#707070] font-work-sans-regular">
                      Payment Type
                    </p>
                    <p className="text-[#111111] font-work-sans-regular">
                      {selectedTransaction?.type}
                    </p>
                  </div>
                  <div className="flex border-[#BEBEBE80] mb-2 items-center justify-between py-2 border-b border-dashed">
                    <p className="text-[#707070] font-work-sans-regular">
                      Payment Method
                    </p>
                    <p className="text-[#111111] font-work-sans-regular">
                      {selectedTransaction?.method.name}
                    </p>
                  </div>
                  <div className="flex border-[#BEBEBE80] mb-2 items-center justify-between py-2 border-b border-dashed">
                    <p className="text-[#707070] font-work-sans-regular">
                      Status
                    </p>
                    <p className="text-[#111111] font-work-sans-regular">
                      {selectedTransaction?.status}
                    </p>
                  </div>
                  <div className="flex border-[#BEBEBE80] mb-2 items-center justify-between py-2 border-b border-dashed">
                    <p className="text-[#707070] font-work-sans-regular">
                      Date
                    </p>
                    <p className="text-[#111111] font-work-sans-regular">
                      <DateViewer date={selectedTransaction?.createdAt!} />
                    </p>
                  </div>
                  {selectedTransaction?.status === "FAILED" &&
                    selectedTransaction.reason && (
                      <div className="mt-8">
                        <p className="text-[#707070] font-work-sans-regular">
                          Reason
                        </p>
                        <div className="mt-1 bg-[#F40E0E1A] rounded-lg gap-2 p-2 flex items-center">
                          <div className="">
                            <Image
                              src={cancelIcon}
                              className="w-[30px] h-[30px]"
                              alt=""
                            />
                          </div>
                          <div className="font-work-sans-regular text-[#202020]">
                            <span className="font-work-sans-medium">
                              {selectedTransaction.reason}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </ModalBody>
          </div>
          <div className="p-4">
            <Button
              fullWidth
              action={() => {
                setShowSideDrawer(false);
              }}
              loading={false}
              text="Close"
              variant="green-bg"
            />
          </div>
        </div>
      </SideDrawerWrapper>

      <div className="mt-4">
        <VisibleOnDesktop>
          <div className="flex justify-between items-end mb-3">
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
                onClick={() => {
                  setShowFilter(true);
                }}
              />
            </div>
          </div>
        </VisibleOnMobile>
        <VisibleOnDesktop>
          {loading && <TableLoader />}
          {!loading && hasData && (
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="min-w-full w-full">
                    {headerGroup.headers.map((header, index, rootData) => (
                      <th
                        className={`bg-[#F0F4F8] p-4 ${
                          index === 0 ? "rounded-tl-2xl" : ""
                        } ${
                          index === rootData.length - 1 ? "rounded-tr-2xl" : ""
                        }`}
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    onClick={() => {
                      setSelectedTransaction(row.original);
                      setShowSideDrawer(true);
                    }}
                    style={{
                      boxShadow: "0px 4px 10px rgba(64, 64, 64, 0.05)",
                    }}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td className="bg-[#FEFEFE33]" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && !hasData && (
            <TableEmptyState icon={graphIcon} tableText="No Transactions" />
          )}
        </VisibleOnDesktop>

        <VisibleOnMobile>
          <div className="my-4">
            {data?.data?.length ? (
              data.data?.map((item, index) => {
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

        {hasData && (
          <TablePagination
            currentPage={data?.currentPage}
            nextPage={data?.nextPage}
            prevPage={data?.prevPage}
            handleNext={() => {
              setPayloadQuery((prev) => ({
                ...prev,
                page: data?.nextPage ?? 1,
              }));
            }}
            handlePrev={() => {
              setPayloadQuery((prev) => ({
                ...prev,
                page: data?.prevPage ?? 1,
              }));
            }}
            total={data?.total}
            totalPages={data?.totalPages}
          />
        )}
      </div>
    </>
  );
};
