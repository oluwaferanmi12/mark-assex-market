"use client";

import { TablePagination } from "@/components/shared/pagination/table-pagination";
import { TableEmptyState } from "@/components/shared/states/empty/table-empty-state";
import { TableText } from "@/components/shared/table/table-text";
import { analyticsData } from "@/data/drop-down-data";
import {
  AnalyticsDataInterface,
  OrderInterface,
} from "@/interfaces/ui-interfac";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import graphIcon from "@/assets/svgs/order-empty-icon.svg";
import bearishIcon from "@/assets/svgs/bearishIcon.svg";
import bullishIcon from "@/assets/svgs/bullishIcon.svg";

export const AnalyticsTable = () => {
  const columnHelper = createColumnHelper<AnalyticsDataInterface>();
  const columns = [
    columnHelper.accessor("pair", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Pair" />,
    }),
    columnHelper.accessor("openPrice", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Open Price" />,
    }),
    columnHelper.accessor("currentPrice", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Current Price" />,
    }),
    columnHelper.accessor("change", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="%Change" />,
    }),
    columnHelper.accessor("trend", {
      cell: (info) => (
        <TableText
          icon={info.getValue() === "Bullish" ? bullishIcon : bearishIcon}
          variant="body"
          text={info.getValue()}
        />
      ),
      header: (info) => <TableText variant="header" text="Trend" />,
    }),
    columnHelper.accessor("date", {
      cell: (info) => <TableText variant="body" text={info.getValue()} />,
      header: (info) => <TableText variant="header" text="Date" />,
    }),
  ];
  const [data, setData] = useState(analyticsData);
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
