import { ShieldCheck, UserRound, MapPin, Database } from "lucide-react";

const profileCards = [
  ["Owner", "VHVKhangg", UserRound],
  ["Access", "Single user", ShieldCheck],
  ["Runtime", "Windows 11 desktop", Database],
  ["Location mode", "LAN / private VPN", MapPin],
] as const;

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-medium text-[var(--muted)]">Personal</p>
        <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
          UI-only profile area for personal identity, local access preferences, and future account/security information.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {profileCards.map(([label, value, Icon]) => (
          <div key={label} className="liquid-surface rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-5 text-sm text-[var(--muted)]">{label}</p>
            <p className="mt-1 text-xl font-semibold">{value}</p>
          </div>
        ))}
      </section>

      <section className="liquid-surface rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Profile details</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-sm font-medium text-[var(--muted)]">Preferred name</p>
            <p className="mt-2 text-lg font-semibold">VHVKhangg</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-sm font-medium text-[var(--muted)]">Project role</p>
            <p className="mt-2 text-lg font-semibold">Owner / learner / developer</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-sm font-medium text-[var(--muted)]">Phase 2 auth target</p>
            <p className="mt-2 text-lg font-semibold">Single-user JWT login</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-sm font-medium text-[var(--muted)]">Privacy mode</p>
            <p className="mt-2 text-lg font-semibold">Local-first, offline RAG</p>
          </div>
        </div>
      </section>
    </div>
  );
}
