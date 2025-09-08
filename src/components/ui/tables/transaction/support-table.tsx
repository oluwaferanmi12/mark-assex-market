import { TablePagination } from "@/components/shared/pagination/table-pagination";
import { TableEmptyState } from "@/components/shared/states/empty/table-empty-state";
import { TableText } from "@/components/shared/table/table-text";
import { DateViewer } from "@/components/shared/wrappers/date-viewer";
import { SupportMessage, TicketQuery } from "@/types/support.types";
import graphIcon from "@/assets/svgs/order-empty-icon.svg";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { TableLoader } from "@/components/loaders/table-loader";
import horizontalEllipsis from "@/assets/svgs/horizontal-ellipsis.svg";
import Image from "next/image";
import { Dropdown, MenuProps } from "antd";
import checkIcon from "@/assets/svgs/drop-down-check-icon.svg";
import uncheckIcon from "@/assets/svgs/drop-down-unchecked.svg";
import { SupportChatDrawer } from "@/components/shared/side-drawer/support/support-chat-drawer";
import { TableStatus } from "../../status/table-status";
import { useGetTickets } from "@/hooks/queries/useSupport";
import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { SearchInput } from "../../inputs/search-input";
import { DropDownList } from "../../drop-down/dropdown-list";
import { DropDownTextWrapper } from "@/components/shared/wrappers/drop-down-text";
import { DropDownListInterface } from "@/interfaces/ui-interfac";
import { isPending } from "@reduxjs/toolkit";
import { VisibleOnMobile } from "@/components/shared/wrappers/visible-on-mobile";
import { MobileTransactionTable } from "./mobile-transaction-table";
import { MobileSupportTable } from "./mobile-support-table";

type Props = {
  data?: SupportMessage[];
  loading?: boolean;
};

export const SupportTable = () => {
  const columnHelper = createColumnHelper<SupportMessage>();
  const [optionActive, setOptionActive] = useState<
    "response" | "details" | undefined
  >();
  const [queryPayload, setQueryPayload] = useState<TicketQuery>({
    keyword: "",
    page: 1,
    perPage: 30,
    status: "",
  });
  const { data, isPending: loading } = useGetTickets(queryPayload);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState<SupportMessage>();
  const menuItem: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <div
          onClick={() => {
            setOptionActive("details");
          }}
          className="cursor-pointer flex items-center gap-2"
        >
          <Image
            src={optionActive === "details" ? checkIcon : uncheckIcon}
            alt=""
          />
          <p className="text-[#111111] text-sm font-work-sans-regular">
            View Details
          </p>
        </div>
      ),
    },
    {
      key: 2,
      label: (
        <div
          onClick={() => {
            setOptionActive("response");
            setShowChatModal(true);
          }}
          className="cursor-pointer flex items-center gap-2"
        >
          <Image
            src={optionActive === "response" ? checkIcon : uncheckIcon}
            alt=""
          />
          <p className="text-[#111111] text-sm font-work-sans-regular">
            View Response
          </p>
        </div>
      ),
    },
  ];
  const columns = useMemo(
    () => [
      columnHelper.accessor("ticketNumber", {
        cell: (info) => (
          <div className="flex justify-start pl-4">
            <TableText variant="body" text={info.getValue()} />
          </div>
        ),
        header: () => (
          <div className="flex justify-start ">
            <TableText variant="header" text="Ticket ID" />
          </div>
        ),
      }),
      columnHelper.accessor("issue", {
        cell: (info) => (
          <div className="flex justify-center pl-4">
            <TableText variant="body" text={info.getValue()} />
          </div>
        ),
        header: () => (
          <div className="flex justify-center ">
            <TableText variant="header" text="Title" />
          </div>
        ),
      }),
      columnHelper.accessor("status", {
        cell: (info) => (
          <div className="flex justify-center pl-4">
            <TableStatus
              text={info.getValue()}
              variant={info.getValue() === "OPEN" ? "PENDING" : "SUCCESS"}
            />
          </div>
        ),
        header: () => (
          <div className="flex justify-center ">
            <TableText variant="header" text="Status" />
          </div>
        ),
      }),
      columnHelper.accessor("createdAt", {
        cell: (info) => (
          <div className="flex justify-center pl-4">
            <DateViewer date={info.getValue()} />
          </div>
        ),
        header: () => (
          <div className="flex justify-center ">
            <TableText variant="header" text="Date Created" />
          </div>
        ),
      }),
      columnHelper.display({
        id: "action",
        cell: (info) => (
          <Dropdown trigger={["click"]} menu={{ items: menuItem }}>
            <div
              onClick={() => {
                setSelectedTicket(info.row.original);
                setActiveTicketId(info.row.original.id);
              }}
              className="flex justify-center cursor-pointer"
            >
              <Image src={horizontalEllipsis} alt="" />
            </div>
          </Dropdown>
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
  const [activeTickedId, setActiveTicketId] = useState("");
  const [statusSelected, setStatusSelected] = useState("All");
  const [showChatModal, setShowChatModal] = useState(false);
  const statusDropDownList: DropDownListInterface[] = [
    { text: "All", id: "" },
    { text: "Open", id: "OPEN" },
    { text: "Closed", id: "CLOSED" },
  ];

  const hasData = (data?.data.length ?? 0) > 0;

  useEffect(() => {
    setQueryPayload((prev) => ({
      ...prev,
      status: statusSelected === "All" ? "" : statusSelected,
    }));
  }, [statusSelected]);

  return (
    <>
      <SupportChatDrawer
        key={activeTickedId}
        activeTicketId={activeTickedId}
        showChatModal={showChatModal}
        handleClose={() => {
          setActiveTicketId("");
          setShowChatModal(false);
        }}
        ticket={selectedTicket}
      />
      <div className="mt-4">
        {/* Loading skeleton */}
        {loading && <TableLoader />}

        <VisibleOnDesktop>
          <div className="flex justify-between items-end mb-4">
            <div>
              <SearchInput
                onChange={(e) => {
                  // setSearchValue(e);
                  setQueryPayload((prev) => ({ ...prev, keyword: e }));
                }}
              />
            </div>
            <div className="flex items-center gap-3">
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
        <VisibleOnDesktop>
          {/* Table with data */}
          {!loading && hasData && (
            <>
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="min-w-full w-full">
                      {headerGroup.headers.map((header, index, rootData) => (
                        <th
                          className={`bg-[#F0F4F8] p-4 ${
                            index === 0 ? "rounded-tl-2xl" : ""
                          } ${
                            index === rootData.length - 1
                              ? "rounded-tr-2xl"
                              : ""
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
                        // setSelectedTransaction(row.original);
                        // setShowSideDrawer(true);
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
            </>
          )}
        </VisibleOnDesktop>

        {/* Empty state */}
        {!loading && !hasData && (
          <TableEmptyState icon={graphIcon} tableText="No Support " />
        )}

        <VisibleOnMobile>
          <div className="my-4">
            {data?.data?.length ? (
              data.data?.map((item, index) => {
                return (
                  <MobileSupportTable
                    message={item}
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
            nextPage={data?.nextPage}
            handleNext={() => {
              setQueryPayload((prev) => ({
                ...prev,
                page: data?.nextPage ?? 0,
              }));
            }}
            handlePrev={() => {
              setQueryPayload((prev) => ({
                ...prev,
                page: data?.prevPage ?? 0,
              }));
            }}
            prevPage={data?.prevPage}
            total={data?.total}
            totalPages={data?.totalPages}
          />
        )}
      </div>
    </>
  );
};
