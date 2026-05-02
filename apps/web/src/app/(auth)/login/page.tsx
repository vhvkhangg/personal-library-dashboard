import { BookOpen, LockKeyhole, ShieldCheck, User, KeyRound } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-10 text-[var(--foreground)]">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/30 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden bg-[image:linear-gradient(135deg,#2563eb_0%,#7c3aed_100%)] p-8 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <BookOpen className="h-7 w-7" />
            </div>
            <h1 className="mt-8 text-4xl font-semibold tracking-tight">Personal Library Dashboard</h1>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/78">
              Private single-user access for your modular library, Ideaverse vault, media previews, and local RAG workspace.
            </p>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/10 p-4 text-sm leading-6 text-white/80 backdrop-blur">
            Offline-first UI shell. Future phases can connect this login screen to JWT, PIN unlock, and local-only access rules.
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mx-auto max-w-md">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)]">
              <LockKeyhole className="h-6 w-6" />
            </div>
            <p className="mt-8 text-sm font-medium text-[var(--muted)]">Private access</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Sign in</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Use username, email, or phone number with your password.
            </p>

            <form className="mt-8 space-y-5">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-[var(--muted)]">Username / Email / Phone</span>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
                  <input
                    type="text"
                    autoComplete="username"
                    placeholder="khang, khang@email.com, or +84..."
                    className="focus-ring h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] pl-11 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
                  />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-[var(--muted)]">Password</span>
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
                  <input
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="focus-ring h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] pl-11 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
                  />
                </div>
              </label>

              <button
                type="button"
                className="focus-ring inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--accent-active)] px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-950/25 transition hover:opacity-95"
              >
                <ShieldCheck className="h-4 w-4" />
                Sign in
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
