import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { SidebarItem } from "./sidebar-layout";

interface AppSidebarProps {
  categories: SidebarItem[];
  categoryName: string;
}

export function AppSidebar({ categories, categoryName }: AppSidebarProps) {
  return (
    <Sidebar className="sticky top-40 h-fit">
      <SidebarContent>
        <SidebarGroup className="transition-colors duration-500 ease-out">
          <SidebarGroupLabel>{categoryName}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
