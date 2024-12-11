/* eslint-disable no-unused-vars */
"use client";

import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { CheckIcon, Languages } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import clsx from "clsx";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
  align: "start" | "center" | "end";
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  align,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <Languages className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side={"bottom"} align={align}>
          {items.map((item) => (
            <DropdownMenuItem
              onClick={() => onChange(item.value)}
              key={item.value}
              className={clsx(
                "flex cursor-default items-center px-3 py-2 text-base data-[highlighted]:bg-slate-100",
                isPending && "pointer-events-none"
              )}
            >
              <div className="mr-2 w-[0.5rem]">
                {item.value === defaultValue && (
                  <CheckIcon className="h-4 w-4 text-slate-600" />
                )}
              </div>
              <span className="text-slate-900 text-xs ">{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
