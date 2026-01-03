"use client";

import { useMemo } from "react";
import { useSortable, SortableContext } from "@dnd-kit/sortable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import type { ClassDisplay, ClassDragData } from "@/data/types";
import { DriverCard } from "./DriverCard";

type ClassCardProps = {
  classData: ClassDisplay;
  categoryId: string;
  heatNum: number;
  isOverlay?: boolean;
};

export function ClassCard({
  classData,
  categoryId,
  heatNum,
  isOverlay,
}: ClassCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `class-${classData.classId}-heat-${heatNum}`,
    data: {
      type: "Class",
      classId: classData.classId,
      className: classData.className,
      categoryId,
      heatNum,
    } satisfies ClassDragData,
    attributes: {
      roleDescription: `Class: ${classData.className}`,
    },
  });

  const style = {
    transition,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 ring-amber-500 opacity-50 scale-[1.02] transition-all duration-200",
        overlay: "ring-2 ring-amber-500 shadow-lg scale-[1.02]",
      },
    },
  });

  const driverIds = useMemo(
    () => classData.drivers.map((d) => d.id),
    [classData.drivers]
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`${variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })} transition-all duration-200 bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50`}
    >
      <CardHeader className="p-2 pb-1 flex flex-row items-center gap-2">
        <Button
          variant="ghost"
          {...attributes}
          {...listeners}
          className="p-1 text-muted-foreground h-auto cursor-grab hover:text-foreground transition-colors shrink-0"
        >
          <span className="sr-only">Move class</span>
          <GripVertical className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="font-semibold text-sm text-amber-800 dark:text-amber-200">
            {classData.className}
          </span>
          <Badge
            variant="outline"
            className="text-xs bg-amber-100 dark:bg-amber-900/50 border-amber-300 dark:border-amber-700"
          >
            {classData.driverCount}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        <SortableContext items={driverIds}>
          <div className="flex flex-col gap-1.5 ml-4">
            {classData.drivers.map((driver) => (
              <DriverCard key={driver.id} driver={driver} />
            ))}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  );
}

