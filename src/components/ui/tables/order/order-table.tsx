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
import graphIcon from "@/assets/svgs/order-empty-icon.svg";
import { AccountHistory } from "@/types";
import { TableLoader } from "@/components/loaders/table-loader";
import { MoneyFormat } from "@/utils/money-format";
import { TableDate } from "@/utils/date-formatter";
import { useMemo } from "react";

export const OrderTable = ({
  history,
  loading,
}: {
  history: AccountHistory[];
  loading: boolean;
}) => {
  const columnHelper = createColumnHelper<AccountHistory>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("orderId", {
        id: "orderId",
        header: () => <TableText variant="header" text="Order Id" />,
        cell: (info) => <TableText variant="body" text={info.getValue()} />,
      }),
      columnHelper.accessor("symbol", {
        id: "symbol",
        header: () => <TableText variant="header" text="Currency Pair" />,
        cell: (info) => <TableText variant="body" text={info.getValue()} />,
      }),
      columnHelper.accessor("type", {
        id: "type",
        header: () => <TableText variant="header" text="Type" />,
        cell: (info) => <TableText variant="body" text={info.getValue()} />,
      }),
      // Executed price
      columnHelper.accessor("price", {
        id: "executedPrice",
        header: () => <TableText variant="header" text="Executed price" />,
        cell: (info) => (
          <TableText
            variant="body"
            text={`USD ${MoneyFormat(info.getValue())}`}
          />
        ),
      }),
      // Profit/Loss
      columnHelper.accessor("profit", {
        id: "profitLoss",
        header: () => <TableText variant="header" text="Profit/Loss" />,
        cell: (info) => (
          <>
            {info.getValue() < 0 ? (
              <p className="font-work-sans-regular text-[#D92D20]">
                -{`USD ${MoneyFormat(info.getValue())}`}
              </p>
            ) : (
              <p className="font-work-sans-regular text-[#202020]">
                +{`USD ${MoneyFormat(info.getValue())}`}
              </p>
            )}
          </>
        ),
      }),
      // Amount — if you actually have a separate amount field, use it here.
      // If not, keep price but make sure the column id is unique.

      // Status as a display column (not tied to any field)
      columnHelper.display({
        id: "status",
        header: () => <TableText variant="header" text="Status" />,
        cell: () => <TableStatus variant="SUCCESS" text="Completed" />,
      }),
      columnHelper.accessor("date", {
        id: "createdAt",
        header: () => <TableText variant="header" text="Created at" />,
        cell: (info) => (
          <TableText variant="body" text={TableDate(info.getValue())} />
        ),
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: history ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const isEmpty = !loading && (!history || history.length === 0);

  return (
    <>
      {loading ? (
        <TableLoader />
      ) : isEmpty ? (
        <TableEmptyState icon={graphIcon} tableText="No orders" />
      ) : (
        <div className="mt-4">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="min-w-full w-full">
                  {headerGroup.headers.map((header, index, rootData) => (
                    <th
                      key={header.id}
                      className={`bg-[#F0F4F8] p-4 ${
                        index === 0 ? "rounded-tl-2xl" : ""
                      } ${
                        index === rootData.length - 1 ? "rounded-tr-2xl" : ""
                      }`}
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
                  key={row.id}
                  style={{ boxShadow: "0px 4px 10px rgba(64, 64, 64, 0.05)" }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="bg-[#FEFEFE33]">
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
          <TablePagination />
        </div>
      )}
      {/* Mobile table */}
    </>
  );
};
