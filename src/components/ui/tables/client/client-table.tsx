"use client";

import { TablePagination } from "@/components/shared/pagination/table-pagination";
import { TableEmptyState } from "@/components/shared/states/empty/table-empty-state";
import { TableText } from "@/components/shared/table/table-text";
import { TableStatus } from "@/components/ui/status/table-status";
import { clientData, orderData, transactionData } from "@/data/drop-down-data";
import {
  ClientInterface,
  OrderInterface,
  TransactionInterface,
} from "@/interfaces/ui-interfac";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import graphIcon from "@/assets/svgs/order-empty-icon.svg";
import Image from "next/image";
import horizontalEllipsis from "@/assets/svgs/horizontal-ellipsis.svg";
import { SideDrawerWrapper } from "@/components/shared/side-drawer/side-drawer";
import { ModalHeader } from "@/components/shared/modal-wrapper/modal-header";
import { ModalBody } from "@/components/shared/modal-wrapper/modal-body";
import cancelIcon from "@/assets/svgs/xIcon.svg";
import { ModalFooter } from "@/components/shared/modal-wrapper/modal-footer";
import { Button } from "@/components/ui/buttons/button";
import { DateViewer } from "@/components/shared/wrappers/date-viewer";
import { useRouter } from "next/navigation";

export const ClientTable = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const router = useRouter();

  const columnHelper = createColumnHelper<ClientInterface>();
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Client Name" />,
    }),
    columnHelper.accessor("email", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Email Address" />,
    }),
    columnHelper.accessor("phone", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Phone No." />,
    }),
    columnHelper.accessor("ibAccount", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Linked IB Account" />,
    }),
    columnHelper.accessor("status", {
      cell: (info) => (
        <>
          <TableStatus
            text={info.getValue()}
            variant={info.getValue() === "Active" ? "SUCCESS" : "FAILED"}
          />
        </>
      ),
      header: (info) => <TableText variant="header" text="Status" />,
    }),
    columnHelper.accessor("date", {
      cell: (info) => (
        <div className="flex justify-center">
          <DateViewer date="" />
        </div>
      ),
      header: (info) => <TableText variant="header" text="Date" />,
    }),
    columnHelper.accessor("status", {
      cell: (info) => <TableStatus variant="SUCCESS" text="Success" />,
      header: (info) => <TableText variant="header" text="Status" />,
    }),
    columnHelper.display({
      id: "action",
      cell: (info) => (
        <div className="flex justify-center">
          <Image src={horizontalEllipsis} alt="" />
        </div>
      ),
      header: (info) => <TableText variant="header" text="Action" />,
    }),
  ];
  const [data, setData] = useState(clientData);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      {/* <TableEmptyState icon={graphIcon} tableText="No Transactions" /> */}
      <div className="mt-4">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr className="  min-w-full w-full">
                  {headerGroup.headers.map((header, index, rootData) => {
                    return (
                      <th
                        className={`bg-[#F0F4F8]  p-4 ${
                          index === 0 && "rounded-tl-2xl"
                        } ${index === rootData.length - 1 && "rounded-tr-2xl"}`}
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  onClick={() => {
                    router.push("/partnership/clients/details");
                  }}
                  style={{
                    boxShadow: "0px 4px 10px rgba(64, 64, 64, 0.05)",
                  }}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td className="bg-[#FEFEFE33]" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <TablePagination />
      </div>
    </>
  );
};
