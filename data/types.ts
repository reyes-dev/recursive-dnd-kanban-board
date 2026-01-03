import type { UniqueIdentifier } from "@dnd-kit/core";

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

