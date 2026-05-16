"use client";

import * as React from "react";
import { ArrowRight, BookOpen, FileText, Search, Settings, Sparkles, UserRound, X } from "lucide-react";
import { NsfwToggle } from "@/components/layout/nsfw-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const commandGroups = [
  {
    title: "Navigate",
    items: [
      { label: "Open Dashboard", detail: "Go to the main overview", icon: Sparkles, keywords: "dashboard overview home" },
      { label: "Open RAG Workspace", detail: "Ask questions over uploaded documents", icon: FileText, keywords: "rag documents ai citation" },
      { label: "Open Ideaverse", detail: "Open vault-backed worldbuilding pages", icon: BookOpen, keywords: "ideaverse obsidian vault worldbuilding" },
      { label: "Open Profile", detail: "Review personal workspace information", icon: UserRound, keywords: "profile account personal owner" },
      { label: "Open Settings", detail: "Review app preferences", icon: Settings, keywords: "settings preferences storage theme" },
    ],
  },
  {
    title: "Create",
    items: [
      { label: "New Item", detail: "Create a new library item", icon: Sparkles, keywords: "create add item" },
      { label: "New Tag", detail: "Add a tag for the current module", icon: Sparkles, keywords: "create add tag" },
    ],
  },
  {
    title: "Sample Results",
    items: [
      { label: "Dune", detail: "Movie · Progress 42% · Sci-fi", icon: FileText, keywords: "dune movie sci fi film" },
      { label: "Kyoto Street Album", detail: "Album · Image/Picture/Illustration collection", icon: FileText, keywords: "kyoto album picture illustration image" },
      { label: "Creator Account", detail: "Media Account · YouTube creator profile", icon: UserRound, keywords: "account creator youtube social" },
    ],
  },
];

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => inputRef.current?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  React.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (!open) return null;

  const normalizedQuery = query.trim().toLowerCase();
  const visibleGroups = commandGroups
    .map((group) => ({
      ...group,
      items: normalizedQuery
        ? group.items.filter((item) => `${item.label} ${item.detail} ${item.keywords}`.toLowerCase().includes(normalizedQuery))
        : group.items,
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="fixed inset-0 z-[190] flex h-dvh w-dvw items-start justify-center bg-slate-950/70 px-4 py-24 backdrop-blur-md" onClick={onClose}>
      <div className="liquid-surface w-full max-w-3xl overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-4">
          <Search className="h-5 w-5 text-[var(--muted)]" />
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 flex-1 bg-transparent text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]" placeholder="Search modules, items, documents, or actions..." />
          <button type="button" className="focus-ring rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={onClose}><X className="h-5 w-5" /></button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {normalizedQuery ? <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Search preview for “{query}”</p> : null}
          {visibleGroups.length > 0 ? visibleGroups.map((group) => (
            <section key={group.title} className="mb-5 last:mb-0">
              <p className="px-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">{group.title}</p>
              <div className="mt-2 space-y-2">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.label} type="button" className="focus-ring flex w-full items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-left transition hover:border-[var(--accent)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={onClose}>
                      <span className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]"><Icon className="h-5 w-5" /></span><span className="min-w-0"><span className="block truncate text-sm font-semibold">{item.label}</span><span className="mt-1 block truncate text-xs text-[var(--muted)]">{item.detail}</span></span></span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[var(--muted)]" />
                    </button>
                  );
                })}
              </div>
            </section>
          )) : <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-6 text-center text-sm text-[var(--muted)]">No preview result for this text yet.</div>}
        </div>
      </div>
    </div>
  );
}

export function AppHeader() {
  const [commandOpen, setCommandOpen] = React.useState(false);

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (!isShortcut) return;
      event.preventDefault();
      setCommandOpen(true);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="liquid-surface sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-8">
          <button type="button" className="focus-ring flex h-10 min-w-[420px] items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]" onClick={() => setCommandOpen(true)}>
            <Search className="h-4 w-4" />
            <span>Search everything...</span>
            <kbd className="ml-auto rounded-md border border-[var(--border)] bg-[var(--surface-subtle)] px-2 py-0.5 text-xs text-[var(--muted)]">Ctrl + K</kbd>
          </button>
          <div className="ml-auto flex items-center gap-2"><ThemeToggle /><NsfwToggle /></div>
        </div>
      </header>
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
