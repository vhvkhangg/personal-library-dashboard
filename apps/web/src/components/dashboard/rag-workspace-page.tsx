"use client";

import * as React from "react";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Copy,
  FileText,
  Gauge,
  MoreHorizontal,
  PanelRightClose,
  PanelRightOpen,
  Pin,
  Plus,
  RefreshCcw,
  Save,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  TriangleAlert,
  Upload,
  X,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectMenu } from "@/components/ui/select-menu";
import { cn } from "@/lib/utils";

const chatThreads = [
  { id: 1, name: "Novel continuity check", pinned: true },
  { id: 2, name: "OCR quality review" },
  { id: 3, name: "Compare story references" },
];

const documents = [
  { id: 1, name: "WorldBuildingGuide.pdf", meta: "42 pages", status: "Indexed", progress: 100, selected: true, pinned: true },
  { id: 2, name: "CharacterNotes.md", meta: "Markdown", status: "Indexed", progress: 100, selected: true },
  { id: 3, name: "RawScan01.png", meta: "Needs OCR", status: "OCR queued", progress: 42, selected: false },
];

const citations = [
  {
    index: 1,
    source: "WorldBuildingGuide.pdf",
    score: "0.92",
    excerpt: "The capital acts as the ceremonial center and the faction's logistical command hub.",
    before: "The northern district contains the old council hall. ",
    highlight: "The capital acts as both the ceremonial center and the logistical command hub",
    after: " for the main faction, which explains why most guard rotations and supply routes converge near the city gates.",
  },
  {
    index: 2,
    source: "CharacterNotes.md",
    score: "0.88",
    excerpt: "Elite guards were stationed near the city gates, reinforcing practical and symbolic authority.",
    before: "Security notes mention a rotating outer patrol. ",
    highlight: "Elite guards were stationed near the city gates",
    after: " to project authority and prevent rival factions from controlling the capital entrances.",
  },
  {
    index: 3,
    source: "WorldBuildingGuide.pdf",
    score: "0.84",
    excerpt: "Administrative oversight remained centralized despite regional unrest.",
    before: "Even after the western rebellion, ",
    highlight: "administrative oversight remained centralized",
    after: " because the archive, mint, and military command still operated from the capital district.",
  },
];

const benchmarkRows = [
  ["Ingestion time", "0.9s", "good"],
  ["Retrieval time", "0.18s", "good"],
  ["Rerank time", "0.11s", "good"],
  ["Generation time", "2.42s", "warn"],
  ["Total latency", "3.61s", "bad"],
  ["Tokens used", "1,124", "good"],
] as const;

const inspectorTabs = [
  { key: "citation", label: "Citation", icon: FileText },
  { key: "benchmark", label: "Benchmark", icon: Gauge },
] as const;

type Citation = (typeof citations)[number];

type RailTab = "chats" | "documents";

