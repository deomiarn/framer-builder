import { useMatches } from "react-router-dom";
import { SidebarTrigger } from "@/shared/components/ui/sidebar.tsx";
import { Separator } from "@radix-ui/react-separator";

interface RouteHandle {
  title?: string;
}

export const AppHeader = () => {
  const matches = useMatches() as Array<{ handle?: RouteHandle }>;
  const pageTitle =
    [...matches].reverse().find((m) => m.handle?.title)?.handle!.title ??
    "Templyne";

  return (
    <header className="flex h-16 items-center border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mx-4 h-6" />
      <h1 className="text-lg font-semibold">{pageTitle}</h1>
    </header>
  );
};
