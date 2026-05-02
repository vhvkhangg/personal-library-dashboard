const storageRows = [
  { label: "Local media", value: "0 GB" },
  { label: "Google Drive tracked", value: "0 GB" },
  { label: "Documents", value: "0 files" },
  { label: "Obsidian notes", value: "Not indexed" }
];

export function StorageOverview() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
      <h2 className="text-lg font-semibold">Storage Overview</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">Local and cloud-tracked storage.</p>

      <dl className="mt-5 space-y-3">
        {storageRows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4">
            <dt className="text-sm text-[var(--muted)]">{row.label}</dt>
            <dd className="text-sm font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
