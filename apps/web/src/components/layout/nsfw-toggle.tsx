"use client";

import * as React from "react";
import { LockKeyhole, X } from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

function PinUnlockModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [pin, setPin] = React.useState("");

  React.useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[260] grid h-dvh w-dvw place-items-center bg-slate-950/80 p-4 backdrop-blur-md" onClick={onClose}>
      <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm font-medium text-[var(--muted)]">Protected zone</p>
            <h2 className="mt-1 text-2xl font-semibold">Enter PIN</h2>
          </div>
          <button type="button" className="focus-ring rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={onClose} aria-label="Close PIN dialog">
            <X className="h-5 w-5" />
          </button>
        </div>

        <label className="mt-3 block space-y-1">
          <input
            value={pin}
            onChange={(event) => setPin(event.target.value.replace(/\D/gu, "").slice(0, 6))}
            inputMode="numeric"
            type="password"
            placeholder="••••••"
            className="focus-ring h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 text-center text-lg font-semibold tracking-[0.5em] text-[var(--foreground)] placeholder:tracking-[0.35em] placeholder:text-[var(--muted)]"
            autoFocus
          />
        </label>

        <div className="mt-4 grid grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index} className={`h-2 rounded-full ${pin.length > index ? "bg-[var(--accent)]" : "bg-[var(--surface-muted)]"}`} />
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Unlock</Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function NsfwToggle() {
  const [pinOpen, setPinOpen] = React.useState(false);

  return (
    <>
      <Button variant="outline" size="icon" aria-label="Open protected PIN dialog" title="Protected mode" onClick={() => setPinOpen(true)}>
        H
      </Button>
      <PinUnlockModal open={pinOpen} onClose={() => setPinOpen(false)} />
    </>
  );
}
