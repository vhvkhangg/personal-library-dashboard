const updates = [
  { title: "No recent updates yet", meta: "Items will appear here after data is connected." },
  { title: "Fiction module", meta: "Planned after tags and auth." },
  { title: "Image viewer", meta: "Next early MVP module." }
];

export function RecentUpdates() {
  return (
    <section className="liquid-surface rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <h2 className="text-lg font-semibold">Recent Updates</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">Latest changed items.</p>

      <div className="mt-5 space-y-4">
        {updates.map((item) => (
          <div key={item.title} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
            <p className="text-sm font-medium">{item.title}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{item.meta}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
