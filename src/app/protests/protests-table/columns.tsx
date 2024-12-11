"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { ColumnHeader } from "./column-header";
import Link from "next/link";

export function useColumns(): ColumnDef<any>[] {
  const t = useTranslations();

  return [
    {
      accessorKey: "protest_date",
      header: ({ column }) => (
        <ColumnHeader column={column} title={t("protests.protest_date")} />
      ),
      cell: ({ row }) => {
        return (
          <div className="max-w-[200px] truncate text-xs">
            {row.getValue("protest_date")}
          </div>
        );
      },
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "protest_title",
      header: ({ column }) => (
        <ColumnHeader column={column} title={t("protests.protest_title")} />
      ),
      cell: ({ row }) => {
        return (
          <div className="max-w-[200px] truncate text-xs">
            {row.getValue("protest_title")}
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "protest_location",
      header: ({ column }) => (
        <ColumnHeader column={column} title={t("protests.protest_location")} />
      ),
      cell: ({ row }) => {
        return (
          <div className="truncate text-xs">
            {row.getValue("protest_location")}
          </div>
        );
      },
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "protest_source",
      header: ({ column }) => (
        <ColumnHeader column={column} title={t("protests.protest_source")} />
      ),
      cell: ({ row }) => {
        return (
          <div className="max-w-[200px] truncate text-xs">
            <Link href={`${row.getValue("protest_source")}`}>
              {row.getValue("protest_source")}
            </Link>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
