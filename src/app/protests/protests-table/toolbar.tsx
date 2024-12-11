import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { ToolbarView } from "./toolbar-view";
import { useTranslations } from "next-intl";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function PrisonersToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          type="search"
          placeholder={t("protests.search")}
          value={
            (table.getColumn("protest_title")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("protest_title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="space-x-2 flex">
        <ToolbarView table={table} />
      </div>
    </div>
  );
}
