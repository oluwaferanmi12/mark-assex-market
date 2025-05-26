"use client";

import { TablePagination } from "@/components/shared/pagination/table-pagination";
import { TableEmptyState } from "@/components/shared/states/empty/table-empty-state";
import { TableText } from "@/components/shared/table/table-text";
import { TableStatus } from "@/components/ui/status/table-status";
import { orderData } from "@/data/drop-down-data";
import { OrderInterface } from "@/interfaces/ui-interfac";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import graphIcon from "@/assets/svgs/order-empty-icon.svg"

export const OrderTable = () => {
  const columnHelper = createColumnHelper<OrderInterface>();
  const columns = [
    columnHelper.accessor("currency", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Currency" />,
    }),
    columnHelper.accessor("type", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Type" />,
    }),
    columnHelper.accessor("orderType", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Order type" />,
    }),
    columnHelper.accessor("executedPrice", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Executed price" />,
    }),
    columnHelper.accessor("profit", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Profit/Loss" />,
    }),
    columnHelper.accessor("amount", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Amount" />,
    }),
    columnHelper.accessor("status", {
      cell: (info) => <TableStatus variant="Success" text="Executed" />,
      header: (info) => <TableText variant="header" text="Status" />,
    }),
    columnHelper.accessor("createdAt", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Created at" />,
    }),
  ];
  const [data, setData] = useState(orderData);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
    <TableEmptyState icon={graphIcon} tableText="No orders" />
      <div className="mt-4 ">
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
                  style={{
                    boxShadow: "0px 4px 10px rgba(64, 64, 64, 0.05)",
                  }}
                  className=""
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
      {/* Mobile table  */}
      
    </>
  );
};
