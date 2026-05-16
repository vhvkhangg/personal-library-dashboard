"use client";

import * as React from "react";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { primaryNavigation, systemNavigation } from "@/lib/routes";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

type ItemProps = {
  href: string;
  label: string;
  children: React.ReactNode;
  active: boolean;
};

function SidebarItem({ href, label, children, active }: ItemProps) {
  return (
    <Link
      href={href as Route}
      className={cn(
        "group relative flex h-11 w-11 items-center justify-center rounded-2xl text-[var(--icon-quiet)] transition hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]",
        active && "bg-[image:var(--accent-active)] text-white shadow-lg shadow-indigo-950/30",
      )}
      aria-label={label}
    >
      {children}
      <span className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 rounded-lg border border-[var(--tooltip-border)] bg-[var(--tooltip-bg)] px-2.5 py-1 text-xs font-medium text-[var(--foreground)] opacity-0 shadow-lg transition-opacity duration-75 group-hover:opacity-100 group-focus-visible:opacity-100">
        {label}
      </span>
    </Link>
  );
}

export function IconSidebar() {
  const pathname = usePathname();
  const splitIndex = primaryNavigation.findIndex((item) => item.key === "ideaverse");
  const topPrimary = splitIndex >= 0 ? primaryNavigation.slice(0, splitIndex) : primaryNavigation;
  const bottomPrimary = splitIndex >= 0 ? primaryNavigation.slice(splitIndex) : [];

  return (
    <aside className="liquid-surface fixed inset-y-0 left-0 z-40 flex w-20 flex-col items-center border-r border-[var(--border)] bg-[var(--card)]/90 py-4 backdrop-blur-xl">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[18px] bg-[image:linear-gradient(135deg,#2563eb_0%,#7c3aed_100%)] p-[2px] shadow-lg shadow-indigo-950/30" aria-label="Personal Library Dashboard">
        <div className="flex h-full w-full items-center justify-center rounded-[16px] bg-[var(--card)] text-sm font-black tracking-[0.16em] text-[var(--accent)]">VK</div>
      </div>

      <nav className="flex flex-1 flex-col gap-2" aria-label="Primary navigation">
        {topPrimary.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);
          return <SidebarItem key={item.href} href={item.href} label={item.label} active={active}><Icon className="h-5 w-5" /></SidebarItem>;
        })}

        {bottomPrimary.length > 0 ? <div className="my-2 border-t border-[var(--border)] pt-3" /> : null}

        {bottomPrimary.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);
          return <SidebarItem key={item.href} href={item.href} label={item.label} active={active}><Icon className="h-5 w-5" /></SidebarItem>;
        })}
      </nav>

      <nav className="border-t border-[var(--border)] pt-3" aria-label="System navigation">
        {systemNavigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);
          return <SidebarItem key={item.href} href={item.href} label={item.label} active={active}><Icon className="h-5 w-5" /></SidebarItem>;
        })}
      </nav>
    </aside>
  );
}
