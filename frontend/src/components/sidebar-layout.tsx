import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { type LucideIcon } from "lucide-react";

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface SidebarLayoutProps {
  children: React.ReactNode;
  categories: SidebarItem[];
  categoryName: string;
}

export default function SidebarLayout({ children, categories, categoryName }: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar categories={categories} categoryName={categoryName} />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
