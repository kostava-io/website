import Link from "next/link";

const navItems = {
  "./robocops": {
    name: "Robocops",
  },
};

export function Main() {
  return (
    <div className="flex h-full w-full items-center justify-center relative">
      <div className="glitch" />
      <nav className="flex flex-col items-center justify-center gap-8 z-10">
        {Object.entries(navItems).map(([path, { name }]) => {
          return (
            <Link
              key={path}
              href={"/" + path}
              className="text-7xl transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-1 px-2"
            >
              {name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
