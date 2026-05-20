"use client";

import type { Route } from "next";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, KeyRound, LockKeyhole, ShieldCheck, User } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";

const DEFAULT_NEXT_PATH = "/dashboard" satisfies Route;

function getSafeNextPath(next: string | null): Route {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return DEFAULT_NEXT_PATH;
  }

  return next as Route;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, status } = useAuth();
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const nextPath = getSafeNextPath(searchParams.get("next"));

  React.useEffect(() => {
    if (status === "authenticated") {
      router.replace(nextPath);
    }
  }, [nextPath, router, status]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login({ identifier, password });
      router.replace(nextPath);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Login failed. Check your credentials and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const disabled = submitting || status === "loading";

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
            Phase 2.3 connects this screen to the Spring Boot Auth API with httpOnly cookies.
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

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-[var(--muted)]">Username / Email / Phone</span>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
                  <input
                    type="text"
                    autoComplete="username"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    placeholder="owner, owner@example.local, or +84..."
                    className="focus-ring h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] pl-11 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
                    disabled={disabled}
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
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="focus-ring h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] pl-11 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
                    disabled={disabled}
                  />
                </div>
              </label>

              {error ? (
                <div className="rounded-2xl border border-rose-500/45 bg-rose-500/10 px-4 py-3 text-sm leading-6 text-rose-200">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                className="focus-ring inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--accent-active)] px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-950/25 transition hover:opacity-95 disabled:pointer-events-none disabled:opacity-60"
                disabled={disabled}
              >
                <ShieldCheck className="h-4 w-4" />
                {submitting ? "Signing in..." : "Sign in"}
              </button>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-xs leading-6 text-[var(--muted)]">
                Use the configured seed credentials. Keep the seed password in environment variables, not in frontend source.
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
