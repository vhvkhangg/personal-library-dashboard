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
  { label: "0–2", value: 5 },
  { label: "2–4", value: 18 },
  { label: "4–6", value: 82 },
  { label: "6–8", value: 243 },
  { label: "8–10", value: 476 }
];

const activityTrend = [
  { label: "Jan", value: 34 },
  { label: "Feb", value: 48 },
  { label: "Mar", value: 57 },
  { label: "Apr", value: 66 }
];

const storageTrend = [
  { label: "W1", value: 92 },
  { label: "W2", value: 118 },
  { label: "W3", value: 143 },
  { label: "W4", value: 166 }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-medium text-[var(--muted)]">Overview</p>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Dark-first phase-1 overview. Real data will be connected after auth, tags, and storage.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => <SummaryCard key={card.title} {...card} />)}
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        <MiniBarChart title="Items by Module" description="Visible items grouped by module." data={itemsByModule} />
        <DonutChart title="Library Composition" description="Sample donut chart by module." data={itemsByModule.slice(0, 5)} />
        <ColumnChart title="Rating Distribution" description="Items grouped by rating range." data={ratingDistribution} />
        <LineChart title="Monthly Activity" description="Sample update activity across the library." data={activityTrend} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <AreaChart title="Storage Growth" description="Sample area chart for tracked storage." data={storageTrend} />
        <TopTags />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.25fr_1fr]">
        <RecentUpdates />
        <StorageOverview />
      </section>
    </div>
  );
}
