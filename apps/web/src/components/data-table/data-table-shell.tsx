"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { CalendarDays, Check, ChevronDown, Columns3, Download, Filter, Plus, RotateCcw, Search, Star, X } from "lucide-react";
import { NewItemModal } from "@/components/data-table/new-item-modal";
import { RowActionsMenu } from "@/components/data-table/row-actions-menu";
import { RowsPerPageSelect } from "@/components/data-table/rows-per-page-select";
import { Button } from "@/components/ui/button";
import { SelectMenu } from "@/components/ui/select-menu";
import { cn } from "@/lib/utils";

type DataTableShellProps = {
  title: string;
  domainColumn?: string;
  domainValue?: string;
  typeColumnLabel?: string;
  typeValue?: string;
  favoriteOnly?: boolean;
  showToolbar?: boolean;
  showFooter?: boolean;
  maxRows?: number;
  showDomainColumn?: boolean;
};

type MockRow = {
  id: number;
  title: string;
  description: string;
  type: string;
  tags: string[];
  domain: string;
  updated: string;
  rating: string;
  status: string;
  favorite?: boolean;
};

type PopoverProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
};

const filterTabs = ["All", "Active", "Draft", "Archived"] as const;
const defaultModuleTags = ["Tag", "Theme", "Character", "Mood", "Favorite", "Reference", "World", "Review"];
const typeOptions = [
  { value: "all", label: "All types" },
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "reference", label: "Reference" },
];
const tagOptions = [
  { value: "all", label: "All tags" },
  { value: "theme", label: "Theme" },
  { value: "character", label: "Character" },
  { value: "mood", label: "Mood" },
  { value: "review", label: "Review" },
];
const statusCycle = ["Active", "Draft", "Archived"] as const;
const statusStyles: Record<(typeof statusCycle)[number], string> = {
  Active: "border-emerald-700 bg-emerald-300 text-emerald-950 shadow-sm shadow-emerald-900/10 hover:bg-emerald-400 dark:border-emerald-400/50 dark:bg-emerald-500/12 dark:text-emerald-200 dark:hover:bg-emerald-500/20",
  Draft: "border-amber-700 bg-amber-300 text-amber-950 shadow-sm shadow-amber-900/10 hover:bg-amber-400 dark:border-amber-400/50 dark:bg-amber-500/12 dark:text-amber-200 dark:hover:bg-amber-500/20",
  Archived: "border-slate-700 bg-slate-400 text-slate-950 shadow-sm shadow-slate-900/10 hover:bg-slate-500 dark:border-slate-400/45 dark:bg-slate-500/12 dark:text-slate-200 dark:hover:bg-slate-500/20",
};

