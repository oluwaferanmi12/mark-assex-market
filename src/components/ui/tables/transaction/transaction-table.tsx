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
import { useMemo, useState } from "react";
import Image from "next/image";
import horizontalEllipsis from "@/assets/svgs/horizontal-ellipsis.svg";
import { SideDrawerWrapper } from "@/components/shared/side-drawer/side-drawer";
import { ModalHeader } from "@/components/shared/modal-wrapper/modal-header";
import { ModalBody } from "@/components/shared/modal-wrapper/modal-body";
import cancelIcon from "@/assets/svgs/xIcon.svg";
import { ModalFooter } from "@/components/shared/modal-wrapper/modal-footer";
import { Button } from "@/components/ui/buttons/button";
import { Payment } from "@/types";
import { TableDate } from "@/utils/date-formatter";
import graphIcon from "@/assets/svgs/order-empty-icon.svg";
import { MoneyFormat } from "@/utils/money-format";
import { TableLoader } from "@/components/loaders/table-loader";
import { DateViewer } from "@/components/shared/wrappers/date-viewer";

type Props = {
  data?: Payment[];
  loading?: boolean; // NEW
};

export const TransactionTable = ({ data, loading = false }: Props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Payment | null>(null);

  const columnHelper = createColumnHelper<Payment>();
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
            text={"USD " + MoneyFormat(+info.getValue())}
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
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const hasData = (data?.length ?? 0) > 0;

  return (
    <>
      {/* Drawer */}
      <SideDrawerWrapper
        active={showSideDrawer}
        handleClose={() => setShowSideDrawer(false)}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <ModalHeader
              headText="Transaction History"
              handleCancel={() => setShowSideDrawer(false)}
            />
            <ModalBody>
              <div className="mt-4 flex flex-col h-full flex-1 justify-between">
                <div>
                  <div className="flex border-[#BEBEBE80] mb-2 items-center justify-between py-2 border-b border-dashed">
                    <p className="text-[#707070] font-work-sans-regular">ID</p>
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
                      Payment Type
                    </p>
                    <p className="text-[#111111] font-work-sans-regular">
                      {selectedTransaction?.type}
                    </p>
                  </div>
                  <div className="flex border-[#BEBEBE80] mb-2 items-center justify-between py-2 border-b border-dashed">
                    <p className="text-[#707070] font-work-sans-regular">
                      Status
                    </p>
                    <p className="text-[#111111] font-work-sans-regular">
                      <TableStatus
                        text={selectedTransaction?.status!}
                        variant={selectedTransaction?.status!}
                      />
                    </p>
                  </div>
                  <div className="flex border-[#BEBEBE80] mb-2 items-center justify-between py-2 border-b border-dashed">
                    <p className="text-[#707070] font-work-sans-regular">
                      Date
                    </p>
                    <p className="text-[#111111] font-work-sans-regular">
                      {TableDate(selectedTransaction?.createdAt ?? "")}
                    </p>
                  </div>
                  {selectedTransaction?.status === "FAILED" && (
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

      {/* CONTENT */}
      <div className="mt-4">
        {/* Loading skeleton */}
        {loading && <TableLoader />}

        {/* Table with data */}
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

        {/* Empty state */}
        {!loading && !hasData && (
          <TableEmptyState icon={graphIcon} tableText="No Transactions" />
        )}

        <TablePagination />
      </div>
    </>
  );
};
