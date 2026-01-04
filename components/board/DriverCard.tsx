"use client";

import { memo, useCallback } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import type { Driver, DriverDragData, WorkAssignmentId } from "@/data/types";
import { SelectAssignment } from "./SelectAssignment";
import type { UniqueIdentifier } from "@dnd-kit/core";

type DriverCardProps = {
  driver: Driver;
  isOverlay?: boolean;
  onAssignmentChange?: (
    driverId: UniqueIdentifier,
    assignment: WorkAssignmentId
  ) => void;
};

const variants = cva("", {
  variants: {
    dragging: {
      over: "ring-2 ring-primary opacity-50 scale-105",
      overlay: "ring-2 ring-primary shadow-lg scale-105",
    },
  },
});

export const DriverCard = memo(function DriverCard({
  driver,
  isOverlay,
  onAssignmentChange,
}: DriverCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: driver.id,
    data: {
      type: "Driver",
      driver,
    } satisfies DriverDragData,
    attributes: {
      roleDescription: `Driver: ${driver.driverName}`,
    },
  });

  const style = {
    transition,
    transform: transform ? `translate3d(0, ${transform.y}px, 0)` : undefined,
  };

  const handleAssignmentChange = useCallback(
    (value: WorkAssignmentId) => {
      onAssignmentChange?.(driver.id, value);
    },
    [driver.id, onAssignmentChange]
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`${variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })} hover:shadow-md bg-card`}
    >
      <CardContent className="p-3 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            {...attributes}
            {...listeners}
            className="p-1 text-muted-foreground -ml-1 h-auto cursor-grab hover:text-foreground shrink-0"
          >
            <span className="sr-only">Move driver</span>
            <GripVertical className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded text-sm shrink-0">
              #{driver.carNumber}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm truncate">{driver.driverName}</p>
              <p className="text-xs text-muted-foreground truncate">
                {driver.carName}
              </p>
            </div>
          </div>
        </div>
        {!isOverlay && onAssignmentChange && (
          <div className="ml-6">
            <SelectAssignment
              value={driver.workAssignment}
              onValueChange={handleAssignmentChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
});
