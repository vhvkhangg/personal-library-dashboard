"use client";

import * as React from "react";
import { MiniBarChart } from "@/components/dashboard/mini-bar-chart";
import { MediaPreviewPanel } from "@/components/dashboard/media-preview-panel";
import { RecentUpdates } from "@/components/dashboard/recent-updates";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { TopTags } from "@/components/dashboard/top-tags";
import { AreaChart, ColumnChart, DonutChart, LineChart } from "@/components/dashboard/visual-charts";
import { DataTableShell } from "@/components/data-table/data-table-shell";
import { cn } from "@/lib/utils";

type PreviewVariant = "image" | "picture" | "illustration" | "video" | "music" | "movie" | "album" | "account";

type ModuleLandingPageProps = {
  title: string;
  description: string;
  domainColumn?: string;
  domainValue?: string;
  typeColumnLabel?: string;
  typeValue?: string;
  showFavorites?: boolean;
  showDomainColumn?: boolean;
  mediaPreview?: PreviewVariant;
  showAnalytics?: boolean;
};

const metricLabels = [
  ["Total", "184", "All items inside this module"],
  ["Favorites", "28", "Pinned and frequently revisited"],
  ["Active", "121", "Currently visible in the main library"],
  ["Drafts", "17", "Items still being curated"],
  ["Recently Updated", "12", "Modified in the last 7 days"],
  ["High Rated", "42", "Items rated 8.0 or above"],
  ["With Notes", "109", "Items with additional notes or context"],
  ["Archived", "18", "Kept for history or long-term storage"],
] as const;

const statusData = [{ label: "Active", value: 121 }, { label: "Draft", value: 17 }, { label: "Archived", value: 18 }, { label: "Favorite", value: 28 }];
const typeData = [{ label: "Apr 01", value: 54 }, { label: "Apr 08", value: 36 }, { label: "Apr 15", value: 24 }, { label: "Apr 22", value: 46 }, { label: "Apr 29", value: 58 }];
const monthlyData = [{ label: "Apr 01", value: 12 }, { label: "Apr 08", value: 16 }, { label: "Apr 15", value: 19 }, { label: "Apr 22", value: 24 }, { label: "Apr 29", value: 31 }];
const areaData = [{ label: "Apr 01", value: 8 }, { label: "Apr 08", value: 13 }, { label: "Apr 15", value: 9 }, { label: "Apr 22", value: 18 }, { label: "Apr 29", value: 26 }];

function getPreviewTabLabel(title: string, variant: PreviewVariant) {
  if (variant === "music" || variant === "video" || variant === "movie") return "Player";
  if (["Book", "Novel", "Manga", "Manhua", "Manhwa", "Convert", "Comic"].includes(title)) return "Reader";
  return "Viewer";
}

function ModuleTabs({ activeTab, previewLabel, onChange }: { activeTab: "overview" | "preview"; previewLabel: string; onChange: (tab: "overview" | "preview") => void }) {
  return (
    <div className="liquid-surface inline-flex rounded-2xl border border-[var(--border)] bg-[var(--card)] p-1">
      {[["overview", "Overview"], ["preview", previewLabel]].map(([key, label]) => {
        const active = activeTab === key;
        return (
          <button key={key} type="button" className={cn("focus-ring rounded-xl px-4 py-2 text-sm font-semibold transition", active ? "bg-[image:var(--accent-active)] text-white shadow-sm shadow-indigo-950/20" : "text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]")} onClick={() => onChange(key as "overview" | "preview")}>{label}</button>
        );
      })}
    </div>
  );
}

function AnalyticsBlocks({ title }: { title: string }) {
  return (
    <>
      <section className="grid gap-6 xl:grid-cols-2">
        <MiniBarChart title={`${title} status breakdown`} description="Per-module distribution by status." data={statusData} />
        <TopTags />
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <ColumnChart title={`${title} activity columns`} description="Daily activity sample with date-aware points." data={typeData} />
        <LineChart title={`${title} trend line`} description="Hover points to inspect each date." data={monthlyData} />
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <AreaChart title={`${title} weekly activity`} description="Larger area chart for recent activity by date." data={areaData} />
        <DonutChart title={`${title} tag share`} description="Sample donut chart for module tags." data={statusData} />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"><RecentUpdates /><MiniBarChart title={`${title} quality bands`} description="Sample quality distribution for this module." data={typeData} /></section>
    </>
  );
}

export function ModuleLandingPage({ title, description, domainColumn, domainValue, typeColumnLabel = "Type", typeValue, showFavorites = true, showDomainColumn = true, mediaPreview, showAnalytics = false }: ModuleLandingPageProps) {
  const [activeTab, setActiveTab] = React.useState<"overview" | "preview">("overview");
  const previewLabel = mediaPreview ? getPreviewTabLabel(title, mediaPreview) : "Viewer";
  const showPreview = mediaPreview && activeTab === "preview";

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--muted)]">Overview</p>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[var(--muted)]">{description}</p>
        </div>
        {mediaPreview ? <ModuleTabs activeTab={activeTab} previewLabel={previewLabel} onChange={setActiveTab} /> : null}
      </header>

      {showPreview ? <MediaPreviewPanel variant={mediaPreview} /> : null}

      {!showPreview ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{metricLabels.map(([label, value, note]) => <SummaryCard key={label} title={label} value={value} description={note} />)}</section>
          {showAnalytics ? <AnalyticsBlocks title={title} /> : null}
          {showFavorites ? <DataTableShell title={`${title} Favorites`} domainColumn={domainColumn} domainValue={domainValue} typeColumnLabel={typeColumnLabel} typeValue={typeValue} favoriteOnly showToolbar={false} showFooter={false} maxRows={10} showDomainColumn={showDomainColumn} /> : null}
          <DataTableShell title={`${title} Items`} domainColumn={domainColumn} domainValue={domainValue} typeColumnLabel={typeColumnLabel} typeValue={typeValue} showDomainColumn={showDomainColumn} />
        </>
      ) : null}
    </div>
  );
}
