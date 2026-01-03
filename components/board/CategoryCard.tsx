"use client";

import { useMemo } from "react";
import { useSortable, SortableContext } from "@dnd-kit/sortable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import type { CategoryDisplay, CategoryDragData } from "@/data/types";
import { ClassCard } from "./ClassCard";

type CategoryCardProps = {
  categoryData: CategoryDisplay;
  heatNum: number;
  isOverlay?: boolean;
};

export function CategoryCard({
  categoryData,
  heatNum,
  isOverlay,
}: CategoryCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `category-${categoryData.categoryId}-heat-${heatNum}`,
    data: {
      type: "Category",
      categoryId: categoryData.categoryId,
      categoryName: categoryData.categoryName,
      heatNum,
    } satisfies CategoryDragData,
    attributes: {
      roleDescription: `Category: ${categoryData.categoryName}`,
    },
  });

  // Only apply Y-axis transform to prevent horizontal shifting within column
  const style = {
    transition,
    transform: transform
      ? `translate3d(0, ${transform.y}px, 0)`
      : undefined,
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 ring-emerald-500 opacity-50 scale-[1.01] transition-all duration-200",
        overlay: "ring-2 ring-emerald-500 shadow-lg scale-[1.01]",
      },
    },
  });

  const classIds = useMemo(
    () =>
      categoryData.classes.map((c) => `class-${c.classId}-heat-${heatNum}`),
    [categoryData.classes, heatNum]
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`${variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })} transition-all duration-200 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50`}
    >
      <CardHeader className="p-3 pb-2 flex flex-row items-center gap-2 border-b border-emerald-200 dark:border-emerald-800/50">
        <Button
          variant="ghost"
          {...attributes}
          {...listeners}
          className="p-1 text-muted-foreground h-auto cursor-grab hover:text-foreground transition-colors shrink-0"
        >
          <span className="sr-only">Move category</span>
          <GripVertical className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="font-bold text-sm text-emerald-800 dark:text-emerald-200 uppercase tracking-wide">
            {categoryData.categoryName}
          </span>
          <Badge
            variant="outline"
            className="text-xs bg-emerald-100 dark:bg-emerald-900/50 border-emerald-300 dark:border-emerald-700"
          >
            {categoryData.totalDriverCount} drivers
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <SortableContext items={classIds}>
          <div className="flex flex-col gap-2">
            {categoryData.classes.map((classData) => (
              <ClassCard
                key={classData.classId}
                classData={classData}
                categoryId={categoryData.categoryId}
                heatNum={heatNum}
              />
            ))}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  );
}

