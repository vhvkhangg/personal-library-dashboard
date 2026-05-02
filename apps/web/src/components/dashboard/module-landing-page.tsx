import { MiniBarChart } from "@/components/dashboard/mini-bar-chart";
import { MediaPreviewPanel } from "@/components/dashboard/media-preview-panel";
import { RecentUpdates } from "@/components/dashboard/recent-updates";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { TopTags } from "@/components/dashboard/top-tags";
import { AreaChart, ColumnChart, DonutChart, LineChart } from "@/components/dashboard/visual-charts";
import { DataTableShell } from "@/components/data-table/data-table-shell";

type ModuleLandingPageProps = {
  title: string;
  description: string;
  domainColumn?: string;
  domainValue?: string;
  typeColumnLabel?: string;
  typeValue?: string;
  showFavorites?: boolean;
  showDomainColumn?: boolean;
  mediaPreview?: "image" | "picture" | "illustration" | "video" | "music" | "movie" | "album";
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
const typeData = [{ label: "Main", value: 54 }, { label: "Support", value: 36 }, { label: "Reference", value: 24 }, { label: "Planning", value: 16 }];
const monthlyData = [{ label: "Jan", value: 12 }, { label: "Feb", value: 16 }, { label: "Mar", value: 19 }, { label: "Apr", value: 24 }];
const areaData = [{ label: "W1", value: 8 }, { label: "W2", value: 13 }, { label: "W3", value: 9 }, { label: "W4", value: 18 }];

export function ModuleLandingPage({ title, description, domainColumn, domainValue, typeColumnLabel = "Type", typeValue, showFavorites = true, showDomainColumn = true, mediaPreview, showAnalytics = false }: ModuleLandingPageProps) {
  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--muted)]">Module</p>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[var(--muted)]">{description}</p>
        </div>
      </header>

      {mediaPreview ? <MediaPreviewPanel variant={mediaPreview} /> : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{metricLabels.map(([label, value, note]) => <SummaryCard key={label} title={label} value={value} description={note} />)}</section>

      {showAnalytics ? (
        <>
          <section className="grid gap-6 xl:grid-cols-4"><MiniBarChart title={`${title} status breakdown`} description="Per-module distribution by status." data={statusData} /><ColumnChart title={`${title} column sample`} description="Sample column chart for this module." data={typeData} /><LineChart title={`${title} line sample`} description="Sample trend line for this module." data={monthlyData} /><DonutChart title={`${title} tag share`} description="Sample donut chart for module tags." data={statusData} /></section>
          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"><AreaChart title={`${title} weekly activity`} description="Sample area chart for recent activity." data={areaData} /><TopTags /></section>
          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"><RecentUpdates /><MiniBarChart title={`${title} quality bands`} description="Sample quality distribution for this module." data={typeData} /></section>
        </>
      ) : null}

      {showFavorites ? <DataTableShell title={`${title} Favorites`} domainColumn={domainColumn} domainValue={domainValue} typeColumnLabel={typeColumnLabel} typeValue={typeValue} favoriteOnly showToolbar={false} showFooter={false} maxRows={10} showDomainColumn={showDomainColumn} /> : null}
      <DataTableShell title={`${title} Items`} domainColumn={domainColumn} domainValue={domainValue} typeColumnLabel={typeColumnLabel} typeValue={typeValue} showDomainColumn={showDomainColumn} />
    </div>
  );
}