function MiniLogo({ variant = "vk" }: { variant?: "vk" | "rag" }) {
  if (variant === "vk") {
    return (
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[15px] bg-[image:linear-gradient(135deg,#2563eb_0%,#7c3aed_100%)] p-[2px] shadow-sm shadow-indigo-950/20">
        <span className="flex h-full w-full items-center justify-center rounded-[13px] bg-[var(--card)] text-xs font-black tracking-[0.14em] text-[var(--accent)]">VK</span>
      </span>
    );
  }

  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[image:var(--accent-active)] text-white shadow-sm shadow-indigo-950/20">
      <Sparkles className="h-4 w-4" />
    </span>
  );
}

type OverflowMenuProps = {
  triggerAriaLabel: string;
  items: Array<{ label: string; icon: React.ComponentType<{ className?: string }>; danger?: boolean; onSelect?: () => void }>;
  align?: "left" | "right";
};

function OverflowMenu({ triggerAriaLabel, items, align = "right" }: OverflowMenuProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0">
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-9 w-9 rounded-xl", open && "bg-[var(--interactive-hover-bg)] text-[var(--interactive-hover-text)]")}
        aria-label={triggerAriaLabel}
        onClick={() => setOpen((current) => !current)}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      {open ? (
        <div className={cn("absolute top-[calc(100%+8px)] z-40 min-w-40 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-1 shadow-xl shadow-black/25", align === "right" ? "right-0" : "left-0")}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className={cn(
                  "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition",
                  item.danger ? "text-rose-400 hover:bg-rose-500 hover:text-white" : "text-[var(--foreground)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]",
                )}
                onClick={() => {
                  setOpen(false);
                  item.onSelect?.();
                }}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function ConfirmDeleteModal({ target, onClose }: { target: string | null; onClose: () => void }) {
  if (!target) return null;

  return (
    <div className="fixed inset-0 z-[240] flex h-dvh w-dvw items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md" onClick={onClose}>
      <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-rose-500/15 p-3 text-rose-400">
            <Trash2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold">Delete confirmation</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Are you sure you want to delete <span className="font-semibold text-[var(--foreground)]">{target}</span>? This is a UI preview confirmation.
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <button type="button" className="focus-ring rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500" onClick={onClose}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function CitationPreviewDialog({ citation, onClose }: { citation: Citation | null; onClose: () => void }) {
  if (!citation) return null;

  return (
    <div className="fixed inset-0 z-[240] flex h-dvh w-dvw items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md" onClick={onClose}>
      <div className="w-full max-w-3xl rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
          <div>
            <p className="text-sm font-medium text-[var(--muted)]">Citation {citation.index}</p>
            <h3 className="mt-1 text-2xl font-semibold">{citation.source}</h3>
          </div>
          <button type="button" className="focus-ring rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4 p-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-8 text-[var(--foreground)]/90">
            <span>{citation.before}</span>
            <mark className="rounded-lg bg-violet-400/30 px-1.5 py-1 text-[var(--foreground)] ring-1 ring-violet-300/40">{citation.highlight}</mark>
            <span>{citation.after}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm">
            <span className="text-[var(--muted)]">Rerank score</span>
            <span className="font-semibold">{citation.score}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[240] flex h-dvh w-dvw items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[var(--muted)]">RAG settings</p>
            <h3 className="mt-1 text-2xl font-semibold">Retrieval settings</h3>
          </div>
          <button type="button" className="focus-ring rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-2"><span className="text-sm font-medium text-[var(--muted)]">Chunk size</span><input defaultValue="700" className="focus-ring h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" /></label>
          <label className="space-y-2"><span className="text-sm font-medium text-[var(--muted)]">Chunk overlap</span><input defaultValue="120" className="focus-ring h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" /></label>
          <label className="space-y-2"><span className="text-sm font-medium text-[var(--muted)]">Top-k</span><input defaultValue="12" className="focus-ring h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" /></label>
          <label className="space-y-2"><span className="text-sm font-medium text-[var(--muted)]">Rerank top-n</span><input defaultValue="6" className="focus-ring h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" /></label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}><RefreshCcw className="h-4 w-4" />Reset</Button>
          <Button onClick={onClose}><Save className="h-4 w-4" />Save</Button>
        </div>
      </div>
    </div>
  );
}

function UploadDocumentDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[240] flex h-dvh w-dvw items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md" onClick={onClose}>
      <div className="w-full max-w-xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[var(--muted)]">Document upload</p>
            <h3 className="mt-1 text-2xl font-semibold">Add documents to RAG</h3>
          </div>
          <button type="button" className="focus-ring rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-7 text-center">
          <Upload className="mx-auto h-6 w-6 text-[var(--muted)]" />
          <p className="mt-3 text-sm font-semibold">Drop PDF, Markdown, DOCX, or scanned images here</p>
          <p className="mt-1 text-xs text-[var(--muted)]">UI preview only. Later phases will OCR, chunk, embed, and index these files.</p>
        </div>

        <div className="mt-5 space-y-3">
          {[
            ["WorldBuildingGuide.pdf", "Ready · 42 pages", "100%"],
            ["CharacterNotes.md", "Ready · Markdown", "100%"],
            ["RawScan01.png", "OCR queued", "42%"],
          ].map(([name, meta, progress]) => (
            <div key={name} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div><p className="text-sm font-semibold">{name}</p><p className="mt-1 text-xs text-[var(--muted)]">{meta}</p></div>
                <span className="text-xs font-semibold">{progress}</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[var(--surface-muted)]"><div className="h-2 rounded-full bg-[image:var(--accent-active)]" style={{ width: progress }} /></div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Add documents</Button>
        </div>
      </div>
    </div>
  );
}

function ChatRail({ railTab, setRailTab, deleteDocument, openSettings, openUpload }: { railTab: RailTab; setRailTab: (value: RailTab) => void; deleteDocument: (target: string) => void; openSettings: () => void; openUpload: () => void }) {
  return (
    <aside className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
      <Button variant="outline" className="mb-3 w-full justify-center" onClick={openSettings}>
        <SlidersHorizontal className="h-4 w-4" /> Settings
      </Button>

      <div className="flex gap-1.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-1">
        {[
          { key: "chats", label: "Chats", icon: Sparkles, className: "flex-[1]" },
          { key: "documents", label: "Docs", icon: FileText, className: "flex-[1]" },
        ].map(({ key, label, icon: Icon, className }) => {
          const active = railTab === key;
          return (
            <button
              key={key}
              type="button"
              className={cn("flex min-w-0 items-center justify-start gap-2 rounded-xl px-3 py-2 text-sm font-medium transition", className, active ? "bg-[image:var(--accent-active)] text-white" : "text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]")}
              onClick={() => setRailTab(key as RailTab)}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        {railTab === "chats" ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Chats</h2>
                <p className="mt-1 text-xs text-[var(--muted)]">Saved local threads for document QA.</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                <Plus className="h-4 w-4" /> New chat
              </Button>
            </div>
            <div className="space-y-3">
              {chatThreads.map((thread) => (
                <div key={thread.id} className="rounded-2xl bg-[var(--surface)] px-3 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[var(--accent)]" />
                        <p className="truncate text-sm font-medium">{thread.name}</p>
                        {thread.pinned ? <Pin className="h-3.5 w-3.5 text-[var(--favorite)]" /> : null}
                      </div>
                      <p className="mt-1 text-xs text-[var(--muted)]">Last active 5 min ago</p>
                    </div>
                    <OverflowMenu triggerAriaLabel={`Open actions for ${thread.name}`} items={[{ label: "Pin", icon: Pin }, { label: "Rename", icon: RefreshCcw }, { label: "Delete", icon: Trash2, danger: true, onSelect: () => deleteDocument(thread.name) }]} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Documents</h2>
                <p className="mt-1 text-xs text-[var(--muted)]">Select sources for this chat.</p>
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10" onClick={openUpload}><Upload className="h-5 w-5" /></Button>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[var(--muted)]">Upload progress</span>
                <span className="font-semibold">64%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[var(--surface-muted)]">
                <div className="h-2 w-[64%] rounded-full bg-[image:var(--accent-active)]" />
              </div>
              <p className="mt-2 text-xs text-[var(--muted)]">RawScan01.png is waiting for OCR.</p>
            </div>

            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="rounded-2xl bg-[var(--surface)] px-3 py-3">
                  <div className="flex items-start gap-3">
                    <button type="button" className={cn("mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border", doc.selected ? "border-transparent bg-[image:var(--accent-active)] text-white" : "border-[var(--border)] text-transparent")} aria-label={`Select ${doc.name}`}>
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">{doc.name}</p>
                        {doc.pinned ? <Pin className="h-3.5 w-3.5 text-[var(--favorite)]" /> : null}
                      </div>
                      <p className="mt-1 text-xs text-[var(--muted)]">{doc.meta}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className={cn("rounded-full px-2 py-1 text-[0.7rem] font-semibold", doc.status === "Indexed" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300")}>{doc.status}</span>
                        <span className="text-[0.7rem] text-[var(--muted)]">{doc.progress}% ready</span>
                      </div>
                    </div>
                    <OverflowMenu triggerAriaLabel={`Open actions for ${doc.name}`} items={[{ label: "Pin", icon: Pin }, { label: "Delete", icon: Trash2, danger: true, onSelect: () => deleteDocument(doc.name) }]} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function CitationCard({ citation, expanded, onToggle }: { citation: Citation; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-2xl bg-[image:var(--accent-active)] px-2 text-sm font-semibold text-white shadow-sm shadow-indigo-950/20">{citation.index}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate text-base font-semibold">{citation.source}</p>
                <span className="text-sm font-medium text-[var(--muted)]">{citation.score}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl" onClick={onToggle}>
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          {expanded ? <div className="mt-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm leading-7 text-[var(--foreground)]/90">{citation.excerpt}</div> : null}
        </div>
      </div>
    </div>
  );
}

function BenchmarkIcon({ status }: { status: "good" | "warn" | "bad" }) {
  if (status === "good") return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
  if (status === "warn") return <TriangleAlert className="h-4 w-4 text-amber-400" />;
  return <XCircle className="h-4 w-4 text-rose-400" />;
}

function BenchmarkTrack({ status }: { status: "good" | "warn" | "bad" }) {
  const activeCount = status === "good" ? 2 : status === "warn" ? 3 : 4;
  const segments = [
    { icon: CheckCircle2, activeClass: "bg-emerald-500/25 text-emerald-300" },
    { icon: CheckCircle2, activeClass: "bg-emerald-500/25 text-emerald-300" },
    { icon: TriangleAlert, activeClass: "bg-amber-500/25 text-amber-300" },
    { icon: XCircle, activeClass: "bg-rose-500/25 text-rose-300" },
  ];

  return (
    <div className="mt-3 grid grid-cols-4 gap-1.5" aria-label={`Benchmark threshold: ${status}`}>
      {segments.map(({ icon: Icon, activeClass }, index) => {
        const active = index < activeCount;
        return (
          <span key={index} className={cn("flex h-7 items-center justify-center rounded-lg border border-[var(--border)]", active ? activeClass : "bg-[var(--surface-muted)] text-[var(--muted)]/35")}>
            {active ? <Icon className="h-3.5 w-3.5" /> : null}
          </span>
        );
      })}
    </div>
  );
}

function InspectorPanel({ activeInspector, setActiveInspector, expandedCitations, toggleCitation }: { activeInspector: "citation" | "benchmark"; setActiveInspector: (value: "citation" | "benchmark") => void; expandedCitations: number[]; toggleCitation: (index: number) => void }) {
  return (
    <aside className="w-full border-t border-[var(--border)] bg-[var(--surface-subtle)] p-4 xl:w-[340px] xl:border-l xl:border-t-0">
      <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-1">
        {inspectorTabs.map(({ key, label, icon: Icon }) => {
          const active = activeInspector === key;
          return (
            <button key={key} type="button" className={cn("flex items-center justify-center gap-2 rounded-[1.25rem] px-3 py-3 text-sm transition", active ? "bg-[var(--card)] font-semibold text-[var(--foreground)]" : "text-[var(--muted)] hover:bg-[var(--card)]/70 hover:text-[var(--foreground)]")} onClick={() => setActiveInspector(key)}>
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {activeInspector === "citation" ? (
        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
            <p className="text-sm text-[var(--muted)]">Total cited sources</p>
            <p className="text-sm font-semibold">3</p>
          </div>
          {citations.map((citation) => (
            <CitationCard key={citation.index} citation={citation} expanded={expandedCitations.includes(citation.index)} onToggle={() => toggleCitation(citation.index)} />
          ))}
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-[var(--accent)]" />
            <p className="text-sm font-medium">Benchmark sample</p>
          </div>
          {benchmarkRows.map(([label, value, status]) => (
            <div key={label} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <BenchmarkIcon status={status} />
                  <span className="text-sm">{label}</span>
                </div>
                <span className="text-sm font-semibold">{value}</span>
              </div>
              <BenchmarkTrack status={status} />
            </div>
          ))}
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-4">
            <p className="text-sm font-semibold text-emerald-300">Conclusion</p>
            <p className="mt-2 text-sm leading-6 text-emerald-100/90">Retrieval and reranking look healthy for local usage. Generation time is the main bottleneck.</p>
          </div>
        </div>
      )}
    </aside>
  );
}

function ChatComposer() {
  return (
    <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
      <textarea className="focus-ring min-h-28 w-full resize-none rounded-2xl bg-transparent px-1 py-2 text-sm placeholder:text-[var(--muted)] focus:outline-none" placeholder="Ask a question about your selected documents..." />
      <div className="mt-3 flex items-center justify-end gap-3">
        <Button size="icon"><Send className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}

export function RagWorkspacePage() {
  const [activeInspector, setActiveInspector] = React.useState<"citation" | "benchmark">("citation");
  const [inspectorOpen, setInspectorOpen] = React.useState(true);
  const [mode, setMode] = React.useState("strict");
  const [model, setModel] = React.useState("qwen3-8b");
  const [railTab, setRailTab] = React.useState<RailTab>("chats");
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<string | null>(null);
  const [expandedCitations, setExpandedCitations] = React.useState<number[]>([]);
  const [selectedCitation, setSelectedCitation] = React.useState<Citation | null>(null);

  function toggleCitation(index: number) {
    setExpandedCitations((current) => current.includes(index) ? current.filter((value) => value !== index) : [...current, index]);
  }

  return (
    <>
      <div className="space-y-6">
        <header>
          <p className="text-sm font-medium text-[var(--muted)]">Workspace</p>
          <h1 className="text-3xl font-semibold tracking-tight">RAG Workspace</h1>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Ask questions over selected documents, inspect citations, and review local benchmark metrics in one workspace.</p>
        </header>

        <section className="grid gap-4 xl:-ml-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <ChatRail railTab={railTab} setRailTab={setRailTab} deleteDocument={setDeleteTarget} openSettings={() => setSettingsOpen(true)} openUpload={() => setUploadOpen(true)} />

          <section className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
            <div className="flex flex-wrap items-end gap-3 border-b border-[var(--border)] px-5 py-4">
              <label className="w-44 space-y-1">
                <span className="text-xs font-medium text-[var(--muted)]">Model</span>
                <SelectMenu value={model} onChange={setModel} options={[{ value: "qwen3-8b", label: "Qwen3 8B" }, { value: "qwen3-14b", label: "Qwen3 14B" }, { value: "vistral", label: "Vistral" }]} />
              </label>
              <label className="w-36 space-y-1">
                <span className="text-xs font-medium text-[var(--muted)]">Mode</span>
                <SelectMenu value={mode} onChange={setMode} options={[{ value: "strict", label: "Strict" }, { value: "balanced", label: "Balanced" }, { value: "fast", label: "Fast" }]} />
              </label>
              <div className="relative min-w-[320px] flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
                <input className="focus-ring h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-10 pr-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]" placeholder="Search this chat..." />
              </div>
              <Button variant="outline" size="icon" className="ml-auto" onClick={() => setInspectorOpen((current) => !current)} aria-label="Toggle inspector" title="Inspector">
                {inspectorOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
              </Button>
            </div>

            <div className={cn("flex flex-col xl:flex-row", inspectorOpen ? "" : "xl:block")}>
              <div className="min-w-0 flex-1 p-5">
                <div className="space-y-4">
                  <div className="flex justify-end gap-3">
                    <div className="max-w-[88%] rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm leading-7 text-[var(--foreground)]/90">Summarize the capital city structure from the uploaded worldbuilding guide and cite the most relevant chunks.</p>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl"><Copy className="h-4 w-4" /></Button>
                      </div>
                      <p className="mt-3 flex items-center gap-1.5 text-xs text-[var(--muted)]"><Clock3 className="h-3.5 w-3.5" /> Apr 30, 2026 · 21:12</p>
                    </div>
                    <MiniLogo variant="vk" />
                  </div>

                  <div className="flex items-start gap-3">
                    <MiniLogo variant="rag" />
                    <div className="max-w-[88%] rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm leading-7">The capital appears to act as both a ceremonial center and a logistical command hub, with administrative power kept centralized even during unrest.</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {[1, 2].map((index) => {
                              const citation = citations.find((item) => item.index === index);
                              return (
                                <button
                                  key={index}
                                  type="button"
                                  className="focus-ring inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[image:var(--accent-active)] px-2 text-xs font-semibold text-white shadow-sm shadow-indigo-950/20"
                                  onClick={() => citation && setSelectedCitation(citation)}
                                >
                                  {index}
                                </button>
                              );
                            })}
                          </div>
                          <p className="mt-3 flex items-center gap-1.5 text-xs text-[var(--muted)]"><Clock3 className="h-3.5 w-3.5" /> Apr 30, 2026 · 21:13</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl"><Copy className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl"><RefreshCcw className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <ChatComposer />
              </div>

              {inspectorOpen ? <InspectorPanel activeInspector={activeInspector} setActiveInspector={setActiveInspector} expandedCitations={expandedCitations} toggleCitation={toggleCitation} /> : null}
            </div>
          </section>
        </section>
      </div>
      <ConfirmDeleteModal target={deleteTarget} onClose={() => setDeleteTarget(null)} />
      <CitationPreviewDialog citation={selectedCitation} onClose={() => setSelectedCitation(null)} />
      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <UploadDocumentDialog open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </>
  );
}
