"use client";

import * as React from "react";
import { ArrowRight, BookOpen, FileText, Search, Settings, Sparkles, X } from "lucide-react";
import { NsfwToggle } from "@/components/layout/nsfw-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const commandGroups = [
  {
    title: "Navigate",
    items: [
      { label: "Open Dashboard", detail: "Go to the main overview", icon: Sparkles },
      { label: "Open RAG Workspace", detail: "Ask questions over uploaded documents", icon: FileText },
      { label: "Open Ideaverse", detail: "Open vault-backed worldbuilding pages", icon: BookOpen },
      { label: "Open Settings", detail: "Review app preferences", icon: Settings },
    ],
  },
  {
    title: "Create",
    items: [
      { label: "New Item", detail: "Create a new library item", icon: Sparkles },
      { label: "New Tag", detail: "Add a tag for the current module", icon: Sparkles },
    ],
  },
];

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => inputRef.current?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[190] flex h-dvh w-dvw items-start justify-center bg-slate-950/70 px-4 py-24 backdrop-blur-md" onClick={onClose}>
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-4">
          <Search className="h-5 w-5 text-[var(--muted)]" />
          <input
            ref={inputRef}
            className="h-10 flex-1 bg-transparent text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
            placeholder="Search modules, items, documents, or actions..."
          />
          <button type="button" className="focus-ring rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {commandGroups.map((group) => (
            <section key={group.title} className="mb-5 last:mb-0">
              <p className="px-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">{group.title}</p>
              <div className="mt-2 space-y-2">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      className="focus-ring flex w-full items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-left transition hover:border-[var(--accent)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]"
                      onClick={onClose}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold">{item.label}</span>
                          <span className="mt-1 block truncate text-xs text-[var(--muted)]">{item.detail}</span>
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[var(--muted)]" />
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
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
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-8">
          <button
            type="button"
            className="focus-ring flex h-10 min-w-[420px] items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]"
            onClick={() => setCommandOpen(true)}
          >
            <Search className="h-4 w-4" />
            <span>Search everything...</span>
            <kbd className="ml-auto rounded-md border border-[var(--border)] bg-[var(--surface-subtle)] px-2 py-0.5 text-xs text-[var(--muted)]">
              Ctrl + K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <NsfwToggle />
          </div>
        </div>
      </header>
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
