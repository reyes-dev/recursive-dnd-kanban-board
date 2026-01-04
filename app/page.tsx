"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { HeatsBoard } from "@/components/board/HeatsBoard";
import Header from "@/components/shared/Header";
import { WorkAssignmentsTable } from "@/components/board/WorkAssignmentsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Driver } from "@/data/types";
import { initialDrivers } from "@/data/heatsData";

export default function App() {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the tab from query params, default to "heats"
  const tabParam = searchParams.get("tab");
  const defaultTab =
    tabParam === "work-assignments" ? "work-assignments" : "heats";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update URL without page reload
    router.push(`?tab=${value}`, { scroll: false });
  };

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

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="flex-1 flex flex-col px-4"
        >
          <TabsList className="self-center">
            <TabsTrigger value="heats">Heats</TabsTrigger>
            <TabsTrigger value="work-assignments">Work Assignments</TabsTrigger>
          </TabsList>
          <TabsContent value="heats" className="flex-1 overflow-hidden">
            <HeatsBoard drivers={drivers} setDrivers={setDrivers} />
          </TabsContent>
          <TabsContent
            value="work-assignments"
            className="flex-1 overflow-auto"
          >
            <WorkAssignmentsTable drivers={drivers} setDrivers={setDrivers} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
