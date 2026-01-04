"use client";

import { memo, useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cva } from "class-variance-authority";
import type { HeatDisplay, HeatDropData, WorkAssignmentId } from "@/data/types";
import { CategoryCard } from "./CategoryCard";
import type { UniqueIdentifier } from "@dnd-kit/core";

type HeatColumnProps = {
  heatData: HeatDisplay;
  onAssignmentChange?: (
    driverId: UniqueIdentifier,
    assignment: WorkAssignmentId
  ) => void;
};

const variants = cva(
  "h-full w-[400px] bg-primary-foreground flex flex-col shrink-0 snap-center overflow-hidden",
  {
    variants: {
      dropping: {
        default: "border-2 border-transparent",
        over: "ring-2 ring-primary border-primary/50 bg-primary/5",
      },
    },
  }
);

export const HeatColumn = memo(function HeatColumn({
  heatData,
  onAssignmentChange,
}: HeatColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `heat-${heatData.heatNum}`,
    data: {
      type: "Heat",
      heatNum: heatData.heatNum,
    } satisfies HeatDropData,
  });

  const categoryIds = useMemo(
    () =>
      heatData.categories.map(
        (c) => `category-${c.categoryId}-heat-${heatData.heatNum}`
      ),
    [heatData.categories, heatData.heatNum]
  );

  return (
    <Card
      ref={setNodeRef}
      className={variants({
        dropping: isOver ? "over" : "default",
      })}
    >
      <CardHeader className="p-4 font-semibold border-b-2 bg-slate-100 dark:bg-slate-800 flex flex-row items-center justify-between shrink-0">
        <h1 className="text-lg font-bold">Heat {heatData.heatNum}</h1>
        <Badge
          variant="secondary"
          className="text-sm px-3 py-1 bg-slate-200 dark:bg-slate-700"
        >
          {heatData.totalDriverCount} drivers
        </Badge>
      </CardHeader>
      <ScrollArea className="flex-1">
        <CardContent className="flex flex-col gap-3 p-3">
          <SortableContext items={categoryIds}>
            {heatData.categories.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-muted-foreground text-sm">
                  Drop categories, classes, or drivers here
                </p>
              </div>
            ) : (
              heatData.categories.map((categoryData) => (
                <CategoryCard
                  key={categoryData.categoryId}
                  categoryData={categoryData}
                  heatNum={heatData.heatNum}
                  onAssignmentChange={onAssignmentChange}
                />
              ))
            )}
          </SortableContext>
        </CardContent>
      </ScrollArea>
    </Card>
  );
});

// Container for all heats
export function HeatsContainer({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-4 items-start p-4 min-h-[calc(100vh-200px)] justify-center">
        {children}
      </div>
    </ScrollArea>
  );
}
