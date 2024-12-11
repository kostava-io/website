"use client";

import Link from "next/link";
import * as React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";

import LocaleSwitcherSelect from "@/components/customs/LocaleSwitcherSelect";
import { ModeToggle } from "@/components/customs/ModeToggle";

interface MenuItem {
  title: string;
  href: string;
}

function MobileMenu({
  menuItems,
  locale,
}: {
  menuItems: MenuItem[];
  locale: string;
}) {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations();

  return (
    <div className="md:flex flex-row hidden">
      <ModeToggle align="end" />
      <LocaleSwitcherSelect
        align="end"
        defaultValue={locale}
        items={[
          {
            value: "ka",
            label: t("locale.ka"),
          },
          {
            value: "en",
            label: t("locale.en"),
          },
        ]}
        label={t("locale.label")}
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="p-0">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="h-full backdrop-blur">
          <nav className="flex flex-col items-center gap-4 mt-12">
            {menuItems.map((item) => (
              <React.Fragment key={item.title}>
                <Link
                  href={item.href}
                  className="font-medium py-2"
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function Header() {
  const t = useTranslations();
  const locale = useLocale();

  const menuItems = [
    // { title: t("home"), href: "/" },
    { title: t("header.about"), href: "/about" },
    { title: t("header.map"), href: "/map" },
    { title: t("header.prisoners"), href: "/prisoners" },
    { title: t("header.protests"), href: "/protests" },
  ];
  return (
    <header className="flex flex-row justify-between px-4 py-2">
      <Link href="/" className="font-extrabold text-xl self-center">
        {t("header.title")}
      </Link>
      <nav className="flex md:hidden gap-4">
        {menuItems.map((item) => (
          <React.Fragment key={item.title}>
            <Link href={item.href} className="font-medium text-base py-2">
              {item.title}
            </Link>
          </React.Fragment>
        ))}
        <ModeToggle align="end" />
        <LocaleSwitcherSelect
          align="end"
          defaultValue={locale}
          items={[
            {
              value: "ka",
              label: t("locale.ka"),
            },
            {
              value: "en",
              label: t("locale.en"),
            },
          ]}
          label={t("locale.label")}
        />
      </nav>
      <MobileMenu locale={locale} menuItems={menuItems} />
    </header>
  );
}