function StatusDropdown({ initialStatus }: { initialStatus: string }) {
  const initial = statusCycle.includes(initialStatus as (typeof statusCycle)[number]) ? (initialStatus as (typeof statusCycle)[number]) : "Active";
  const [status, setStatus] = React.useState<(typeof statusCycle)[number]>(initial);
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState<{ top: number; left: number }>({ top: -9999, left: -9999 });
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const panelRef = React.useRef<HTMLDivElement | null>(null);


  const calculatePosition = React.useCallback(() => {
    if (!triggerRef.current) return { top: -9999, left: -9999 };
    const rect = triggerRef.current.getBoundingClientRect();
    const panelWidth = panelRef.current?.offsetWidth ?? 144;
    const panelHeight = panelRef.current?.offsetHeight ?? 132;
    const gap = 8;
    const availableBelow = window.innerHeight - rect.bottom;
    const top = availableBelow < panelHeight + gap
      ? Math.max(rect.top - panelHeight - gap, gap)
      : Math.min(rect.bottom + gap, window.innerHeight - panelHeight - gap);
    const left = Math.min(Math.max(rect.left + rect.width / 2 - panelWidth / 2, gap), window.innerWidth - panelWidth - gap);
    return { top, left };
  }, []);

  const updatePosition = React.useCallback(() => {
    setPosition(calculatePosition());
  }, [calculatePosition]);

  React.useEffect(() => {
    if (!open) return;

    function handleOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setOpen(false);
    }

    function handleRelayout() {
      updatePosition();
    }

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

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cn("focus-ring inline-flex h-9 min-w-24 items-center justify-center gap-2 rounded-full border px-3 text-xs font-semibold transition", statusStyles[status])}
        onClick={handleToggle}
      >
        {status}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open
        ? createPortal(
            <div
              ref={panelRef}
              className="fixed z-[210] w-36 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-1 shadow-xl shadow-black/30"
              style={{ top: `${position.top}px`, left: `${position.left}px` }}
            >
              {statusCycle.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={cn("mb-1 flex w-full items-center justify-center rounded-xl border px-3 py-2 text-xs font-semibold last:mb-0", statusStyles[option])}
                  onClick={() => { setStatus(option); setOpen(false); }}
                >
                  {option}
                </button>
              ))}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function createRows(entity: string, typeValue?: string, domainValue?: string): MockRow[] {
  const sharedDates = ["Apr 29, 2026", "Apr 24, 2026", "Apr 18, 2026", "Apr 12, 2026", "Apr 01, 2026", "Mar 29, 2026"];

  const presets: Record<string, Partial<MockRow>[]> = {
    Movie: [
      { title: "Dune", description: "Epic sci-fi film with political intrigue, layered factions, and a visually rich desert world.", type: "72%", tags: ["Sci-fi", "Epic"], domain: "Watching", rating: "8.6 / 10", status: "Active", favorite: true },
      { title: "Interstellar", description: "Space exploration, family bonds, and time distortion across a cinematic journey.", type: "100%", tags: ["Sci-fi", "Space"], domain: "Completed", rating: "9.1 / 10", status: "Active", favorite: true },
      { title: "Spirited Away", description: "Animated fantasy film with memorable spirits, symbolism, and emotional growth.", type: "100%", tags: ["Fantasy", "Animation"], domain: "Completed", rating: "9.0 / 10", status: "Archived" },
      { title: "The Batman", description: "Detective-driven noir take on Gotham with grounded action and mystery.", type: "45%", tags: ["Action", "Mystery"], domain: "Watching", rating: "8.2 / 10", status: "Active" },
      { title: "Arrival", description: "Linguistics, aliens, and nonlinear time in a thoughtful first-contact drama.", type: "0%", tags: ["First Contact", "Drama"], domain: "Planned", rating: "8.4 / 10", status: "Draft" },
    ],
    Actor: [
      { title: "Cillian Murphy", description: "Actor known for intense, restrained performances across film and television.", type: "Male", tags: ["Drama", "Lead"], domain: "Ireland", rating: "8.8 / 10", status: "Active", favorite: true },
      { title: "Emma Stone", description: "Actor working across drama, comedy, and fantasy with strong screen presence.", type: "Female", tags: ["Comedy", "Award"], domain: "United States", rating: "8.7 / 10", status: "Active" },
      { title: "Gong Yoo", description: "Korean actor known for emotionally resonant film and series roles.", type: "Male", tags: ["K-Drama", "Film"], domain: "South Korea", rating: "8.5 / 10", status: "Draft", favorite: true },
      { title: "Zhang Ziyi", description: "Chinese actor with iconic wuxia and prestige-cinema performances.", type: "Female", tags: ["Wuxia", "Cinema"], domain: "China", rating: "8.6 / 10", status: "Archived" },
    ],
    Album: [
      { title: "Kyoto Street Album", description: "Mixed album containing picture, image, and illustration items grouped in one viewer.", type: "Mixed Album", tags: ["Collection", "Gallery"], domain: "Travel Archive", rating: "8.7 / 10", status: "Active", favorite: true },
      { title: "Worldbuilding Board", description: "Reference album that combines mood images, concept illustrations, and scanned pages.", type: "Reference Album", tags: ["Reference", "Moodboard"], domain: "Ideaverse", rating: "8.5 / 10", status: "Draft" },
    ],
    Music: [
      { title: "Aether Bloom", description: "Atmospheric electronic album for late-night focus sessions and ambient reading.", type: "Album", tags: ["Ambient", "Focus"], domain: "Aurora Lane", rating: "8.8 / 10", status: "Active", favorite: true },
      { title: "Blue Orbit", description: "Instrumental electronic track with a slow build and cinematic texture.", type: "Single", tags: ["Electronic", "Chill"], domain: "Kai Miro", rating: "8.0 / 10", status: "Draft" },
      { title: "Velvet Signals", description: "Dream-pop playlist sample with soft vocals and layered synth tones.", type: "Playlist", tags: ["Dream Pop", "Soft"], domain: "Various Artists", rating: "8.4 / 10", status: "Archived" },
    ],
    Image: [
      { title: "Library Cover Mockup", description: "Clean cover mockup for testing thumbnails, metadata cards, and gallery behavior.", type: "Cover", tags: ["Mockup", "Design"], domain: "Archive", rating: "8.1 / 10", status: "Active", favorite: true },
      { title: "Night City Concept", description: "Concept art image with neon city lighting and dense urban composition.", type: "Concept", tags: ["City", "Neon"], domain: "Portfolio", rating: "8.7 / 10", status: "Draft" },
    ],
    Picture: [
      { title: "Kyoto Street Set", description: "Travel photo collection with night market details and architecture references.", type: "Photo Set", tags: ["Travel", "Street"], domain: "Kyoto", rating: "8.3 / 10", status: "Active", favorite: true },
      { title: "Coffee Desk Study", description: "Lifestyle photo of a reading desk used for UI preview and color testing.", type: "Still", tags: ["Lifestyle", "Indoor"], domain: "Studio", rating: "7.9 / 10", status: "Draft" },
    ],
    Illustration: [
      { title: "Astra Portrait", description: "Character portrait illustration with stylized lighting and painterly edges.", type: "Portrait", tags: ["Character", "Painterly"], domain: "Unknown", rating: "8.9 / 10", status: "Active", favorite: true },
      { title: "Forest Shrine Panel", description: "Wide scene illustration with soft foliage, ruins, and fantasy ambiance.", type: "Scene", tags: ["Fantasy", "Landscape"], domain: "Unknown", rating: "8.5 / 10", status: "Draft" },
    ],
  };

  const base = presets[entity] ?? Array.from({ length: 18 }).map((_, index) => ({
    title: `${entity} Item ${index + 1}`,
    description: "This placeholder description sits under the item title, so the row is compact while still showing useful context before opening View details.",
    type: typeValue ?? ["Primary", "Secondary", "Reference"][index % 3],
    tags: index % 2 === 0 ? ["Tag", "Theme"] : ["Tag", "Character", "Mood"],
    domain: domainValue ?? ["World", "Modern", "Fantasy", "Urban", "Original", "Sci-fi"][index % 6],
    rating: `${(index % 4) + 7}.0 / 10`,
    status: statusCycle[index % statusCycle.length],
    favorite: index === 0 || index === 2 || index === 5,
  }));

  return base.map((row, index) => ({
    id: index + 1,
    title: row.title ?? `${entity} Item ${index + 1}`,
    description: row.description ?? "This placeholder description sits under the item title, so the row is compact while still showing useful context before opening View details.",
    type: row.type ?? typeValue ?? "Type",
    tags: row.tags ?? ["Tag"],
    domain: row.domain ?? domainValue ?? "Context",
    updated: row.updated ?? sharedDates[index % sharedDates.length],
    rating: row.rating ?? "8.0 / 10",
    status: row.status ?? statusCycle[index % statusCycle.length],
    favorite: row.favorite ?? false,
  }));
}

