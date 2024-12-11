"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { ColumnHeader } from "./column-header";

export function useColumns(): ColumnDef<any>[] {
  const t = useTranslations();

  return [
    {
      accessorKey: "full_name",
      header: ({ column }) => (
        <ColumnHeader column={column} title={t("robocops.full_name")} />
      ),
      cell: ({ row }: { row: any }) => {
        return <div className="max-w-[400px]">{row.getValue("full_name")}</div>;
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "personal_number",
      header: t("robocops.personal_number"),
      cell: ({ row }) => {
        return (
          <div className="max-w-[300px] truncate text-xs">
            {row.getValue("personal_number")}
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "birth_date",
      header: t("robocops.birth_date"),
      cell: ({ row }) => {
        return (
          <div className="max-w-[300px] truncate text-xs">
            {row.getValue("birth_date")}
          </div>
        );
      },
    },
    {
      accessorKey: "address",
      header: t("robocops.address"),
      cell: ({ row }) => {
        return (
          <div className="max-w-[400px] truncate text-xs">
            {row.getValue("address")}
          </div>
        );
      },
    },
    {
      accessorKey: "image_url",
      header: t("robocops.image_url"),
      cell: ({ row }) => {
        const image = row.getValue("image_url");

        return (
          <a
            target={"_blank"}
            href={image as string}
            className={"flex justify-center items-center"}
          >
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="w-full rounded-md"
                src={row.getValue("image_url")}
                alt={row.getValue("full_name")}
              />
            ) : (
              <></>
            )}
          </a>
        );
      },
    },
  ];
}
