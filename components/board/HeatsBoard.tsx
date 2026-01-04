"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
  useSensor,
  useSensors,
  KeyboardSensor,
  TouchSensor,
  MouseSensor,
  Active,
  Over,
  DataRef,
  pointerWithin,
  rectIntersection,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { coordinateGetter } from "./multipleContainersKeyboardPreset";

import type {
  Driver,
  CarClass,
  Category,
  HeatDisplay,
  CategoryDisplay,
  ClassDisplay,
  DragData,
  CategoryDragData,
  ClassDragData,
  DriverDragData,
  HeatDropData,
  WorkAssignmentId,
} from "@/data/types";
import {
  initialDrivers,
  carClasses,
  categories,
  NUM_HEATS,
  getClassById,
  getCategoryById,
} from "@/data/heatsData";

import { HeatColumn, HeatsContainer } from "./HeatColumn";
import { CategoryCard } from "./CategoryCard";
import { ClassCard } from "./ClassCard";
import { DriverCard } from "./DriverCard";

// ============================================
// Type guards for drag data
// ============================================

const hasDraggableData = <T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<DragData | HeatDropData>;
} => {
  if (!entry) return false;
  const data = entry.data.current;
  if (
    data?.type === "Category" ||
    data?.type === "Class" ||
    data?.type === "Driver" ||
    data?.type === "Heat"
  ) {
    return true;
  }
  return false;
};

// ============================================
// Compute heat display from drivers
// ============================================

function computeHeatsFromDrivers(
  drivers: Driver[],
  classes: CarClass[],
  cats: Category[],
  numHeats: number
): HeatDisplay[] {
  const heats: HeatDisplay[] = [];

  for (let i = 1; i <= numHeats; i++) {
    const heatDrivers = drivers.filter((d) => d.assignedHeat === i);

    // Group drivers by class
    const driversByClass = new Map<string, Driver[]>();
    heatDrivers.forEach((driver) => {
      const existing = driversByClass.get(driver.carClass) || [];
      existing.push(driver);
      driversByClass.set(driver.carClass, existing);
    });

    // Group classes by category
    const categoriesMap = new Map<string, ClassDisplay[]>();
    driversByClass.forEach((classDrivers, classId) => {
      const carClass = classes.find((c) => c.id === classId);
      if (!carClass) return;

      const categoryId = carClass.categoryId;
      const existing = categoriesMap.get(categoryId) || [];
      existing.push({
        classId: carClass.id,
        className: carClass.name,
        driverCount: classDrivers.length,
        drivers: classDrivers,
      });
      categoriesMap.set(categoryId, existing);
    });

    // Build category displays
    const categoryDisplays: CategoryDisplay[] = [];
    categoriesMap.forEach((classDisplays, categoryId) => {
      const category = cats.find((c) => c.id === categoryId);
      if (!category) return;

      const totalDrivers = classDisplays.reduce(
        (sum, c) => sum + c.driverCount,
        0
      );
      categoryDisplays.push({
        categoryId: category.id,
        categoryName: category.name,
        totalDriverCount: totalDrivers,
        classes: classDisplays,
      });
    });

    heats.push({
      heatNum: i,
      totalDriverCount: heatDrivers.length,
      categories: categoryDisplays,
    });
  }

  return heats;
}

// ============================================
// Main HeatsBoard Component
// ============================================

