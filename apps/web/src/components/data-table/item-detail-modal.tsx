"use client";

import * as React from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditItemModal } from "@/components/data-table/edit-item-modal";

type ItemDetailModalProps = {
  open: boolean;
  onClose: () => void;
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
};

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  );
}

function Panel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 ${className}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-3 text-sm leading-7 text-[var(--foreground)]/90">{children}</div>
    </section>
  );
}

export function ItemDetailModal({ open, onClose, item, domainColumnLabel, typeColumnLabel, showDomainColumn = true }: ItemDetailModalProps) {
  const [editOpen, setEditOpen] = React.useState(false);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm" onClick={onClose}>
        <div className="modal-scroll max-h-[92vh] w-full max-w-7xl overflow-y-auto rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
          <div className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--card)]/95 px-6 py-5 backdrop-blur">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(340px,500px)_auto]">
              <div className="min-w-0 flex flex-col items-start text-left">
                <p className="text-sm font-medium leading-none text-[var(--muted)]">View details</p>
                <div className="mt-2 flex items-center gap-3">
                  <h2 className="text-[1.85rem] font-semibold leading-none tracking-tight">{item.title}</h2>
                  {item.favorite ? <Star className="h-5 w-5 shrink-0 fill-[var(--favorite)] text-[var(--favorite)]" /> : null}
                </div>
              </div>

              <div className="min-h-[74px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                <p className="text-center text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Tags</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button type="button" className="focus-ring shrink-0 rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={onClose}>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
              <div className="space-y-4">
                <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
                  <h3 className="text-center text-[1.75rem] font-semibold">Summary</h3>
                  <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-7 text-[var(--muted)]">This summary area previews the item-level overview that will later be generated from metadata, notes, attachments, and linked references.</p>
                  <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-2">
                    <MetricCard label={typeColumnLabel} value={item.type} />
                    <MetricCard label={showDomainColumn ? domainColumnLabel : "Category"} value={showDomainColumn ? item.domain : "General"} />
                    <MetricCard label="Updated" value={item.updated} />
                    <MetricCard label="Status" value={item.status} />
                    <MetricCard label="Rating" value={item.rating} />
                    <MetricCard label="Favorite" value={item.favorite ? "Yes" : "No"} />
                  </div>
                </section>

                <Panel title="Description">{item.description}</Panel>
                <Panel title="Note">This is a sample note area. Later phases can show long notes, personal comments, linked entities, source references, file paths, and module-specific metadata here.</Panel>
              </div>

              <Panel title="Facts" className="h-full xl:min-h-[100%]">
                <div className="space-y-3">
                  {[
                    ["Linked notes", "3 related notes"],
                    ["Attachments", "3 files"],
                    ["References", "2 source links"],
                    ["Last opened", "5 minutes ago"],
                    ["Storage", "Local metadata index"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-center">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">{label}</p>
                      <p className="mt-1 text-sm font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>

          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[var(--border)] bg-[var(--card)]/95 px-6 py-4 backdrop-blur">
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button onClick={() => setEditOpen(true)}>Edit item</Button>
          </div>
        </div>
      </div>
      <EditItemModal open={editOpen} onClose={() => setEditOpen(false)} itemTitle={item.title} itemDescription={item.description} />
    </>
  );
}
