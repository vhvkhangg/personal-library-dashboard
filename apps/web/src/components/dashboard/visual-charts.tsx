type ChartDatum = {
  label: string;
  value: number;
};

type ChartProps = {
  title: string;
  description: string;
  data: ChartDatum[];
};

const palette = ["#6366f1", "#7c3aed", "#0ea5e9", "#22c55e", "#f59e0b", "#ef4444"];

function normalizePoints(data: ChartDatum[], width = 320, height = 120) {
  const max = Math.max(...data.map((item) => item.value), 1);
  const step = data.length > 1 ? width / (data.length - 1) : width;
  return data.map((item, index) => {
    const x = index * step;
    const y = height - (item.value / max) * height;
    return { ...item, x, y };
  });
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
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>

      <div className="mt-5 flex items-center gap-6">
        <svg width="148" height="148" viewBox="0 0 42 42" className="-rotate-90">
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--surface-muted)" strokeWidth="6" />
          {segments.map(({ item, index, dash, currentOffset }) => (
            <circle
              key={item.label}
              cx="21"
              cy="21"
              r="15.915"
              fill="transparent"
              stroke={palette[index % palette.length]}
              strokeWidth="6"
              strokeDasharray={`${dash} ${100 - dash}`}
              strokeDashoffset={currentOffset}
            />
          ))}
        </svg>

        <div className="min-w-0 flex-1 space-y-3">
          {data.map((item, index) => (
            <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 text-[var(--muted)]">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: palette[index % palette.length] }} />
                {item.label}
              </span>
              <span className="font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ColumnChart({ title, description, data }: ChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>

      <div className="mt-6 flex h-44 items-end gap-3">
        {data.map((item) => (
          <div key={item.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div className="flex h-32 w-full items-end rounded-xl bg-[var(--surface)] px-2 py-2">
              <div
                className="w-full rounded-lg bg-[image:var(--accent-active)]"
                style={{ height: `${Math.max((item.value / max) * 100, 8)}%` }}
              />
            </div>
            <span className="truncate text-xs text-[var(--muted)]">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LineChart({ title, description, data }: ChartProps) {
  const points = normalizePoints(data);
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>

      <svg viewBox="0 0 320 150" className="mt-6 h-44 w-full overflow-visible">
        <line x1="0" y1="122" x2="320" y2="122" stroke="var(--border)" />
        <polyline points={line} fill="none" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="5" fill="#6366f1" />
            <text x={point.x} y="145" textAnchor="middle" className="fill-[var(--muted)] text-[10px]">
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </section>
  );
}

export function AreaChart({ title, description, data }: ChartProps) {
  const points = normalizePoints(data);
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `0,120 ${line} 320,120`;

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>

      <svg viewBox="0 0 320 150" className="mt-6 h-44 w-full overflow-visible">
        <polygon points={area} fill="rgba(99,102,241,0.22)" />
        <polyline points={line} fill="none" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <text key={point.label} x={point.x} y="145" textAnchor="middle" className="fill-[var(--muted)] text-[10px]">
            {point.label}
          </text>
        ))}
      </svg>
    </section>
  );
}
