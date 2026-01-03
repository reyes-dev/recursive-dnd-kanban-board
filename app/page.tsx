"use client";

import { HeatsBoard } from "@/components/board/HeatsBoard";
import React from "react";
import Header from "@/components/shared/Header";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col gap-4 flex-1 overflow-hidden">
        <div className="text-center pt-4">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
            Autocross Heats Organization
          </h1>
          <p className="text-muted-foreground mt-1">
            Drag categories, classes, or individual drivers between heats
          </p>
        </div>
        <HeatsBoard />
      </main>
    </div>
  );
}
