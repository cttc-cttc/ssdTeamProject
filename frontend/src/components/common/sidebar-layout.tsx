import { SidebarProvider } from "@/components/ui/sidebar";
import { type LucideIcon } from "lucide-react";
import { AppSidebar } from "./app-sidebar";

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface SidebarLayoutProps {
  catParam: string;
  categoryName: string;
  categories: SidebarItem[];
  children: React.ReactNode;
  onTabChange?: (tab: string) => void; // 탭 변경 콜백 함수
}

export default function SidebarLayout({
  catParam,
  categoryName,
  categories,
  children,
  onTabChange,
}: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar
        catParam={catParam}
        categoryName={categoryName}
        categories={categories}
        onTabChange={onTabChange}
      />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
