"use client";

import * as React from "react";
import Link from "next/link";
import type { Route } from "next";
import { ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getActiveNavigation, getMenuSectionsForPath, isMenuItemActive } from "@/lib/routes";

export function MenuSidebar() {
  const pathname = usePathname();
  const activeNavigation = getActiveNavigation(pathname);
  const sections = getMenuSectionsForPath(pathname);
  const [ideaverseOpen, setIdeaverseOpen] = React.useState(true);


  if (sections.length === 0 || !activeNavigation) return null;

  const ideaverseItems = activeNavigation.key === "ideaverse" ? sections[0]?.items ?? [] : [];
  const ideaverseDashboard = ideaverseItems.find((item) => item.href === "/ideaverse");
  const ideaverseChildren = ideaverseItems.filter((item) => item.href !== "/ideaverse" && item.href !== "/ideaverse/core");
  const ideaverseGroupActive = pathname.startsWith("/ideaverse/") && pathname !== "/ideaverse";

  const navItemClass = "focus-ring flex h-9 w-full items-center rounded-xl px-3 text-sm font-medium leading-none transition";
  const inactiveClass = "text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]";
  const activeClass = "bg-[image:var(--accent-active)] text-white shadow-md shadow-indigo-950/20";

  return (
    <aside className="fixed inset-y-0 left-20 z-30 flex w-56 flex-col border-r border-[var(--border)] bg-[var(--card)]/90 px-4 py-0 backdrop-blur-xl">
      <div className="flex h-16 flex-col justify-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Module</p>
        <h2 className="mt-1 text-lg font-semibold leading-none">{activeNavigation.label}</h2>
      </div>

      <nav className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1" aria-label="Module navigation">
        {activeNavigation.key === "ideaverse" && ideaverseDashboard ? (
          <div className="space-y-2">
            <Link href={ideaverseDashboard.href as Route} className={cn(navItemClass, pathname === ideaverseDashboard.href ? activeClass : inactiveClass)}>
              <span className="text-sm">Dashboard</span>
            </Link>

            <button
              type="button"
              className={cn(navItemClass, "justify-between", ideaverseGroupActive ? activeClass : inactiveClass)}
              onClick={() => setIdeaverseOpen((current) => !current)}
            >
              <span className="text-sm text-white">Core</span>
              {ideaverseOpen ? <ChevronDown className="h-4 w-4 shrink-0" /> : <ChevronRight className="h-4 w-4 shrink-0" />}
            </button>

            {ideaverseOpen ? (
              <div className="space-y-1 pl-2">
                {ideaverseChildren.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return <Link key={item.href} href={item.href as Route} className={cn(navItemClass, active ? activeClass : inactiveClass)}>{item.label}</Link>;
                })}
              </div>
            ) : null}
          </div>
        ) : (
          sections.map((section, sectionIndex) => (
            <div key={`${section.title}-${sectionIndex}`} className="space-y-1">
              {section.items.map((item) => {
                const active = isMenuItemActive(pathname, item.href, activeNavigation.href);
                return <Link key={item.href} href={item.href as Route} className={cn(navItemClass, active ? activeClass : inactiveClass)}>{item.label}</Link>;
              })}
            </div>
          ))
        )}
      </nav>
    </aside>
  );
}
