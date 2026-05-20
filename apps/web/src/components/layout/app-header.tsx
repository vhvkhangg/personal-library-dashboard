"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, CheckCheck, FileText, History, LogOut, PackageCheck, Search, Settings, Sparkles, UserRound, X } from "lucide-react";
import { NsfwToggle } from "@/components/layout/nsfw-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

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

const journalFilters = [
  { label: "Tất cả", count: 5 },
  { label: "Items", count: 2 },
  { label: "MD", count: 1 },
  { label: "RAG", count: 2 },
];

const journalEntries = [
  { title: "Added new Media item", meta: "Media · Album", time: "16/05/2026 14:32", body: "Kyoto Street Album was added with 3 sample attachments and marked as Active.", icon: PackageCheck, tone: "text-sky-300", unread: true },
  { title: "Ideaverse index refreshed", meta: "Ideaverse · Plot", time: "16/05/2026 14:14", body: "Plot notes were re-indexed from the Obsidian vault preview tree.", icon: BookOpen, tone: "text-emerald-300", unread: false },
  { title: "RAG question answered", meta: "RAG · Local QA", time: "16/05/2026 14:00", body: "The capital city question returned 3 cited sources and benchmark metadata.", icon: FileText, tone: "text-violet-300", unread: false },
];

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = React.useState("");

  const handleClose = React.useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  React.useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => inputRef.current?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleClose]);

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
    <div className="fixed inset-0 z-[190] flex h-dvh w-dvw items-start justify-center bg-slate-950/70 px-4 py-24 backdrop-blur-md" onClick={handleClose}>
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-4">
          <Search className="h-5 w-5 text-[var(--muted)]" />
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 flex-1 bg-transparent text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]" placeholder="Search modules, items, documents, or actions..." />
          <button type="button" className="focus-ring rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={handleClose}><X className="h-5 w-5" /></button>
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
                    <button key={item.label} type="button" className="focus-ring flex w-full items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-left transition hover:border-[var(--accent)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={handleClose}>
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

function JournalDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[180]" onClick={onClose}>
      <div className="absolute right-6 top-20 w-[430px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start gap-3 border-b border-[var(--border)] px-5 py-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[image:var(--accent-active)] text-white"><History className="h-5 w-5" /></span>
          <div>
            <h2 className="text-lg font-semibold">Nhật ký</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Hoạt động gần đây của thư viện.</p>
          </div>

          <button
            type="button"
            className="focus-ring inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-[var(--border)] px-3 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--accent)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]"
            aria-label="Mark all journal entries as read"
            title="Đánh dấu tất cả là đã đọc"
          >
            <CheckCheck className="h-4 w-4" />
            <span>Đã đọc</span>
          </button>
        </div>

        <div className="border-b border-[var(--border)] px-4 py-3">
          <div className="grid grid-cols-4 gap-1.5">
            {journalFilters.map((filter, index) => {
              const active = index === 0;
              return (
                <button
                  key={filter.label}
                  type="button"
                  className={cn(
                    "focus-ring inline-flex items-center justify-center gap-1 rounded-xl border px-1.5 py-1 text-[10px] font-semibold transition",
                    active
                      ? "border-transparent bg-[image:var(--accent-active)] text-white shadow-sm shadow-indigo-950/20"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]",
                  )}
                >
                  <span>{filter.label}</span>
                  <span className={cn("inline-flex h-4 min-w-4 items-center justify-center rounded-md px-1 text-[9px] font-bold", active ? "bg-white/18 text-white" : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]")}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-h-[520px] space-y-3 overflow-y-auto p-4">
          {journalEntries.map((item) => {
            const Icon = item.icon;
            return (
                <article
                  key={item.title}
                  className={cn(
                  "relative rounded-2xl border p-4 transition",
                  item.unread
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-sm shadow-indigo-950/20"
                  : "border-[var(--border)] bg-[var(--surface)]",
                  )}
                >
                {item.unread ? (
                  <span
                    className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-rose-400 shadow-sm shadow-rose-500/40"
                    aria-label="Unread journal entry"
                    title="Chưa đọc"
                  />
                ) : null}
                <div className="flex gap-3">
                  <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)]", item.tone)}><Icon className="h-5 w-5" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]"><span className="rounded-full border border-[var(--border)] px-2 py-0.5 font-semibold">{item.meta}</span><span>{item.time}</span></div>
                    <h3 className="mt-2 text-sm font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.body}</p>
                    <button type="button" className="focus-ring mt-3 inline-flex rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]">View detail →</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function AppHeader() {
  const router = useRouter();
  const { logout, user } = useAuth();
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [journalOpen, setJournalOpen] = React.useState(false);
  const [logoutPending, setLogoutPending] = React.useState(false);

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

  async function handleLogout() {
    setLogoutPending(true);
    try {
      await logout();
      router.replace("/login");
      router.refresh();
    } finally {
      setLogoutPending(false);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-8">
          <button type="button" className="focus-ring flex h-10 min-w-[420px] items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]" onClick={() => setCommandOpen(true)}>
            <Search className="h-4 w-4" />
            <span>Search everything...</span>
            <kbd className="ml-auto rounded-md border border-[var(--border)] bg-[var(--surface-subtle)] px-2 py-0.5 text-xs text-[var(--muted)]">Ctrl + K</kbd>
          </button>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--muted)] lg:flex">
              <UserRound className="h-4 w-4 text-[var(--accent)]" />
              <span className="max-w-40 truncate">{user?.displayName ?? user?.username ?? "Owner"}</span>
            </div>
            <button type="button" className={cn("focus-ring relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--muted)] transition hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]", journalOpen && "bg-[var(--interactive-hover-bg)] text-[var(--interactive-hover-text)]")} aria-label="Open activity journal" title="Nhật ký" onClick={() => setJournalOpen((current) => !current)}>
              <History className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-400" />
            </button>
            <ThemeToggle />
            <NsfwToggle />
            <button
              type="button"
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--muted)] transition hover:border-rose-400 hover:bg-rose-500 hover:text-white disabled:pointer-events-none disabled:opacity-60"
              aria-label="Logout"
              title="Logout"
              onClick={handleLogout}
              disabled={logoutPending}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      <JournalDialog open={journalOpen} onClose={() => setJournalOpen(false)} />
    </>
  );
}
