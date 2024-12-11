"use client";

import { useTranslations } from "next-intl";
import { TypeAnimation } from "react-type-animation";

export default function About() {
  const t = useTranslations("about");
  return (
    <div className="flex flex-1 items-start justify-center relative">
      <p className="p-4 text-base text-left font-regular basis-2/4 md:basis-full">
        <TypeAnimation
          sequence={[t("content")]}
          wrapper="span"
          speed={50}
          repeat={0}
        />
      </p>
    </div>
  );
}
