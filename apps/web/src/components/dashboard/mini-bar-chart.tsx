type ChartDatum = {
  label: string;
  value: number;
};

type MiniBarChartProps = {
  title: string;
  description: string;
  data: ChartDatum[];
};

export function MiniBarChart({ title, description, data }: MiniBarChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <section className="liquid-surface rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
      </div>

      <div className="mt-6 space-y-4">
        {data.map((item) => {
          const width = `${Math.max((item.value / maxValue) * 100, 4)}%`;
          return (
            <div key={item.label} className="grid grid-cols-[110px_1fr_56px] items-center gap-3">
              <span className="text-sm text-[var(--muted)]">{item.label}</span>
              <div className="h-3 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                <div className="h-full rounded-full bg-[image:var(--accent-active)]" style={{ width }} />
              </div>
              <span className="text-right text-sm font-medium">{item.value}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
