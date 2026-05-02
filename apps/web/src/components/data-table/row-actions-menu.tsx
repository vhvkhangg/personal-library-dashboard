"use client";

import * as React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";
import { EditItemModal } from "@/components/data-table/edit-item-modal";
import { ItemDetailModal } from "@/components/data-table/item-detail-modal";
import { cn } from "@/lib/utils";

type RowActionsMenuProps = {
  item: {
    title: string;
    description: string;
    tags: string[];
    type: string;
    domain: string;
    updated: string;
    rating: string;
    status: string;
    favorite?: boolean;
  };
  domainColumnLabel: string;
  typeColumnLabel: string;
  showDomainColumn?: boolean;
  entityName: string;
  openUpward?: boolean;
};

type RowActionItem = {
  key: "view" | "edit" | "delete";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  danger?: boolean;
};

const menuItems: RowActionItem[] = [
  { key: "view", label: "View details", icon: Eye },
  { key: "edit", label: "Edit item", icon: Pencil },
  { key: "delete", label: "Delete", icon: Trash2, danger: true },
];

export function RowActionsMenu({ item, domainColumnLabel, typeColumnLabel, showDomainColumn = true, entityName, openUpward = false }: RowActionsMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [position, setPosition] = React.useState<{ top: number; right: number }>({ top: -9999, right: 8 });
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);


  const calculatePosition = React.useCallback(() => {
    if (!triggerRef.current) return { top: -9999, right: 8 };
    const rect = triggerRef.current.getBoundingClientRect();
    const menuHeight = menuRef.current?.offsetHeight ?? 132;
    const gap = 8;
    const availableBelow = window.innerHeight - rect.bottom;
    const shouldOpenUp = openUpward || availableBelow < menuHeight + gap;
    const top = shouldOpenUp
      ? Math.max(rect.top - menuHeight - gap, gap)
      : Math.min(rect.bottom + gap, window.innerHeight - menuHeight - gap);
    const right = Math.max(window.innerWidth - rect.right, gap);
    return { top, right };
  }, [openUpward]);

  const updatePosition = React.useCallback(() => {
    setPosition(calculatePosition());
  }, [calculatePosition]);

  React.useEffect(() => {
    if (!open) return;

    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    const handleRelayout = () => updatePosition();
    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("resize", handleRelayout);
    window.addEventListener("scroll", handleRelayout, true);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("resize", handleRelayout);
      window.removeEventListener("scroll", handleRelayout, true);
    };
  }, [open, updatePosition]);

  function handleToggle() {
    if (open) {
      setOpen(false);
      return;
    }
    setPosition(calculatePosition());
    setOpen(true);
  }

  function handleAction(key: string) {
    setOpen(false);
    if (key === "view") setDetailOpen(true);
    if (key === "edit") setEditOpen(true);
    if (key === "delete") setConfirmDeleteOpen(true);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          "focus-ring inline-flex h-9 w-9 items-center justify-center rounded-xl text-[var(--foreground)]/85 transition hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]",
          open && "bg-[var(--interactive-hover-bg)] text-[var(--interactive-hover-text)]",
        )}
        aria-label={`Open actions for ${item.title}`}
        onClick={handleToggle}
      >
        ...
      </button>

      {open
        ? createPortal(
            <div
              ref={menuRef}
              className="fixed z-[210] min-w-44 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1 shadow-xl shadow-black/30"
              style={{ top: `${position.top}px`, right: `${position.right}px` }}
            >
              {menuItems.map((menuItem) => {
                const Icon = menuItem.icon;
                return (
                  <button
                    key={menuItem.key}
                    type="button"
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition",
                      menuItem.danger
                        ? "text-rose-400 hover:bg-rose-500 hover:text-white"
                        : "text-[var(--foreground)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]",
                    )}
                    onClick={() => handleAction(menuItem.key)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{menuItem.label}</span>
                  </button>
                );
              })}
            </div>,
            document.body,
          )
        : null}

      {confirmDeleteOpen
        ? createPortal(
            <div className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm" onClick={() => setConfirmDeleteOpen(false)}>
              <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-rose-500/15 p-3 text-rose-400"><Trash2 className="h-5 w-5" /></div>
                  <div>
                    <p className="text-lg font-semibold">Delete item?</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Are you sure you want to delete <span className="font-semibold text-[var(--foreground)]">{item.title}</span>? This is a UI preview confirmation.</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button type="button" className="focus-ring rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={() => setConfirmDeleteOpen(false)}>Cancel</button>
                  <button type="button" className="focus-ring rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500" onClick={() => setConfirmDeleteOpen(false)}>Delete</button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}

      <ItemDetailModal open={detailOpen} onClose={() => setDetailOpen(false)} item={item} domainColumnLabel={domainColumnLabel} typeColumnLabel={typeColumnLabel} showDomainColumn={showDomainColumn} entityName={entityName} />
      <EditItemModal open={editOpen} onClose={() => setEditOpen(false)} itemTitle={item.title} itemDescription={item.description} />
    </>
  );
}
