import { TablePagination } from "@/components/shared/pagination/table-pagination";
import { TableEmptyState } from "@/components/shared/states/empty/table-empty-state";
import { TableText } from "@/components/shared/table/table-text";
import { DateViewer } from "@/components/shared/wrappers/date-viewer";
import { SupportMessage } from "@/types/support.types";
import graphIcon from "@/assets/svgs/order-empty-icon.svg";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { TableLoader } from "@/components/loaders/table-loader";

type Props = {
  data?: SupportMessage[];
  loading?: boolean;
};

export const SupportTable = ({ data, loading = false }: Props) => {
  const columnHelper = createColumnHelper<SupportMessage>();
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
          <div className="flex justify-start pl-4">
            <TableText variant="body" text={info.getValue()} />
          </div>
        ),
        header: () => (
          <div className="flex justify-start ">
            <TableText variant="header" text="Title" />
          </div>
        ),
      }),
      columnHelper.accessor("status", {
        cell: (info) => (
          <div className="flex justify-start pl-4">
            <TableText variant="body" text={info.getValue()} />
          </div>
        ),
        header: () => (
          <div className="flex justify-start ">
            <TableText variant="header" text="Status" />
          </div>
        ),
      }),
      columnHelper.accessor("createdAt", {
        cell: (info) => (
          <div className="flex justify-start pl-4">
            <TableText variant="body" text={info.getValue()} />
            <DateViewer date={info.getValue()} />
          </div>
        ),
        header: () => (
          <div className="flex justify-start ">
            <TableText variant="header" text="Date Created" />
          </div>
        ),
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
        )}

        {/* Empty state */}
        {!loading && !hasData && (
          <TableEmptyState icon={graphIcon} tableText="No Transactions" />
        )}

        {hasData && <TablePagination />}
      </div>
    </>
  );
};
