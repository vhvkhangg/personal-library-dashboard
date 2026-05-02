"use client";

import * as React from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  FileText,
  Gauge,
  MoreHorizontal,
  Paperclip,
  Pin,
  RefreshCcw,
  Save,
  Send,
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
const uploadedDocs = [
  { id: 1, name: "WorldBuildingGuide.pdf", meta: "42 pages", pinned: true },
  { id: 2, name: "CharacterNotes.md", meta: "Markdown" },
  { id: 3, name: "RawScan01.png", meta: "Needs OCR" },
];
const citations = [
  { index: 1, source: "WorldBuildingGuide.pdf", page: 14, lines: "12-21", score: "0.92", excerpt: "The capital acts as the ceremonial center and the faction's logistical command hub." },
  { index: 2, source: "CharacterNotes.md", page: 1, lines: "40-58", score: "0.88", excerpt: "Elite guards were stationed near the city gates, reinforcing practical and symbolic authority." },
  { index: 3, source: "WorldBuildingGuide.pdf", page: 17, lines: "4-15", score: "0.84", excerpt: "Administrative oversight remained centralized despite regional unrest." },
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

function MiniLogo({ variant = "vk" }: { variant?: "vk" | "rag" }) {
  if (variant === "vk") {
    return (
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[15px] bg-[image:linear-gradient(135deg,#2563eb_0%,#7c3aed_100%)] p-[2px] shadow-sm shadow-indigo-950/20">
        <span className="flex h-full w-full items-center justify-center rounded-[13px] bg-[var(--card)] text-xs font-black tracking-[0.14em] text-[var(--accent)]">
          VK
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[image:var(--accent-active)] text-xs font-black tracking-[0.12em] text-white shadow-sm shadow-indigo-950/20">
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
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl" aria-label={triggerAriaLabel} onClick={() => setOpen((current) => !current)}>
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
                onClick={() => { setOpen(false); item.onSelect?.(); }}
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
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-rose-500/15 p-3 text-rose-400"><Trash2 className="h-5 w-5" /></div>
          <div>
            <p className="text-lg font-semibold">Delete confirmation</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Are you sure you want to delete <span className="font-semibold text-[var(--foreground)]">{target}</span>? This is a UI preview confirmation.</p>
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

function UploadSampleModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between gap-3">
          <div><p className="text-sm text-[var(--muted)]">Upload sample</p><h3 className="mt-1 text-2xl font-semibold">Add document</h3></div>
          <button type="button" className="focus-ring rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-5 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center"><Upload className="mx-auto h-5 w-5 text-[var(--muted)]" /><p className="mt-3 font-medium">Drop files here or browse</p><p className="mt-1 text-sm text-[var(--muted)]">Supported later: PDF, Markdown, DOCX, images for OCR.</p></div>
        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"><p className="text-sm font-medium">Queue preview</p><div className="mt-3 space-y-2 text-sm text-[var(--muted)]"><div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2"><span>WorldBuildingGuide.pdf</span><span>Ready</span></div><div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2"><span>RawScan01.png</span><span>OCR queued</span></div></div></div>
        <div className="mt-6 flex justify-end gap-3"><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={onClose}>Add to workspace</Button></div>
      </div>
    </div>
  );
}

function CitationCard({ citation, expanded, onToggle }: { citation: (typeof citations)[number]; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-2xl bg-[image:var(--accent-active)] px-2 text-sm font-semibold text-white shadow-sm shadow-indigo-950/20">{citation.index}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2"><p className="truncate text-lg font-semibold">{citation.source}</p><span className="text-sm font-medium text-[var(--muted)]">{citation.score}</span></div>
              <p className="mt-1 text-sm text-[var(--muted)]">Page {citation.page} · Lines {citation.lines}</p>
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

export function RagWorkspacePage() {
  const [activeInspector, setActiveInspector] = React.useState<"citation" | "benchmark">("citation");
  const [mode, setMode] = React.useState("strict");
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<string | null>(null);
  const [expandedCitations, setExpandedCitations] = React.useState<number[]>([]);

  function toggleCitation(index: number) {
    setExpandedCitations((current) => current.includes(index) ? current.filter((value) => value !== index) : [...current, index]);
  }

  return (
    <>
      <div className="space-y-6">
        <header><p className="text-sm font-medium text-[var(--muted)]">Workspace</p><h1 className="text-3xl font-semibold tracking-tight">RAG Workspace</h1></header>

        <section className="grid gap-6 xl:grid-cols-[0.75fr_1.35fr_0.8fr]">
          <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="flex items-center justify-between gap-3"><h2 className="text-lg font-semibold">Chats</h2><Button variant="outline" size="sm">New chat</Button></div>
              <div className="mt-4 space-y-3">
                {chatThreads.map((thread) => (
                  <div key={thread.id} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0"><div className="flex items-center gap-2"><FileText className="h-4 w-4 text-[var(--accent)]" /><p className="truncate text-sm font-medium">{thread.name}</p>{thread.pinned ? <Pin className="h-3.5 w-3.5 text-[var(--favorite)]" /> : null}</div><p className="mt-1 text-xs text-[var(--muted)]">Last active 5 min ago</p></div>
                      <OverflowMenu triggerAriaLabel={`Open actions for ${thread.name}`} items={[{ label: "Pin", icon: Pin }, { label: "Rename", icon: RefreshCcw }, { label: "Delete", icon: Trash2, danger: true, onSelect: () => setDeleteTarget(thread.name) }]} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="flex items-center justify-between gap-3"><h2 className="text-lg font-semibold">Uploaded documents</h2><div className="flex items-center gap-2"><Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setUploadOpen(true)}><Upload className="h-4 w-4" /></Button><Button variant="outline" size="icon" className="h-9 w-9 text-rose-400 hover:border-rose-400 hover:bg-rose-500 hover:text-white" onClick={() => setDeleteTarget("all uploaded documents")}><Trash2 className="h-4 w-4" /></Button></div></div>
              <div className="mt-4 space-y-3">
                {uploadedDocs.map((doc) => (
                  <div key={doc.id} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0"><div className="flex items-center gap-2"><p className="truncate text-sm font-medium">{doc.name}</p>{doc.pinned ? <Pin className="h-3.5 w-3.5 text-[var(--favorite)]" /> : null}</div><p className="mt-1 text-xs text-[var(--muted)]">{doc.meta}</p></div>
                      <OverflowMenu triggerAriaLabel={`Open actions for ${doc.name}`} items={[{ label: "Pin", icon: Pin }, { label: "Delete", icon: Trash2, danger: true, onSelect: () => setDeleteTarget(doc.name) }]} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
              <div className="flex items-center gap-3"><div className="rounded-xl bg-[var(--accent-soft)] p-2 text-[var(--accent)]"><Sparkles className="h-4 w-4" /></div><div><h2 className="text-base font-semibold">RAG settings</h2><p className="text-sm text-[var(--muted)]">Tune retrieval and generation for this chat.</p></div></div>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-[1.1fr_0.7fr_0.7fr]">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"><p className="text-sm font-medium text-[var(--muted)]">Mode</p><div className="mt-2"><SelectMenu value={mode} onChange={setMode} options={[{ value: "strict", label: "Strict" }, { value: "balanced", label: "Balanced" }, { value: "fast", label: "Fast" }]} /></div></div>
                <label className="space-y-2"><span className="text-sm font-medium text-[var(--muted)]">Chunk size</span><input defaultValue="700" className="focus-ring h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" /></label>
                <label className="space-y-2"><span className="text-sm font-medium text-[var(--muted)]">Overlap</span><input defaultValue="120" className="focus-ring h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" /></label>
                <label className="space-y-2"><span className="text-sm font-medium text-[var(--muted)]">Top-k</span><input defaultValue="12" className="focus-ring h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" /></label>
                <label className="space-y-2"><span className="text-sm font-medium text-[var(--muted)]">Rerank top-n</span><input defaultValue="6" className="focus-ring h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" /></label>
                <div className="flex items-end justify-end gap-3"><Button variant="outline" size="sm"><RefreshCcw className="h-4 w-4" />Reset</Button><Button size="sm"><Save className="h-4 w-4" />Save</Button></div>
              </div>
            </section>

            <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-end gap-3"><div className="max-w-[88%] rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4"><div className="flex items-start justify-between gap-3"><p className="text-sm leading-7 text-[var(--foreground)]/90">Summarize the capital city structure from the uploaded worldbuilding guide and cite the most relevant chunks.</p><Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl"><Copy className="h-4 w-4" /></Button></div></div><MiniLogo variant="vk" /></div>
                <div className="flex items-start gap-3"><MiniLogo variant="rag" /><div className="max-w-[88%] rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-sm leading-7">The capital appears to act as both a ceremonial center and a logistical command hub, with administrative power kept centralized even during unrest.</p><div className="mt-3 flex flex-wrap gap-2">{[1, 2].map((index) => <span key={index} className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[image:var(--accent-active)] px-2 text-xs font-semibold text-white shadow-sm shadow-indigo-950/20">{index}</span>)}</div></div><div className="flex items-center gap-2"><Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl"><Copy className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl"><RefreshCcw className="h-4 w-4" /></Button></div></div></div></div>
              </div>

              <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
                <textarea className="focus-ring min-h-28 w-full resize-none rounded-2xl bg-transparent px-1 py-2 text-sm placeholder:text-[var(--muted)] focus:outline-none" placeholder="Ask a question about your documents..." />
                <div className="mt-3 flex items-center justify-between gap-3"><Button variant="outline" size="icon" onClick={() => setUploadOpen(true)}><Paperclip className="h-4 w-4" /></Button><Button size="icon"><Send className="h-4 w-4" /></Button></div>
              </div>
            </section>
          </div>

          <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
            <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-1">
                            {inspectorTabs.map(({ key, label, icon: Icon }) => {
                const active = activeInspector === key;
                return (
                  <button key={key} type="button" className={cn("flex items-center justify-center gap-2 rounded-[1.25rem] px-3 py-3 text-base transition", active ? "bg-[var(--card)] font-semibold text-[var(--foreground)]" : "text-[var(--muted)] hover:bg-[var(--card)]/70 hover:text-[var(--foreground)]")} onClick={() => setActiveInspector(key)}>
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {activeInspector === "citation" ? (
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"><p className="text-sm text-[var(--muted)]">Total cited sources</p><p className="text-sm font-semibold">3</p></div>
                <div className="space-y-3">{citations.map((citation) => <CitationCard key={citation.index} citation={citation} expanded={expandedCitations.includes(citation.index)} onToggle={() => toggleCitation(citation.index)} />)}</div>
              </div>
            ) : (
              <div className="mt-5 space-y-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="flex items-center gap-2"><Gauge className="h-4 w-4 text-[var(--accent)]" /><p className="text-sm font-medium">Benchmark sample</p></div>
                {benchmarkRows.map(([label, value, status]) => <div key={label} className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3"><div className="flex items-center gap-2"><BenchmarkIcon status={status} /><span className="text-sm">{label}</span></div><span className="text-sm font-semibold">{value}</span></div>)}
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-4"><p className="text-sm font-semibold text-emerald-300">Conclusion</p><p className="mt-2 text-sm leading-6 text-emerald-100/90">Retrieval and reranking look healthy for local usage. Generation time is the main bottleneck, but the overall result is still acceptable for an offline-first workflow.</p></div>
              </div>
            )}
          </section>
        </section>
      </div>
      <ConfirmDeleteModal target={deleteTarget} onClose={() => setDeleteTarget(null)} />
      <UploadSampleModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </>
  );
}
