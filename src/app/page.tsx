import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <div className="flex flex-1 items-center justify-center h-full">
      <div className="glitch flex basis-1/2 md:basis-full	justify-center items-center h-[30vh]">
        <h1 className="text-7xl md:text-6xl font-bold tracking-tighter">
          {t("home.title")}
        </h1>
      </div>
    </div>
  );
}
