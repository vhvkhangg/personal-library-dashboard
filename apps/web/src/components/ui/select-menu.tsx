"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectMenuProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  panelClassName?: string;
};

export function SelectMenu({ value, onChange, options, placeholder = "Select", className, panelClassName }: SelectMenuProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const selected = options.find((option) => option.value === value);

  React.useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="focus-ring flex h-10 w-full items-center justify-between gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-left text-sm text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]"
      >
        <span>{selected?.label ?? placeholder}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {open ? (
        <div className={cn("absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-1 shadow-xl shadow-black/20", panelClassName)} role="listbox">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-[var(--foreground)] transition hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]",
                  isSelected && "bg-[image:var(--accent-active)] text-white"
                )}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {isSelected ? <Check className="h-4 w-4" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
