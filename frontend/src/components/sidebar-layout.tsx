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
  items: SidebarItem[];
}

export default function SidebarLayout({ children, items }: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar items={items} />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
