"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { ColumnHeader } from "./column-header";

export function useColumns(): ColumnDef<any>[] {
  const t = useTranslations();

  return [
    {
      accessorKey: "Number",
      header: t("prisoners.number"),
      cell: ({ row }) => {
        return (
          <div className="max-w-[200px] truncate text-xs">
            {row.getValue("number")}
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "full_name",
      header: ({ column }) => (
        <ColumnHeader column={column} title={t("prisoners.full_name")} />
      ),
      cell: ({ row }: { row: any }) => {
        return <div className="max-w-[400px]">{row.getValue("full_name")}</div>;
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "location",
      header: t("prisoners.location"),
      cell: ({ row }) => {
        return (
          <div className="max-w-[300px] truncate text-xs">
            {row.getValue("location")}
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "last_update",
      header: t("prisoners.last_update"),
      cell: ({ row }) => {
        return (
          <div className="max-w-[400px] truncate text-xs">
            {row.getValue("last_update")}
          </div>
        );
      },
    },
    {
      accessorKey: "image_url",
      header: t("prisoners.image_url"),
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
