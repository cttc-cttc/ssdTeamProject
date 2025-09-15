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
  onTabChange?: (tab: string) => void; // 탭 변경 콜백 함수
}

export function AppSidebar({ catParam, categoryName, categories, onTabChange }: AppSidebarProps) {
  return (
    <Sidebar className="sticky top-40 h-fit">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="my-2">{categoryName}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={catParam === item.url}
                    onClick={() => onTabChange?.(item.url)}
                  >
                    {categoryName === "스터디 상세 페이지 사이드바" ? (
                      <button className="w-full text-left">
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <a
                        href={
                          categoryName === "스터디 카테고리" ? `/study/${item.url}/1` : item.url
                        }
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    )}
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
