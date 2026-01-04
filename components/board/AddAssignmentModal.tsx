"use client";

import React, { useState, useMemo } from "react";
import { Check, User, Car } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Driver, WorkAssignmentId } from "@/data/types";
import { workAssignmentsDetails, carClasses } from "@/data/heatsData";

// ============================================
// Props Interface
// ============================================

interface AddAssignmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  drivers: Driver[];
  onAssign: (driverId: string, assignment: WorkAssignmentId) => void;
}

// ============================================
// Helper to get class name
// ============================================

function getClassName(classId: string): string {
  const carClass = carClasses.find((c) => c.id === classId);
  return carClass?.name || classId.toUpperCase();
}

// ============================================
// Main Component
// ============================================

export function AddAssignmentModal({
  open,
  onOpenChange,
  drivers,
  onAssign,
}: AddAssignmentModalProps) {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedAssignment, setSelectedAssignment] =
    useState<WorkAssignmentId | null>(null);

  // Filter work assignments to exclude "none"
  const availableAssignments = useMemo(() => {
    return workAssignmentsDetails.filter((a) => a.id !== "none");
  }, []);

  // Sort drivers by name for easier searching
  const sortedDrivers = useMemo(() => {
    return [...drivers].sort((a, b) =>
      a.driverName.localeCompare(b.driverName)
    );
  }, [drivers]);

  const handleSave = () => {
    if (selectedDriver && selectedAssignment) {
      onAssign(String(selectedDriver.id), selectedAssignment);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedDriver(null);
    setSelectedAssignment(null);
    onOpenChange(false);
  };

  const handleSelectDriver = (driver: Driver) => {
    setSelectedDriver(driver);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Assign Driver to Work Assignment</DialogTitle>
          <DialogDescription>
            Search for a driver and select a work assignment to assign them to.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Work Assignment Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Work Assignment</label>
            <Select
              value={selectedAssignment || ""}
              onValueChange={(value) =>
                setSelectedAssignment(value as WorkAssignmentId)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a work assignment" />
              </SelectTrigger>
              <SelectContent>
                {availableAssignments.map((assignment) => (
                  <SelectItem key={assignment.id} value={assignment.id}>
                    {assignment.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Driver Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Driver</label>
            {selectedDriver ? (
              <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm bg-primary/10 text-primary px-2 py-0.5 rounded">
                    #{selectedDriver.carNumber}
                  </span>
                  <div>
                    <p className="font-medium">{selectedDriver.driverName}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedDriver.carName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{getClassName(selectedDriver.carClass)}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDriver(null)}
                  >
                    Change
                  </Button>
                </div>
              </div>
            ) : (
              <Command className="border rounded-md">
                <CommandInput placeholder="Search drivers by name, car, or number..." />
                <CommandList>
                  <CommandEmpty>No driver found.</CommandEmpty>
                  <CommandGroup heading="Available Drivers">
                    {sortedDrivers.map((driver) => (
                      <CommandItem
                        key={String(driver.id)}
                        value={`${driver.driverName} ${driver.carNumber} ${driver.carName}`}
                        onSelect={() => handleSelectDriver(driver)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                            #{driver.carNumber}
                          </span>
                          <span className="font-medium flex-1">
                            {driver.driverName}
                          </span>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Car className="h-3 w-3" />
                            <span className="max-w-[150px] truncate">
                              {driver.carName}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {getClassName(driver.carClass)}
                          </Badge>
                          {driver.workAssignment !== "none" && (
                            <Badge variant="secondary" className="text-xs">
                              {workAssignmentsDetails.find(
                                (a) => a.id === driver.workAssignment
                              )?.name || driver.workAssignment}
                            </Badge>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            )}
          </div>

          {/* Current Assignment Info */}
          {selectedDriver && selectedDriver.workAssignment !== "none" && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
              <p className="text-sm text-amber-600 dark:text-amber-400">
                <strong>Note:</strong> {selectedDriver.driverName} is currently
                assigned to{" "}
                <strong>
                  {workAssignmentsDetails.find(
                    (a) => a.id === selectedDriver.workAssignment
                  )?.name || selectedDriver.workAssignment}
                </strong>
                . This will reassign them to the new work assignment.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedDriver || !selectedAssignment}
          >
            <Check className="h-4 w-4 mr-1" />
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

