"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WORK_ASSIGNMENTS, type WorkAssignmentId } from "@/data/types";

type SelectAssignmentProps = {
  value: WorkAssignmentId;
  onValueChange: (value: WorkAssignmentId) => void;
};

export function SelectAssignment({
  value,
  onValueChange,
}: SelectAssignmentProps) {
  const currentAssignment = WORK_ASSIGNMENTS.find((a) => a.id === value);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className="h-7 text-xs w-full bg-muted/50 border-muted-foreground/20 focus:ring-1 focus:ring-primary/50"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <SelectValue placeholder="Assign role">
          {currentAssignment?.label || "No Assignment"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {WORK_ASSIGNMENTS.map((assignment) => (
          <SelectItem
            key={assignment.id}
            value={assignment.id}
            className="text-xs"
          >
            {assignment.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

