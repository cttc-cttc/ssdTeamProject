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
  catParam: string;
  categoryName: string;
  categories: SidebarItem[];
}

export function AppSidebar({ catParam, categoryName, categories }: AppSidebarProps) {
  return (
    <Sidebar className="sticky top-40 h-fit">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="my-2">{categoryName}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={catParam === item.url}>
                    <a
                      href={categoryName === "스터디 카테고리" ? `/study/${item.url}/1` : item.url}
                    >
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
