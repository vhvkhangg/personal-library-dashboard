"use client";

import * as React from "react";
import { LockKeyhole } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (status !== "unauthenticated") return;

    const query = searchParams.toString();
    const currentPath = query ? `${pathname}?${query}` : pathname;
    const next = encodeURIComponent(currentPath);
    router.replace(`/login?next=${next}`);
  }, [pathname, router, searchParams, status]);

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 text-[var(--foreground)]">
      <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 text-center shadow-2xl shadow-black/25">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
          <LockKeyhole className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold">Checking session</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Restoring your private dashboard session. You will be redirected to login if the session is not valid.
        </p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[var(--surface)]">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[image:var(--accent-active)]" />
        </div>
      </div>
    </div>
  );
}
