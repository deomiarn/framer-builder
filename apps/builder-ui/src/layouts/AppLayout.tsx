import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/shared/components/AppSidebar.tsx";
import {
  SidebarInset,
  SidebarProvider,
} from "@/shared/components/ui/sidebar.tsx";
import { AppHeader } from "@/shared/components/AppHeader.tsx";
import { Toaster } from "sonner";

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="p-4">
          <Outlet />
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
};
