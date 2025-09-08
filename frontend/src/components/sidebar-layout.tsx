import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { type LucideIcon } from "lucide-react";

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
}

export default function SidebarLayout({
  catParam,
  categoryName,
  categories,
  children,
}: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar catParam={catParam} categoryName={categoryName} categories={categories} />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
