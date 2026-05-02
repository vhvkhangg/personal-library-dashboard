"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/theme-provider";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={toggleTheme}
      suppressHydrationWarning
    >
      <span className="theme-toggle-icon theme-toggle-icon-light" aria-hidden="true">
        <Sun className="h-4 w-4" />
      </span>
      <span className="theme-toggle-icon theme-toggle-icon-dark" aria-hidden="true">
        <Moon className="h-4 w-4" />
      </span>
    </Button>
  );
}
