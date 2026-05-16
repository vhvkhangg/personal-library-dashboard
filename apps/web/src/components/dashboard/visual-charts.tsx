import type { ReactNode } from "react";

export type ChartDatum = {
  label: string;
  value: number;
};

type ChartProps = {
  title: string;
  description: string;
  data: ChartDatum[];
};

const palette = ["#6366f1", "#7c3aed", "#0ea5e9", "#22c55e", "#f59e0b", "#ef4444"];

function normalizePoints(data: ChartDatum[], width = 420, height = 150) {
  const max = Math.max(...data.map((item) => item.value), 1);
  const step = data.length > 1 ? width / (data.length - 1) : width;
  return data.map((item, index) => {
    const x = index * step;
    const y = height - (item.value / max) * height;
    return { ...item, x, y };
  });
}

function ChartShell({ title, description, children }: ChartProps & { children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
      </div>
      {children}
    </section>
  );
}

function SvgTooltip({ x, y, label, value }: { x: number; y: number; label: string; value: number }) {
  const tooltipX = Math.max(8, Math.min(x - 44, 324));
  const tooltipY = Math.max(8, y - 48);

  return (
    <g className="pointer-events-none opacity-0 transition-opacity group-hover:opacity-100">
      <rect x={tooltipX} y={tooltipY} width="88" height="38" rx="8" fill="var(--tooltip-bg)" stroke="var(--tooltip-border)" />
      <text x={tooltipX + 10} y={tooltipY + 16} className="fill-[var(--muted)] text-[9px]">{label}</text>
      <text x={tooltipX + 10} y={tooltipY + 31} className="fill-[var(--foreground)] text-[11px] font-semibold">{value}</text>
    </g>
  );
}

export function DonutChart({ title, description, data }: ChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  const segments = data.map((item, index) => {
    const previousTotal = data.slice(0, index).reduce((sum, previous) => sum + previous.value, 0);
    const dash = (item.value / total) * 100;
    const currentOffset = 25 - (previousTotal / total) * 100;
    return { item, index, dash, currentOffset };
  });

  return (
    <ChartShell title={title} description={description} data={data}>
      <div className="mt-5 flex items-center gap-6">
        <svg width="148" height="148" viewBox="0 0 42 42" className="-rotate-90">
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--surface-muted)" strokeWidth="6" />
          {segments.map(({ item, index, dash, currentOffset }) => (
            <circle key={item.label} cx="21" cy="21" r="15.915" fill="transparent" stroke={palette[index % palette.length]} strokeWidth="6" strokeDasharray={`${dash} ${100 - dash}`} strokeDashoffset={currentOffset}>
              <title>{`${item.label}: ${item.value}`}</title>
            </circle>
          ))}
        </svg>
        <div className="min-w-0 flex-1 space-y-3">
          {data.map((item, index) => (
            <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 text-[var(--muted)]"><span className="h-2.5 w-2.5 rounded-full" style={{ background: palette[index % palette.length] }} />{item.label}</span>
              <span className="font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </ChartShell>
  );
}

export function ColumnChart({ title, description, data }: ChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <ChartShell title={title} description={description} data={data}>
      <div className="mt-6 flex h-56 items-end gap-3">
        {data.map((item) => (
          <div key={item.label} className="group flex min-w-0 flex-1 flex-col items-center gap-2">
            <div className="relative flex h-40 w-full items-end rounded-xl bg-[var(--surface)] px-2 py-2">
              <div className="w-full rounded-lg bg-[image:var(--accent-active)]" style={{ height: `${Math.max((item.value / max) * 100, 8)}%` }}>
                <span className="sr-only">{item.label}: {item.value}</span>
              </div>
              <div className="pointer-events-none absolute -top-10 left-1/2 hidden min-w-24 -translate-x-1/2 rounded-lg border border-[var(--border)] bg-[var(--tooltip-bg)] px-2 py-1 text-xs shadow-lg group-hover:block">
                <span className="block text-[var(--muted)]">{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            </div>
            <span className="truncate text-xs text-[var(--muted)]">{item.label}</span>
          </div>
        ))}
      </div>
    </ChartShell>
  );
}

export function LineChart({ title, description, data }: ChartProps) {
  const points = normalizePoints(data);
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  return (
    <ChartShell title={title} description={description} data={data}>
      <svg viewBox="0 0 420 190" className="mt-6 h-56 w-full overflow-visible">
        {[0, 50, 100, 150].map((y) => <line key={y} x1="0" y1={y} x2="420" y2={y} stroke="var(--border)" strokeDasharray="4 6" />)}
        <polyline points={line} fill="none" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <g key={point.label} className="group">
            <circle cx={point.x} cy={point.y} r="7" fill="#6366f1" />
            <circle cx={point.x} cy={point.y} r="18" fill="transparent" />
            <SvgTooltip x={point.x} y={point.y} label={point.label} value={point.value} />
            <text x={point.x} y="182" textAnchor="middle" className="fill-[var(--muted)] text-[10px]">{point.label}</text>
          </g>
        ))}
      </svg>
    </ChartShell>
  );
}

export function AreaChart({ title, description, data }: ChartProps) {
  const points = normalizePoints(data, 420, 170);
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `0,170 ${line} 420,170`;
  return (
    <ChartShell title={title} description={description} data={data}>
      <svg viewBox="0 0 420 220" className="mt-6 h-72 w-full overflow-visible">
        {[0, 42, 85, 128, 170].map((y) => <line key={y} x1="0" y1={y} x2="420" y2={y} stroke="var(--border)" strokeDasharray="4 6" />)}
        <polygon points={area} fill="rgba(99,102,241,0.28)" />
        <polyline points={line} fill="none" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <g key={point.label} className="group">
            <circle cx={point.x} cy={point.y} r="7" fill="#7c3aed" />
            <circle cx={point.x} cy={point.y} r="18" fill="transparent" />
            <SvgTooltip x={point.x} y={point.y} label={point.label} value={point.value} />
            <text x={point.x} y="212" textAnchor="middle" className="fill-[var(--muted)] text-[10px]">{point.label}</text>
          </g>
        ))}
      </svg>
    </ChartShell>
  );
}
