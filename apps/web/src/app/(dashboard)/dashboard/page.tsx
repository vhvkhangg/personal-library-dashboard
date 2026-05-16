import { MiniBarChart } from "@/components/dashboard/mini-bar-chart";
import { RecentUpdates } from "@/components/dashboard/recent-updates";
import { StorageOverview } from "@/components/dashboard/storage-overview";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { TopTags } from "@/components/dashboard/top-tags";
import { AreaChart, ColumnChart, DonutChart, LineChart } from "@/components/dashboard/visual-charts";

const cards = [
  { title: "Total Items", value: "824", description: "All visible library items" },
  { title: "Favorites", value: "96", description: "Items marked with a star" },
  { title: "Recently Updated", value: "34", description: "Updated this week" },
  { title: "Storage Used", value: "428 GB", description: "Tracked local/cloud storage" }
];

const itemsByModule = [
  { label: "Fiction", value: 184 },
  { label: "Film", value: 132 },
  { label: "Media", value: 166 },
  { label: "F&B", value: 74 },
  { label: "Info", value: 98 },
  { label: "Ideaverse", value: 170 }
];

const ratingDistribution = [
  { label: "Apr 01", value: 52 },
  { label: "Apr 08", value: 86 },
  { label: "Apr 15", value: 122 },
  { label: "Apr 22", value: 188 },
  { label: "Apr 29", value: 243 }
];

const activityTrend = [
  { label: "Apr 01", value: 34 },
  { label: "Apr 08", value: 48 },
  { label: "Apr 15", value: 57 },
  { label: "Apr 22", value: 66 },
  { label: "Apr 29", value: 81 }
];

const storageTrend = [
  { label: "Apr 01", value: 92 },
  { label: "Apr 08", value: 118 },
  { label: "Apr 15", value: 143 },
  { label: "Apr 22", value: 166 },
  { label: "Apr 29", value: 196 }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-medium text-[var(--muted)]">Overview</p>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">Dark-first phase-1 overview. Real data will be connected after auth, tags, and storage.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{cards.map((card) => <SummaryCard key={card.title} {...card} />)}</section>

      <section className="grid gap-4 xl:grid-cols-2">
        <MiniBarChart title="Items by Module" description="Visible items grouped by module." data={itemsByModule} />
        <TopTags />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <ColumnChart title="Rating Distribution" description="Items grouped by date-aware rating samples." data={ratingDistribution} />
        <LineChart title="Monthly Activity" description="Hover points to inspect each sample date." data={activityTrend} />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <AreaChart title="Storage Growth" description="Larger area chart for tracked storage by date." data={storageTrend} />
        <DonutChart title="Library Composition" description="Sample donut chart by module." data={itemsByModule.slice(0, 5)} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.25fr_1fr]"><RecentUpdates /><StorageOverview /></section>
    </div>
  );
}