export function HeatsBoard() {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [activeCategory, setActiveCategory] = useState<CategoryDragData | null>(
    null
  );
  const [activeClass, setActiveClass] = useState<ClassDragData | null>(null);
  const [activeDriver, setActiveDriver] = useState<Driver | null>(null);

  const dndContextId = useId();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    })
  );

  // Compute the heat displays from driver data
  const heatsData = useMemo(
    () => computeHeatsFromDrivers(drivers, carClasses, categories, NUM_HEATS),
    [drivers]
  );

  // Get all sortable IDs for SortableContext
  const allSortableIds = useMemo(() => {
    const ids: string[] = [];
    heatsData.forEach((heat) => {
      heat.categories.forEach((cat) => {
        ids.push(`category-${cat.categoryId}-heat-${heat.heatNum}`);
        cat.classes.forEach((cls) => {
          ids.push(`class-${cls.classId}-heat-${heat.heatNum}`);
        });
      });
    });
    drivers.forEach((d) => ids.push(String(d.id)));
    return ids;
  }, [heatsData, drivers]);

  // Extract the target heat number from a drag event
  const getTargetHeatNum = useCallback(
    (over: Over | null): number | null => {
      if (!over) return null;

      const overId = String(over.id);

      // Direct heat drop zone
      if (overId.startsWith("heat-")) {
        return parseInt(overId.replace("heat-", ""), 10);
      }

      // Check if dropped on a category
      if (overId.startsWith("category-")) {
        const match = overId.match(/heat-(\d+)/);
        if (match) return parseInt(match[1], 10);
      }

      // Check if dropped on a class
      if (overId.startsWith("class-")) {
        const match = overId.match(/heat-(\d+)/);
        if (match) return parseInt(match[1], 10);
      }

      // Check if dropped on a driver - find their heat
      const driver = drivers.find((d) => String(d.id) === overId);
      if (driver) {
        return driver.assignedHeat;
      }

      // Check data for Heat type
      if (hasDraggableData(over) && over.data.current?.type === "Heat") {
        return (over.data.current as HeatDropData).heatNum;
      }

      return null;
    },
    [drivers]
  );

  // ============================================
  // Drag Handlers
  // ============================================

  const onDragStart = (event: DragStartEvent) => {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;

    if (data?.type === "Category") {
      setActiveCategory(data as CategoryDragData);
    } else if (data?.type === "Class") {
      setActiveClass(data as ClassDragData);
    } else if (data?.type === "Driver") {
      setActiveDriver((data as DriverDragData).driver);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Reset active states
    setActiveCategory(null);
    setActiveClass(null);
    setActiveDriver(null);

    if (!over || !hasDraggableData(active)) return;

    const activeData = active.data.current;
    const targetHeatNum = getTargetHeatNum(over);

    if (targetHeatNum === null) return;

    // Handle Category drag
    if (activeData?.type === "Category") {
      const categoryData = activeData as CategoryDragData;
      if (categoryData.heatNum === targetHeatNum) return; // Same heat, no change

      // Move all drivers in this category to the new heat
      setDrivers((prev) =>
        prev.map((driver) => {
          const driverClass = getClassById(driver.carClass);
          if (driverClass?.categoryId === categoryData.categoryId) {
            // Only move drivers that are currently in the source heat
            if (driver.assignedHeat === categoryData.heatNum) {
              return { ...driver, assignedHeat: targetHeatNum };
            }
          }
          return driver;
        })
      );
    }

    // Handle Class drag
    else if (activeData?.type === "Class") {
      const classData = activeData as ClassDragData;
      if (classData.heatNum === targetHeatNum) return; // Same heat, no change

      // Move all drivers in this class to the new heat
      setDrivers((prev) =>
        prev.map((driver) => {
          if (driver.carClass === classData.classId) {
            // Only move drivers that are currently in the source heat
            if (driver.assignedHeat === classData.heatNum) {
              return { ...driver, assignedHeat: targetHeatNum };
            }
          }
          return driver;
        })
      );
    }

    // Handle Driver drag
    else if (activeData?.type === "Driver") {
      const driverData = activeData as DriverDragData;
      if (driverData.driver.assignedHeat === targetHeatNum) return; // Same heat

      // Move single driver to new heat
      setDrivers((prev) =>
        prev.map((driver) =>
          driver.id === driverData.driver.id
            ? { ...driver, assignedHeat: targetHeatNum }
            : driver
        )
      );
    }
  };

  // Custom collision detection that prioritizes heat columns
  const collisionDetection = useCallback(
    (args: Parameters<typeof pointerWithin>[0]) => {
      // First try pointer-based detection
      const pointerCollisions = pointerWithin(args);
      if (pointerCollisions.length > 0) {
        return pointerCollisions;
      }
      // Fall back to rectangle intersection
      return rectIntersection(args);
    },
    []
  );

  // ============================================
  // Work Assignment Handler
  // ============================================

  const onAssignmentChange = useCallback(
    (driverId: UniqueIdentifier, assignment: WorkAssignmentId) => {
      setDrivers((prev) =>
        prev.map((driver) =>
          driver.id === driverId
            ? { ...driver, workAssignment: assignment }
            : driver
        )
      );
    },
    []
  );

  // ============================================
  // Render overlay components for drag preview
  // ============================================

  const renderDragOverlay = () => {
    if (activeCategory) {
      // Find the category display data
      const heat = heatsData.find((h) => h.heatNum === activeCategory.heatNum);
      const categoryData = heat?.categories.find(
        (c) => c.categoryId === activeCategory.categoryId
      );
      if (categoryData) {
        return (
          <CategoryCard
            categoryData={categoryData}
            heatNum={activeCategory.heatNum}
            isOverlay
          />
        );
      }
    }

    if (activeClass) {
      // Find the class display data
      const heat = heatsData.find((h) => h.heatNum === activeClass.heatNum);
      const categoryData = heat?.categories.find(
        (c) => c.categoryId === activeClass.categoryId
      );
      const classData = categoryData?.classes.find(
        (c) => c.classId === activeClass.classId
      );
      if (classData) {
        return (
          <ClassCard
            classData={classData}
            categoryId={activeClass.categoryId}
            heatNum={activeClass.heatNum}
            isOverlay
          />
        );
      }
    }

    if (activeDriver) {
      return <DriverCard driver={activeDriver} isOverlay />;
    }

    return null;
  };

  // ============================================
  // Main Render
  // ============================================

  return (
    <DndContext
      id={dndContextId}
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <HeatsContainer>
        <SortableContext items={allSortableIds}>
          {heatsData.map((heat) => (
            <HeatColumn
              key={heat.heatNum}
              heatData={heat}
              onAssignmentChange={onAssignmentChange}
            />
          ))}
        </SortableContext>
      </HeatsContainer>

      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay dropAnimation={null}>{renderDragOverlay()}</DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}
