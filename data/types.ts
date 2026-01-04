import type { UniqueIdentifier } from "@dnd-kit/core";

// ============================================
// Work Assignments
// ============================================

export const WORK_ASSIGNMENTS = [
  { id: "course-worker", label: "Course Worker" },
  { id: "timer", label: "Timer" },
  { id: "grid", label: "Grid" },
  { id: "announcer", label: "Announcer" },
  { id: "start-line", label: "Start Line" },
  { id: "tech-inspection", label: "Tech Inspection" },
  { id: "registration", label: "Registration" },
  { id: "none", label: "No Assignment" },
] as const;

export type WorkAssignmentId = (typeof WORK_ASSIGNMENTS)[number]["id"];

// ============================================
// Core Domain Types
// ============================================

export type Driver = {
  id: UniqueIdentifier;
  carNumber: number;
  driverName: string;
  carName: string;
  carClass: string;
  assignedHeat: number;
  workAssignment: WorkAssignmentId;
};

export type CarClass = {
  id: string;
  name: string;
  categoryId: string;
};

export type Category = {
  id: string;
  name: string;
};

// ============================================
// Computed Display Types (derived from drivers)
// ============================================

export type HeatDisplay = {
  heatNum: number;
  totalDriverCount: number;
  categories: CategoryDisplay[];
};

export type CategoryDisplay = {
  categoryId: string;
  categoryName: string;
  totalDriverCount: number;
  classes: ClassDisplay[];
};

export type ClassDisplay = {
  classId: string;
  className: string;
  driverCount: number;
  drivers: Driver[];
};

// ============================================
// Drag Data Types for dnd-kit
// ============================================

export type DragType = "Category" | "Class" | "Driver";

export type CategoryDragData = {
  type: "Category";
  categoryId: string;
  categoryName: string;
  heatNum: number;
};

export type ClassDragData = {
  type: "Class";
  classId: string;
  className: string;
  categoryId: string;
  heatNum: number;
};

export type DriverDragData = {
  type: "Driver";
  driver: Driver;
};

export type DragData = CategoryDragData | ClassDragData | DriverDragData;

// ============================================
// Heat Drop Target Data
// ============================================

export type HeatDropData = {
  type: "Heat";
  heatNum: number;
};

