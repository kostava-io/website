"use client";

import { useState, useRef } from "react";
import { db } from "@/providers/data-provider";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import {
  // Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import { PrisonersToolbar } from "./toolbar";
import { useColumns } from "./columns";
import { useTranslations } from "next-intl";
// import { useVirtualizer } from "@tanstack/react-virtual";

export function PrisonersTable() {
  const t = useTranslations();
  const { data } = db.useQuery({ prisoners: {} });
  const columns = useColumns();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    columns: columns,
    data: data?.prisoners ?? [],
    state: {
      columnFilters,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
  });

  // const { rows } = table.getRowModel();
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // const rowVirtualizer = useVirtualizer({
  //   count: rows.length,
  //   estimateSize: () => 48,
  //   getScrollElement: () => tableContainerRef.current,
  //   measureElement:
  //     typeof window !== "undefined" &&
  //     navigator.userAgent.indexOf("Firefox") === -1
  //       ? (element) => element?.getBoundingClientRect().height
  //       : undefined,
  //   overscan: 5,
  // });

  return (
    <div className="px-4 w-full h-full">
      <PrisonersToolbar table={table} />
      <div ref={tableContainerRef} className="rounded-md border mt-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t("robocops.no_data")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