function getInitials(title: string) {
  return title
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "IT";
}

function PageButton({ label, active, disabled, onClick }: { label: React.ReactNode; active?: boolean; disabled?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "focus-ring inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-medium transition",
        active
          ? "border-transparent bg-[image:var(--accent-active)] text-white shadow-sm shadow-indigo-950/20"
          : "border-[var(--border)] bg-transparent text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]",
        disabled && "opacity-50",
      )}
    >
      {label}
    </button>
  );
}

function Popover({ open, onOpenChange, trigger, children, align = "right" }: PopoverProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) onOpenChange(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [onOpenChange]);

  return (
    <div ref={ref} className="relative">
      <div onClick={() => onOpenChange(!open)}>{trigger}</div>
      {open ? (
        <div className={cn("absolute top-[calc(100%+10px)] z-40 w-60 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-xl shadow-black/25", align === "right" ? "right-0" : "left-0")}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

function ModuleTagsPanel({ tags, onAddTag }: { tags: string[]; onAddTag: () => void }) {
  return (
    <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold">Tags</p>
        <Button variant="outline" size="sm" onClick={onAddTag}><Plus className="h-4 w-4" />New Tag</Button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)]">{tag}</span>
        ))}
      </div>
    </div>
  );
}

function AvatarPreviewModal({ avatar, title, open, onClose }: { avatar: string; title: string; open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[240] flex h-screen w-screen items-center justify-center overflow-hidden bg-slate-950/80 p-4 backdrop-blur-md" onClick={onClose}>
      <div className="w-full max-w-3xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between gap-4 text-left">
          <div>
            <p className="text-sm font-medium text-[var(--muted)]">Avatar preview</p>
            <h3 className="mt-1 text-2xl font-semibold">{title}</h3>
          </div>
          <button type="button" className="focus-ring rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mx-auto mt-8 flex h-[22.5rem] w-[22.5rem] items-center justify-center rounded-[3rem] border border-[var(--border)] bg-[image:var(--accent-active)] text-7xl font-black tracking-[0.14em] text-white shadow-lg shadow-indigo-950/30">
          {avatar}
        </div>
      </div>
    </div>
  );
}

function NewTagModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between gap-4">
          <div><p className="text-sm font-medium text-[var(--muted)]">Create tag</p><h3 className="mt-1 text-2xl font-semibold">New Tag</h3></div>
          <button type="button" className="focus-ring rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={onClose} aria-label="Close new tag modal">✕</button>
        </div>
        <div className="mt-6 space-y-4">
          <label className="block space-y-2"><span className="text-sm font-medium text-[var(--muted)]">Tag name</span><input className="focus-ring h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)]" defaultValue="New favorite tag" /></label>
          <label className="block space-y-2"><span className="text-sm font-medium text-[var(--muted)]">Color note</span><input className="focus-ring h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)]" defaultValue="Purple gradient badge" /></label>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"><p className="text-sm font-medium">Preview</p><div className="mt-3 inline-flex rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-medium">New favorite tag</div></div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3"><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={onClose}>Create tag</Button></div>
      </div>
    </div>
  );
}

export function DataTableShell({ title, domainColumn = "Context", domainValue, typeColumnLabel = "Type", typeValue, favoriteOnly = false, showToolbar = true, showFooter = true, maxRows, showDomainColumn = true }: DataTableShellProps) {
  const entityName = title.replace(/\s+(Items|Favorites)$/u, "");
  const allRows = React.useMemo(() => createRows(entityName, typeValue, domainValue), [entityName, typeValue, domainValue]);
  const sourceRows = favoriteOnly ? allRows.filter((row) => row.favorite) : allRows;
  const showAvatarColumn = !["Information", "Health", "Technology", "Miscellaneous"].includes(entityName);
  const centerDomain = domainColumn === "Vault Area";

  const [moduleTags] = React.useState(defaultModuleTags);
  const [activeFilter, setActiveFilter] = React.useState<(typeof filterTabs)[number]>("All");
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [tagFilter, setTagFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [newItemOpen, setNewItemOpen] = React.useState(false);
  const [newTagOpen, setNewTagOpen] = React.useState(false);
  const [avatarPreview, setAvatarPreview] = React.useState<{ avatar: string; title: string } | null>(null);
  const [columnsOpen, setColumnsOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);
  const scrollOffsetFromBottom = React.useRef<number | null>(null);

  const limitedRows = maxRows ? sourceRows.slice(0, maxRows) : sourceRows;
  const totalPages = favoriteOnly ? 1 : Math.max(1, Math.ceil(limitedRows.length / rowsPerPage));
  const page = Math.min(currentPage, totalPages);
  const startIndex = favoriteOnly ? 0 : (page - 1) * rowsPerPage;
  const endIndex = favoriteOnly ? limitedRows.length : Math.min(startIndex + rowsPerPage, limitedRows.length);
  const visibleRows = favoriteOnly ? limitedRows : limitedRows.slice(startIndex, endIndex);

  React.useEffect(() => {
    if (scrollOffsetFromBottom.current === null) return;
    requestAnimationFrame(() => {
      const targetTop = Math.max(document.documentElement.scrollHeight - scrollOffsetFromBottom.current!, 0);
      window.scrollTo({ top: targetTop, behavior: "auto" });
      scrollOffsetFromBottom.current = null;
    });
  }, [page, rowsPerPage]);

  function captureScrollOffsetFromBottom() {
    scrollOffsetFromBottom.current = document.documentElement.scrollHeight - window.scrollY;
  }

  function handleChangePage(nextPage: number) {
    captureScrollOffsetFromBottom();
    setCurrentPage(nextPage);
  }

  function handleResetFilters() {
    setTypeFilter("all");
    setTagFilter("all");
    setActiveFilter("All");
  }

  return (
    <>
      <section className="overflow-visible rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
        <div className="border-b border-[var(--border)] p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            {!favoriteOnly ? <Button variant="outline" onClick={() => setNewItemOpen(true)}><Plus className="h-4 w-4" />New Item</Button> : null}
          </div>

          {showToolbar ? (
            <>
              <div className="mt-5 flex flex-wrap items-center gap-2" role="tablist" aria-label={`${title} filters`}>
                {filterTabs.map((tab) => {
                  const active = activeFilter === tab;
                  return <button key={tab} type="button" className={cn("focus-ring rounded-xl border px-3 py-1.5 text-sm font-medium transition", active ? "border-transparent bg-[image:var(--accent-active)] text-white shadow-sm shadow-indigo-950/20" : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]")} onClick={() => setActiveFilter(tab)}>{tab}</button>;
                })}
              </div>

              <ModuleTagsPanel tags={moduleTags} onAddTag={() => setNewTagOpen(true)} />

              <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
                <div className="grid gap-3 xl:grid-cols-[minmax(220px,1fr)_150px_150px_170px_170px_auto_auto]">
                  <div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" /><input className="focus-ring h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-10 pr-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]" placeholder="Search items..." /></div>
                  <SelectMenu value={typeFilter} onChange={setTypeFilter} options={typeOptions} placeholder="Type" />
                  <SelectMenu value={tagFilter} onChange={setTagFilter} options={tagOptions} placeholder="Tag" />
                  <label className="relative block"><CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" /><input type="text" inputMode="numeric" defaultValue="04/01/2026" className="focus-ring h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-10 pr-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]" /></label>
                  <label className="relative block"><CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" /><input type="text" inputMode="numeric" defaultValue="04/30/2026" className="focus-ring h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-10 pr-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]" /></label>
                  <Button variant="outline" onClick={handleResetFilters}><RotateCcw className="h-4 w-4" />Reset defaults</Button>
                  <Button><Filter className="h-4 w-4" />Filter</Button>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <Popover open={columnsOpen} onOpenChange={setColumnsOpen} trigger={<Button variant="outline" className="border-slate-300/80 bg-white/60 text-slate-700 hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"><Columns3 className="h-4 w-4" />Columns</Button>}>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold">Visible columns</p>
                    {["Favorite", "#", showAvatarColumn ? "Avatar" : null, "Item", typeColumnLabel, "Tags", showDomainColumn ? domainColumn : null, "Updated", "Status", "Rating"].filter(Boolean).map((label) => (
                      <label key={label} className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"><span>{label}</span><Check className="h-4 w-4 text-emerald-400" /></label>
                    ))}
                  </div>
                </Popover>
                <Popover open={exportOpen} onOpenChange={setExportOpen} trigger={<Button className="bg-[image:var(--accent-active)] text-white shadow-sm shadow-indigo-950/20"><Download className="h-4 w-4" />Export</Button>}>
                  <div className="space-y-3">
                    {[ ["JSON", "Full structured data"], ["CSV", "Spreadsheet-compatible rows"], ["Excel", "Workbook export sample"] ].map(([format, detail]) => (
                      <label key={format} className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm"><input type="radio" name="export-format" defaultChecked={format === "JSON"} className="mt-1" /><span><span className="font-semibold">{format}</span><span className="mt-1 block text-xs text-[var(--muted)]">{detail}</span></span></label>
                    ))}
                    <Button className="w-full">Export</Button>
                  </div>
                </Popover>
              </div>
            </>
          ) : null}
        </div>

        <div className="overflow-x-auto overflow-y-visible">
          <table className={cn("w-full table-fixed border-collapse text-sm", showDomainColumn ? "min-w-[1380px]" : "min-w-[1260px]")}>
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-subtle)] text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                <th className="w-16 px-4 py-3 text-center">Fav</th>
                <th className="w-16 px-4 py-3 text-center">#</th>
                {showAvatarColumn ? <th className="w-20 px-4 py-3 text-center">Avatar</th> : null}
                <th className="w-[360px] px-5 py-3 text-left">Item</th>
                <th className="w-32 px-4 py-3 text-left">{typeColumnLabel}</th>
                <th className="w-56 px-4 py-3 text-center">Tags</th>
                {showDomainColumn ? <th className={cn("w-36 px-4 py-3", centerDomain ? "text-center" : "text-left")}>{domainColumn}</th> : null}
                <th className="w-36 px-4 py-3 text-left">Updated</th>
                <th className="w-28 px-4 py-3 text-left">Status</th>
                <th className="w-28 px-4 py-3 text-left">Rating</th>
                <th className="w-20 px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, index) => (
                <tr key={row.id} className="border-b border-[var(--border)] align-top transition hover:bg-[var(--accent-hover)]/40 last:border-b-0">
                  <td className="px-4 py-4 text-center align-middle"><button type="button" className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-xl text-[var(--foreground)]/85 transition hover:bg-[var(--interactive-hover-bg)]"><Star className={cn("h-4 w-4", row.favorite ? "fill-[var(--favorite)] text-[var(--favorite)]" : "text-[var(--icon-quiet)]")} /></button></td>
                  <td className="px-4 py-4 text-center align-middle"><span className="inline-flex h-9 min-w-9 items-center justify-center rounded-2xl bg-[image:var(--accent-active)] px-2 text-sm font-semibold text-white shadow-sm shadow-indigo-950/20">{row.id}</span></td>
                  {showAvatarColumn ? <td className="px-4 py-4 text-center align-middle"><button type="button" className="focus-ring mx-auto inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold transition hover:border-[var(--accent)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={() => setAvatarPreview({ avatar: getInitials(row.title), title: row.title })}>{getInitials(row.title)}</button></td> : null}
                  <td className="px-5 py-4 align-middle"><div className="font-semibold">{row.title}</div><p className="mt-1 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{row.description}</p></td>
                  <td className="px-4 py-4 align-middle">{row.type}</td>
                  <td className="px-4 py-4 text-center align-middle"><div className="flex flex-wrap items-center justify-center gap-2">{row.tags.map((tag) => <span key={`${row.id}-${tag}`} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium">{tag}</span>)}</div></td>
                  {showDomainColumn ? <td className={cn("px-4 py-4 align-middle", centerDomain ? "text-center" : "text-left")}>{row.domain}</td> : null}
                  <td className="px-4 py-4 align-middle">{row.updated}</td>
                  <td className="px-4 py-4 align-middle"><StatusDropdown initialStatus={row.status} /></td>
                  <td className="px-4 py-4 align-middle font-medium">{row.rating}</td>
                  <td className="px-4 py-4 text-center align-middle"><RowActionsMenu item={row} domainColumnLabel={domainColumn} typeColumnLabel={typeColumnLabel} showDomainColumn={showDomainColumn} entityName={entityName} openUpward={favoriteOnly || index >= visibleRows.length - 2} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showFooter ? (
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] px-5 py-4">
            <p className="text-sm text-[var(--muted)]">Showing {limitedRows.length === 0 ? 0 : startIndex + 1}–{endIndex} of {limitedRows.length} placeholder results</p>
            {!favoriteOnly ? (
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3"><span className="text-sm text-[var(--muted)]">Rows per page</span><RowsPerPageSelect value={rowsPerPage} onChange={(value) => { captureScrollOffsetFromBottom(); setRowsPerPage(value); setCurrentPage(1); }} /></div>
                <div className="flex items-center gap-2">
                  <PageButton label="Previous" disabled={page === 1} onClick={() => handleChangePage(Math.max(1, page - 1))} />
                  {Array.from({ length: totalPages }).map((_, pageIndex) => <PageButton key={pageIndex + 1} label={pageIndex + 1} active={pageIndex + 1 === page} onClick={() => handleChangePage(pageIndex + 1)} />)}
                  <PageButton label="Next" disabled={page === totalPages} onClick={() => handleChangePage(Math.min(totalPages, page + 1))} />
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      <NewItemModal open={newItemOpen} onClose={() => setNewItemOpen(false)} moduleTitle={entityName} />
      <NewTagModal open={newTagOpen} onClose={() => setNewTagOpen(false)} />
      <AvatarPreviewModal avatar={avatarPreview?.avatar ?? ""} title={avatarPreview?.title ?? ""} open={avatarPreview !== null} onClose={() => setAvatarPreview(null)} />
    </>
  );
}
