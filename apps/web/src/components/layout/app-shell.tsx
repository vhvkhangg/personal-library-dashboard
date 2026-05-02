"use client";

import { usePathname } from "next/navigation";
import { AppHeader } from "@/components/layout/app-header";
import { IconSidebar } from "@/components/layout/icon-sidebar";
import { MenuSidebar } from "@/components/layout/menu-sidebar";
import { getMenuSectionsForPath } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hasMenu = getMenuSectionsForPath(pathname).length > 0;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <IconSidebar />
      <MenuSidebar />
      <div className="pointer-events-none fixed inset-y-0 left-20 z-[40] border-l border-[var(--border)]" aria-hidden />
      <div className={cn("pointer-events-none fixed right-0 top-16 z-[40] border-t border-[var(--border)]", hasMenu ? "left-[296px]" : "left-20")} aria-hidden />
      <div className={cn("transition-[padding] duration-200", hasMenu ? "pl-[296px]" : "pl-20")}>
        <AppHeader />
        <main className="mx-auto max-w-[1600px] px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
