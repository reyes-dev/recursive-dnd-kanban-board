"use client";

import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Driver, WorkAssignmentId } from "@/data/types";
import {
  workAssignmentsDetails,
  carClasses,
  categories,
  NUM_HEATS,
} from "@/data/heatsData";
import { AddAssignmentModal } from "./AddAssignmentModal";

// ============================================
// Props Interface
// ============================================

interface WorkAssignmentsTableProps {
  drivers: Driver[];
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
}

// ============================================
// Computed Display Type
// ============================================

interface WorkAssignmentDisplay {
  id: WorkAssignmentId;
  name: string;
  min: number;
  max: number;
  totalAssigned: number;
  drivers: Driver[];
}

// ============================================
// Helper to get class name
// ============================================

function getClassName(classId: string): string {
  const carClass = carClasses.find((c) => c.id === classId);
  return carClass?.name || classId.toUpperCase();
}

// ============================================
// Helper to get category name for a driver
// ============================================

function getCategoryName(classId: string): string {
  const carClass = carClasses.find((c) => c.id === classId);
  if (!carClass) return "";
  const category = categories.find((cat) => cat.id === carClass.categoryId);
  return category?.name || "";
}

// ============================================
// Main Component
// ============================================

export function WorkAssignmentsTable({
  drivers,
  setDrivers,
}: WorkAssignmentsTableProps) {
  const [selectedHeat, setSelectedHeat] = useState<number>(1);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generate heat numbers array
  const heatNumbers = useMemo(() => {
    return Array.from({ length: NUM_HEATS }, (_, i) => i + 1);
  }, []);

  // Filter drivers by selected heat
  const heatDrivers = useMemo(() => {
    return drivers.filter((d) => d.assignedHeat === selectedHeat);
  }, [drivers, selectedHeat]);

  // Compute work assignment data from drivers in the selected heat
  const workAssignmentData = useMemo<WorkAssignmentDisplay[]>(() => {
    return workAssignmentsDetails.map((assignment) => {
      const assignedDrivers = heatDrivers.filter(
        (d) => d.workAssignment === assignment.id
      );
      return {
        id: assignment.id,
        name: assignment.name,
        min: assignment.min,
        max: assignment.max,
        totalAssigned: assignedDrivers.length,
        drivers: assignedDrivers,
      };
    });
  }, [heatDrivers]);

  const toggleRow = (assignmentId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(assignmentId)) {
        newSet.delete(assignmentId);
      } else {
        newSet.add(assignmentId);
      }
      return newSet;
    });
  };

  const handleAssignDriver = (
    driverId: string,
    assignment: WorkAssignmentId
  ) => {
    setDrivers((prev) =>
      prev.map((driver) =>
        String(driver.id) === driverId
          ? { ...driver, workAssignment: assignment }
          : driver
      )
    );
  };

  // Helper to get status badge
  const getStatusBadge = (assigned: number, min: number, max: number) => {
    if (assigned < min) {
      return (
        <Badge variant="destructive" className="text-xs">
          Understaffed
        </Badge>
      );
    }
    if (assigned > max) {
      return (
        <Badge
          variant="secondary"
          className="text-xs bg-amber-500/20 text-amber-600"
        >
          Overstaffed
        </Badge>
      );
    }
    return (
      <Badge
        variant="secondary"
        className="text-xs bg-emerald-500/20 text-emerald-600"
      >
        Good
      </Badge>
    );
  };

  // Get total drivers in selected heat
  const totalHeatDrivers = heatDrivers.length;

  return (
    <div className="space-y-4">
      {/* Heat Selector Tabs */}
      <Tabs
        value={String(selectedHeat)}
        onValueChange={(value) => {
          setSelectedHeat(Number(value));
          setExpandedRows(new Set()); // Reset expanded rows when switching heats
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Work Assignments</h2>
            <TabsList>
              {heatNumbers.map((heatNum) => (
                <TabsTrigger key={heatNum} value={String(heatNum)}>
                  Heat {heatNum}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <Button onClick={() => setIsModalOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Assignment
          </Button>
        </div>
      </Tabs>

      {/* Heat Stats */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="outline" className="font-normal">
          Heat {selectedHeat}
        </Badge>
        <span>{totalHeatDrivers} drivers total</span>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Work Assignment</TableHead>
              <TableHead className="text-center">Total Assigned</TableHead>
              <TableHead className="text-center">Min. Required</TableHead>
              <TableHead className="text-center">Max. Needed</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workAssignmentData.map((assignment) => {
              const isExpanded = expandedRows.has(assignment.id);
              const hasDrivers = assignment.drivers.length > 0;

              return (
                <React.Fragment key={assignment.id}>
                  {/* Main Row */}
                  <TableRow
                    className={`cursor-pointer ${hasDrivers ? "hover:bg-muted/50" : ""}`}
                    onClick={() => hasDrivers && toggleRow(assignment.id)}
                  >
                    <TableCell className="w-[40px]">
                      {hasDrivers ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(assignment.id);
                          }}
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      ) : (
                        <div className="h-6 w-6" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {assignment.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {assignment.totalAssigned}
                    </TableCell>
                    <TableCell className="text-center">
                      {assignment.min}
                    </TableCell>
                    <TableCell className="text-center">
                      {assignment.max}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(
                        assignment.totalAssigned,
                        assignment.min,
                        assignment.max
                      )}
                    </TableCell>
                  </TableRow>

                  {/* Expanded Sub-rows */}
                  {isExpanded &&
                    assignment.drivers.map((driver) => (
                      <TableRow
                        key={String(driver.id)}
                        className="bg-muted/20"
                      >
                        <TableCell></TableCell>
                        <TableCell colSpan={5}>
                          <div className="flex items-center gap-4 pl-4">
                            <span className="font-mono text-sm bg-muted px-2 py-0.5 rounded">
                              #{driver.carNumber}
                            </span>
                            <span className="font-medium">
                              {driver.driverName}
                            </span>
                            <span className="text-muted-foreground">
                              {driver.carName}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {getClassName(driver.carClass)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {getCategoryName(driver.carClass)}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <AddAssignmentModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        drivers={heatDrivers}
        selectedHeat={selectedHeat}
        onAssign={handleAssignDriver}
      />
    </div>
  );
}
