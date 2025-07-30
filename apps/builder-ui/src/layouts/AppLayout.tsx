import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/shared/components/AppSidebar.tsx";
import {
  SidebarInset,
  SidebarProvider,
} from "@/shared/components/ui/sidebar.tsx";
import { AppHeader } from "@/shared/components/AppHeader.tsx";

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
