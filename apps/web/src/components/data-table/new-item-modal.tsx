"use client";

import * as React from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectMenu } from "@/components/ui/select-menu";

type NewItemModalProps = { open: boolean; onClose: () => void; moduleTitle: string };
type TagSelectorProps = { selectedTags: string[]; onChange: (tags: string[]) => void; options?: string[] };
const defaultTagOptions = ["Tag", "Theme", "Character", "Mood", "Favorite", "World", "Sci-fi", "Fantasy", "Reference"];

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="space-y-2"><span className="text-sm font-medium text-[var(--muted)]">{label}</span>{children}</label>; }
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) { return <input {...props} className="focus-ring h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]" />; }
function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea {...props} className="focus-ring min-h-32 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]" />; }

function TagSelector({ selectedTags, onChange, options = defaultTagOptions }: TagSelectorProps) {
  function toggle(tag: string) { onChange(selectedTags.includes(tag) ? selectedTags.filter((item) => item !== tag) : [...selectedTags, tag]); }
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">Select existing tags</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((tag) => {
          const active = selectedTags.includes(tag);
          return <button key={tag} type="button" className={active ? "rounded-full bg-[image:var(--accent-active)] px-3 py-1.5 text-xs font-medium text-white" : "rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]"} onClick={() => toggle(tag)}>{tag}</button>;
        })}
      </div>
    </div>
  );
}

function AttachmentPreviewModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  const attachments = [
    ["cover-preview.png", "Image · 2.4 MB"],
    ["source-note.md", "Markdown · 8 KB"],
    ["reference-scan.pdf", "PDF · 14 pages"],
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[var(--muted)]">Attachment preview</p>
            <h3 className="mt-1 text-2xl font-semibold">Upload preview or attachment</h3>
          </div>
          <button type="button" className="focus-ring rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center">
          <Upload className="mx-auto h-5 w-5 text-[var(--muted)]" />
          <p className="mt-3 text-sm font-semibold">Drop new files here</p>
          <p className="mt-1 text-xs text-[var(--muted)]">One item can keep multiple attachments for preview, source files, and references.</p>
        </div>

        <div className="mt-5 space-y-3">
          {attachments.map(([name, meta]) => (
            <div key={name} className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
              <div>
                <p className="text-sm font-semibold">{name}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{meta}</p>
              </div>
              <button type="button" className="focus-ring rounded-xl px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500 hover:text-white">Remove</button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={onClose}>Use attachments</Button>
        </div>
      </div>
    </div>
  );
}

export function NewItemModal({ open, onClose, moduleTitle }: NewItemModalProps) {
  const [type, setType] = React.useState("novel");
  const [status, setStatus] = React.useState("active");
  const [selectedTags, setSelectedTags] = React.useState(["Tag", "Theme"]);
  const [attachmentOpen, setAttachmentOpen] = React.useState(false);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="modal-scroll max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-[var(--card)]/95 px-6 py-5 backdrop-blur">
          <div><p className="text-sm font-medium text-[var(--muted)]">Create new Item</p><h2 className="mt-1 text-2xl font-semibold">New {moduleTitle} Item</h2></div>
          <button className="focus-ring rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={onClose}><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Field label="Title"><Input placeholder="Enter item title" /></Field>
            <Field label="Type"><SelectMenu value={type} onChange={setType} options={[{ value: "novel", label: "Novel" }, { value: "movie", label: "Movie" }, { value: "image", label: "Image" }, { value: "character", label: "Character" }]} /></Field>
            <Field label="Status"><SelectMenu value={status} onChange={setStatus} options={[{ value: "active", label: "Active" }, { value: "draft", label: "Draft" }, { value: "archived", label: "Archived" }]} /></Field>
            <Field label="Category / Context"><Input placeholder="e.g. World, Health, Beverage" /></Field>
            <Field label="Rating"><Input placeholder="0.0 - 10" /></Field>
            <Field label="Source / Path"><Input placeholder="Local path, URL, or external reference" /></Field>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <Field label="Description"><TextArea placeholder="Short description shown in the table list." defaultValue="This placeholder description previews how a medium-length table description will look before opening View details." /></Field>
              <Field label="Summary"><TextArea placeholder="Long summary for the detail page." defaultValue="This placeholder summary previews the richer content area that will later appear in View details." /></Field>
              <Field label="Notes"><TextArea placeholder="Extra notes, metadata, or personal comments" defaultValue="UI-only placeholder for structured notes, extra metadata, and linked references." /></Field>
            </div>
            <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
              <button type="button" className="focus-ring w-full rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] p-5 text-center transition hover:border-[var(--accent)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={() => setAttachmentOpen(true)}>
                <Upload className="mx-auto h-5 w-5 text-[var(--muted)]" />
                <p className="mt-3 text-sm font-medium">Upload preview or attachment</p>
                <p className="mt-1 text-xs text-[var(--muted)]">3 sample attachments · click to preview or replace.</p>
              </button>
              <div className="space-y-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3">
                {["cover-preview.png", "source-note.md", "reference-scan.pdf"].map((name) => (
                  <div key={name} className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs">
                    <span className="font-medium">{name}</span>
                    <span className="text-[var(--muted)]">attached</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[var(--border)] bg-[var(--card)]/95 px-6 py-4 backdrop-blur"><Button variant="outline" onClick={onClose}>Cancel</Button><Button>Create Item</Button></div>
      </div>
      <AttachmentPreviewModal open={attachmentOpen} onClose={() => setAttachmentOpen(false)} />
    </div>
  );
}
