// components/ThemeToggle.tsx
"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      aria-label="Toggle theme"
      className="p-2 rounded bg-muted hover:bg-muted/80"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
