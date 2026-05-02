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

export function NewItemModal({ open, onClose, moduleTitle }: NewItemModalProps) {
  const [type, setType] = React.useState("novel");
  const [status, setStatus] = React.useState("active");
  const [visibility, setVisibility] = React.useState("private");
  const [selectedTags, setSelectedTags] = React.useState(["Tag", "Theme"]);
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
              <Field label="Visibility"><SelectMenu value={visibility} onChange={setVisibility} options={[{ value: "private", label: "Private" }, { value: "protected", label: "Protected" }, { value: "public-later", label: "Public later" }]} /></Field>
              <label className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm"><input type="checkbox" className="h-4 w-4" defaultChecked /><span>Mark as favorite</span></label>
              <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] p-5 text-center"><Upload className="mx-auto h-5 w-5 text-[var(--muted)]" /><p className="mt-3 text-sm font-medium">Upload preview or attachment</p><p className="mt-1 text-xs text-[var(--muted)]">UI-only placeholder for future upload flow.</p></div>
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[var(--border)] bg-[var(--card)]/95 px-6 py-4 backdrop-blur"><Button variant="outline" onClick={onClose}>Cancel</Button><Button>Create Item</Button></div>
      </div>
    </div>
  );
}
