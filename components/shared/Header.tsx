"use client";

import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="flex justify-around p-4 items-center font-mono w-full">
      <div className="flex items-center justify-end gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
