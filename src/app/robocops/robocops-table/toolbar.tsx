import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/customs/DataTableViewOptions";
import { useTranslations } from "next-intl";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function RobocopsToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          type="search"
          placeholder={t("robocops.search")}
          value={
            (table.getColumn("full_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("full_name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="space-x-2 flex">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
