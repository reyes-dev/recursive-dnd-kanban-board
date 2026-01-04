"use client";

import { useCallback, useRef, useEffect } from "react";
import { WORK_ASSIGNMENTS, type WorkAssignmentId } from "@/data/types";
import { cn } from "@/lib/utils";

type SelectAssignmentProps = {
  value: WorkAssignmentId;
  onValueChange: (value: WorkAssignmentId) => void;
};

export function SelectAssignment({
  value,
  onValueChange,
}: SelectAssignmentProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Use capture phase to intercept pointer events before dnd-kit
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const stopEvent = (e: Event) => {
      e.stopPropagation();
    };

    // Add listeners in capture phase to intercept before dnd-kit
    wrapper.addEventListener("pointerdown", stopEvent, true);
    wrapper.addEventListener("pointermove", stopEvent, true);
    wrapper.addEventListener("pointerup", stopEvent, true);
    wrapper.addEventListener("mousedown", stopEvent, true);
    wrapper.addEventListener("touchstart", stopEvent, true);

    return () => {
      wrapper.removeEventListener("pointerdown", stopEvent, true);
      wrapper.removeEventListener("pointermove", stopEvent, true);
      wrapper.removeEventListener("pointerup", stopEvent, true);
      wrapper.removeEventListener("mousedown", stopEvent, true);
      wrapper.removeEventListener("touchstart", stopEvent, true);
    };
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onValueChange(e.target.value as WorkAssignmentId);
    },
    [onValueChange]
  );

  return (
    <div ref={wrapperRef} data-no-dnd="true">
      <select
        value={value}
        onChange={handleChange}
        className={cn(
          "h-7 w-full text-xs px-2 py-1",
          "rounded-md border border-muted-foreground/20",
          "bg-background text-foreground",
          "focus:outline-none focus:ring-1 focus:ring-primary/50",
          "cursor-pointer"
        )}
      >
        {WORK_ASSIGNMENTS.map((assignment) => (
          <option
            key={assignment.id}
            value={assignment.id}
            className="bg-background text-foreground"
          >
            {assignment.label}
          </option>
        ))}
      </select>
    </div>
  );
}
