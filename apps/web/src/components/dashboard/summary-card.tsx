type SummaryCardProps = {
  title: string;
  value: string;
  description: string;
};

export function SummaryCard({ title, value, description }: SummaryCardProps) {
  return (
    <article className="liquid-surface rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <p className="text-sm font-medium text-[var(--muted)]">{title}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-sm text-[var(--muted)]">{description}</p>
    </article>
  );
}
