"use client";

import { TablePagination } from "@/components/shared/pagination/table-pagination";
import { TableEmptyState } from "@/components/shared/states/empty/table-empty-state";
import { TableText } from "@/components/shared/table/table-text";
import { TableStatus } from "@/components/ui/status/table-status";
import { bonusData, orderData } from "@/data/drop-down-data";
import { BonusInterface, OrderInterface } from "@/interfaces/ui-interfac";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import Image from "next/image";
import horizontalEllipsis from "@/assets/svgs/horizontal-ellipsis.svg";

export const BonusTable = () => {
  const columnHelper = createColumnHelper<BonusInterface>();
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="ID" />,
    }),
    columnHelper.accessor("amount", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Amount(USD)" />,
    }),
    columnHelper.accessor("type", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Type" />,
    }),
    columnHelper.accessor("status", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Status" />,
    }),
    columnHelper.accessor("date", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Date Issued" />,
    }),
    columnHelper.accessor("expiryDate", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Expiry Date" />,
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
  const [data, setData] = useState(bonusData);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
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
