"use client";

import { SelectMenu } from "@/components/ui/select-menu";

type RowsPerPageSelectProps = {
  value: number;
  onChange: (value: number) => void;
  options?: number[];
};

const defaultOptions = [10, 20, 30, 40, 50];

export function RowsPerPageSelect({ value, onChange, options = defaultOptions }: RowsPerPageSelectProps) {
  return (
    <SelectMenu
      value={String(value)}
      onChange={(nextValue) => onChange(Number(nextValue))}
      options={options.map((option) => ({ value: String(option), label: String(option) }))}
      className="min-w-20"
      panelClassName="bottom-[calc(100%+8px)] left-auto right-0 top-auto z-[90]"
    />
  );
}
