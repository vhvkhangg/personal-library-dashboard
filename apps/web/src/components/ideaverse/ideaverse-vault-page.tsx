"use client";

import * as React from "react";
import { ChevronDown, ChevronRight, FileText, Folder, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type IdeaverseVaultPageProps = {
  sectionTitle: string;
};

type VaultFile = {
  id: string;
  title: string;
  folder: string;
  progress: number;
  summary: string;
  sections: Array<{ heading: string; body: string }>;
};

const sampleFiles: VaultFile[] = [
  {
    id: "overview",
    title: "Overview.md",
    folder: "00_Index",
    progress: 68,
    summary: "A high-level note that describes the purpose, scope, and current status of this Ideaverse section.",
    sections: [
      { heading: "Purpose", body: "This file explains how the current section connects to the larger worldbuilding system and which notes should be edited first." },
      { heading: "Current focus", body: "The current draft focuses on structure, relationship mapping, and consistency checks before deeper content writing begins." },
      { heading: "Next actions", body: "Review linked notes, clean duplicated concepts, then mark high-priority notes for future RAG indexing." },
    ],
  },
  {
    id: "rules",
    title: "Rules-and-constraints.md",
    folder: "01_Notes",
    progress: 42,
    summary: "A reference note for rules, constraints, and assumptions that should stay consistent across related files.",
    sections: [
      { heading: "Rules", body: "Every major concept should have a single canonical note. Supporting notes can link back to that canonical source." },
      { heading: "Constraints", body: "Names, faction logic, power systems, and timelines should not contradict earlier decisions without a migration note." },
      { heading: "Open questions", body: "Several naming conventions and cross-section relationships are still pending review." },
    ],
  },
  {
    id: "relationships",
    title: "Relationships.md",
    folder: "02_Relations",
    progress: 81,
    summary: "A relationship map that tracks dependencies, conflicts, and links between the current section and adjacent modules.",
    sections: [
      { heading: "Internal links", body: "This section links to character notes, faction notes, timeline fragments, and reusable template files." },
      { heading: "Dependencies", body: "Some definitions depend on core terminology and must be updated whenever the core glossary changes." },
      { heading: "Review status", body: "Most relationships are stable, but several conflict notes should be rechecked before backend indexing." },
    ],
  },
];

function groupFiles(files: VaultFile[]) {
  return files.reduce<Record<string, VaultFile[]>>((acc, file) => {
    acc[file.folder] = acc[file.folder] ?? [];
    acc[file.folder].push(file);
    return acc;
  }, {});
}

export function IdeaverseVaultPage({ sectionTitle }: IdeaverseVaultPageProps) {
  const [selectedFileId, setSelectedFileId] = React.useState(sampleFiles[0].id);
  const [expandedFolders, setExpandedFolders] = React.useState<Record<string, boolean>>({ "00_Index": true, "01_Notes": true, "02_Relations": true });
  const selectedFile = sampleFiles.find((file) => file.id === selectedFileId) ?? sampleFiles[0];
  const groupedFiles = groupFiles(sampleFiles);

  function toggleFolder(folder: string) {
    setExpandedFolders((current) => ({ ...current, [folder]: !current[folder] }));
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-medium text-[var(--muted)]">Ideaverse vault</p>
        <h1 className="text-3xl font-semibold tracking-tight">{sectionTitle}</h1>
      </header>

      <section className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)_260px]">
        <aside className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <input className="focus-ring h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-10 pr-3 text-sm" placeholder="Search vault files..." />
          </div>

          <div className="mt-4 space-y-3">
            {Object.entries(groupedFiles).map(([folder, files]) => {
              const expanded = expandedFolders[folder];
              return (
                <div key={folder} className="space-y-2">
                  <button type="button" className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm font-semibold hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={() => toggleFolder(folder)}>
                    {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    <Folder className="h-4 w-4 text-[var(--accent)]" />
                    <span>{folder}</span>
                  </button>
                  {expanded ? (
                    <div className="space-y-1 pl-6">
                      {files.map((file) => {
                        const selected = file.id === selectedFile.id;
                        return (
                          <button key={file.id} type="button" className={cn("flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition", selected ? "bg-[image:var(--accent-active)] text-white" : "text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]")} onClick={() => setSelectedFileId(file.id)}>
                            <FileText className="h-4 w-4" />
                            <span className="truncate">{file.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </aside>

        <article className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          <div className="border-b border-[var(--border)] pb-5">
            <p className="text-sm text-[var(--muted)]">Preview</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">{selectedFile.title.replace(/\.md$/u, "")}</h2>
            <p className="mt-3 text-base leading-7 text-[var(--muted)]">{selectedFile.summary}</p>
          </div>

          <div className="prose-preview mt-6 space-y-6">
            {selectedFile.sections.map((section) => (
              <section key={section.heading} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                <h3 className="text-xl font-semibold">{section.heading}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/90">{section.body}</p>
              </section>
            ))}
          </div>
        </article>

        <aside className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
          <p className="text-sm font-semibold text-[var(--muted)]">Reading progress</p>
          <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="flex items-center justify-between text-sm">
              <span>{selectedFile.title}</span>
              <span className="font-semibold">{selectedFile.progress}%</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-[var(--surface-muted)]"><div className="h-2 rounded-full bg-[image:var(--accent-active)]" style={{ width: `${selectedFile.progress}%` }} /></div>
          </div>

          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-sm font-semibold">Document outline</p>
            <div className="mt-4 space-y-3">
              {selectedFile.sections.map((section, index) => (
                <div key={section.heading} className="grid grid-cols-[4px_1fr] gap-3">
                  <span className={cn("rounded-full", index === 0 ? "bg-[var(--accent)]" : "bg-[var(--border)]")} />
                  <div>
                    <p className="text-sm font-medium">{section.heading}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">Section {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
