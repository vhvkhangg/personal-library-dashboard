const tags = ["favorite", "to-review", "fiction", "media", "ideaverse"];

export function TopTags() {
  return (
    <section className="liquid-surface rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <h2 className="text-lg font-semibold">Top Tags</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">Most used tags after tag data exists.</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)]"
          >
            #{tag}
          </span>
        ))}
      </div>
    </section>
  );
}
