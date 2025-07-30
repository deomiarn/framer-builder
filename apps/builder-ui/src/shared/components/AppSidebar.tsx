// src/components/AppSidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/shared/components/ui/sidebar.tsx";
import { Blocks, Home, Palette, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const nav = [
  {
    title: "Builder",
    items: [
      { title: "Dashboard", to: "/", icon: Home },
      { title: "Projects", to: "/projects", icon: Blocks },
      { title: "Theme", to: "/theme", icon: Palette },
    ],
  },
  {
    title: "Settings",
    items: [
      { title: "Account", to: "/account", icon: Settings },
      { title: "Billing", to: "/billing", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-3 text-lg font-semibold">Templyne</div>
      </SidebarHeader>
      <SidebarContent>
        {nav.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          [
                            "flex items-center gap-2",
                            isActive
                              ? "text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground",
                          ].join(" ")
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
