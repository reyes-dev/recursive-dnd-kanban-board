import type {
  Category,
  CarClass,
  Driver,
  WorkAssignmentId,
  WorkAssignmentDetails,
} from "./types";

// Work assignment rotation for variety
const workAssignments: WorkAssignmentId[] = [
  "course-worker",
  "timer",
  "grid",
  "announcer",
  "start-line",
  "tech-inspection",
  "registration",
  "none",
];

// ============================================
// Work Assignment Details with min/max requirements
// ============================================

export const workAssignmentsDetails: WorkAssignmentDetails[] = [
  { id: "course-worker", name: "Course Worker", min: 1, max: 4 },
  { id: "timer", name: "Timer", min: 1, max: 2 },
  { id: "grid", name: "Grid", min: 1, max: 3 },
  { id: "announcer", name: "Announcer", min: 1, max: 2 },
  { id: "start-line", name: "Start Line", min: 1, max: 3 },
  { id: "tech-inspection", name: "Tech Inspection", min: 1, max: 4 },
  { id: "registration", name: "Registration", min: 1, max: 2 },
  { id: "none", name: "No Assignment", min: 0, max: 4 },
];

// ============================================
// Categories - Top level groupings
// ============================================

export const categories: Category[] = [
  { id: "street", name: "STREET" },
  { id: "super-street", name: "SUPER STREET" },
  { id: "street-touring", name: "STREET TOURING" },
  { id: "street-modified", name: "STREET MODIFIED" },
  { id: "street-prepared", name: "STREET PREPARED" },
  { id: "prepared", name: "PREPARED" },
  { id: "modified", name: "MODIFIED" },
  { id: "cam", name: "CAM" },
];

// ============================================
// Classes - Belong to categories
// ============================================

export const carClasses: CarClass[] = [
  // STREET classes
  { id: "ss", name: "SS", categoryId: "street" },
  { id: "as", name: "AS", categoryId: "street" },
  { id: "bs", name: "BS", categoryId: "street" },
  { id: "cs", name: "CS", categoryId: "street" },
  { id: "ds", name: "DS", categoryId: "street" },
  { id: "es", name: "ES", categoryId: "street" },
  { id: "fs", name: "FS", categoryId: "street" },
  { id: "gs", name: "GS", categoryId: "street" },
  { id: "hs", name: "HS", categoryId: "street" },

  // SUPER STREET classes
  { id: "ssr", name: "SSR", categoryId: "super-street" },
  { id: "ssc", name: "SSC", categoryId: "super-street" },
  { id: "ssl", name: "SSL", categoryId: "super-street" },

  // STREET TOURING classes
  { id: "str", name: "STR", categoryId: "street-touring" },
  { id: "sts", name: "STS", categoryId: "street-touring" },
  { id: "stx", name: "STX", categoryId: "street-touring" },
  { id: "stu", name: "STU", categoryId: "street-touring" },
  { id: "sth", name: "STH", categoryId: "street-touring" },

  // STREET MODIFIED classes
  { id: "sm", name: "SM", categoryId: "street-modified" },
  { id: "ssm", name: "SSM", categoryId: "street-modified" },
  { id: "sml", name: "SML", categoryId: "street-modified" },

  // STREET PREPARED classes
  { id: "ssp", name: "SSP", categoryId: "street-prepared" },
  { id: "asp", name: "ASP", categoryId: "street-prepared" },
  { id: "bsp", name: "BSP", categoryId: "street-prepared" },
  { id: "csp", name: "CSP", categoryId: "street-prepared" },
  { id: "dsp", name: "DSP", categoryId: "street-prepared" },
  { id: "esp", name: "ESP", categoryId: "street-prepared" },
  { id: "fsp", name: "FSP", categoryId: "street-prepared" },

  // PREPARED classes
  { id: "xp", name: "XP", categoryId: "prepared" },
  { id: "bp", name: "BP", categoryId: "prepared" },
  { id: "cp", name: "CP", categoryId: "prepared" },
  { id: "dp", name: "DP", categoryId: "prepared" },
  { id: "ep", name: "EP", categoryId: "prepared" },
  { id: "fp", name: "FP", categoryId: "prepared" },

  // MODIFIED classes
  { id: "am", name: "AM", categoryId: "modified" },
  { id: "bm", name: "BM", categoryId: "modified" },
  { id: "cm", name: "CM", categoryId: "modified" },
  { id: "dm", name: "DM", categoryId: "modified" },
  { id: "em", name: "EM", categoryId: "modified" },
  { id: "fm", name: "FM", categoryId: "modified" },
  { id: "km", name: "KM", categoryId: "modified" },

  // CAM classes
  { id: "cam-c", name: "CAM-C", categoryId: "cam" },
  { id: "cam-t", name: "CAM-T", categoryId: "cam" },
  { id: "cam-s", name: "CAM-S", categoryId: "cam" },
];

// ============================================
// Drivers - Initial dataset with heat assignments
// ============================================

export const initialDrivers: Driver[] = [
  // Heat 1 - STREET drivers
  {
    id: "driver-1",
    carNumber: 42,
    driverName: "Marcus Chen",
    carName: "2023 Chevrolet Corvette Z06",
    carClass: "ss",
    assignedHeat: 1,
    workAssignment: workAssignments[0],
  },
  {
    id: "driver-2",
    carNumber: 88,
    driverName: "Sarah Williams",
    carName: "2022 Porsche 911 GT3",
    carClass: "ss",
    assignedHeat: 1,
    workAssignment: workAssignments[1],
  },
  {
    id: "driver-3",
    carNumber: 7,
    driverName: "Jake Thompson",
    carName: "2024 BMW M4 Competition",
    carClass: "as",
    assignedHeat: 1,
    workAssignment: workAssignments[2],
  },
  {
    id: "driver-4",
    carNumber: 156,
    driverName: "Emily Rodriguez",
    carName: "2023 Audi RS5",
    carClass: "as",
    assignedHeat: 1,
    workAssignment: workAssignments[3],
  },
  {
    id: "driver-5",
    carNumber: 23,
    driverName: "David Park",
    carName: "2022 Ford Mustang GT",
    carClass: "bs",
    assignedHeat: 1,
    workAssignment: workAssignments[4],
  },
  {
    id: "driver-6",
    carNumber: 301,
    driverName: "Amanda Foster",
    carName: "2023 Mazda MX-5 Miata",
    carClass: "cs",
    assignedHeat: 1,
    workAssignment: workAssignments[5],
  },

  // Heat 1 - STREET TOURING drivers
  {
    id: "driver-7",
    carNumber: 14,
    driverName: "Michael Rivera",
    carName: "2021 Subaru BRZ",
    carClass: "str",
    assignedHeat: 1,
    workAssignment: workAssignments[6],
  },
  {
    id: "driver-8",
    carNumber: 77,
    driverName: "Jessica Kim",
    carName: "2022 Toyota GR86",
    carClass: "str",
    assignedHeat: 1,
    workAssignment: workAssignments[7],
  },
  {
    id: "driver-9",
    carNumber: 199,
    driverName: "Chris Martinez",
    carName: "2020 Honda Civic Si",
    carClass: "sts",
    assignedHeat: 1,
    workAssignment: workAssignments[0],
  },

  // Heat 2 - STREET drivers
  {
    id: "driver-10",
    carNumber: 55,
    driverName: "Brandon Lee",
    carName: "2023 Tesla Model 3 Performance",
    carClass: "ds",
    assignedHeat: 2,
    workAssignment: workAssignments[1],
  },
  {
    id: "driver-11",
    carNumber: 112,
    driverName: "Nicole Anderson",
    carName: "2022 Volkswagen Golf R",
    carClass: "ds",
    assignedHeat: 2,
    workAssignment: workAssignments[2],
  },
  {
    id: "driver-12",
    carNumber: 8,
    driverName: "Ryan O'Connor",
    carName: "2021 Mini Cooper S",
    carClass: "es",
    assignedHeat: 2,
    workAssignment: workAssignments[3],
  },

  // Heat 2 - SUPER STREET drivers
  {
    id: "driver-13",
    carNumber: 911,
    driverName: "Tyler Jackson",
    carName: "2022 Porsche Cayman GT4",
    carClass: "ssr",
    assignedHeat: 2,
    workAssignment: workAssignments[4],
  },
  {
    id: "driver-14",
    carNumber: 63,
    driverName: "Megan White",
    carName: "2023 Lotus Emira",
    carClass: "ssr",
    assignedHeat: 2,
    workAssignment: workAssignments[5],
  },
  {
    id: "driver-15",
    carNumber: 222,
    driverName: "Daniel Brown",
    carName: "2021 Chevrolet Corvette C8",
    carClass: "ssc",
    assignedHeat: 2,
    workAssignment: workAssignments[6],
  },

  // Heat 2 - PREPARED drivers
  {
    id: "driver-16",
    carNumber: 3,
    driverName: "Alex Turner",
    carName: "1990 Mazda Miata (Built)",
    carClass: "cp",
    assignedHeat: 2,
    workAssignment: workAssignments[7],
  },
  {
    id: "driver-17",
    carNumber: 99,
    driverName: "Stephanie Garcia",
    carName: "1995 Honda CRX (Built)",
    carClass: "dp",
    assignedHeat: 2,
    workAssignment: workAssignments[0],
  },

  // Heat 3 - STREET MODIFIED drivers
  {
    id: "driver-18",
    carNumber: 44,
    driverName: "Kevin Nguyen",
    carName: "2019 Nissan 370Z (Modified)",
    carClass: "sm",
    assignedHeat: 3,
    workAssignment: workAssignments[1],
  },
  {
    id: "driver-19",
    carNumber: 17,
    driverName: "Rachel Adams",
    carName: "2018 Ford Focus RS (Modified)",
    carClass: "sm",
    assignedHeat: 3,
    workAssignment: workAssignments[2],
  },
  {
    id: "driver-20",
    carNumber: 666,
    driverName: "Derek Stone",
    carName: "2020 Subaru WRX STI (Modified)",
    carClass: "ssm",
    assignedHeat: 3,
    workAssignment: workAssignments[3],
  },

  // Heat 3 - STREET PREPARED drivers
  {
    id: "driver-21",
    carNumber: 25,
    driverName: "Olivia Mitchell",
    carName: "2017 Mazda MX-5 (Prepared)",
    carClass: "csp",
    assignedHeat: 3,
    workAssignment: workAssignments[4],
  },
  {
    id: "driver-22",
    carNumber: 128,
    driverName: "Nathan Hill",
    carName: "2019 BMW M2 (Prepared)",
    carClass: "asp",
    assignedHeat: 3,
    workAssignment: workAssignments[5],
  },
  {
    id: "driver-23",
    carNumber: 51,
    driverName: "Samantha Clark",
    carName: "2016 Porsche Cayman S (Prepared)",
    carClass: "bsp",
    assignedHeat: 3,
    workAssignment: workAssignments[6],
  },

  // Heat 3 - MODIFIED drivers
  {
    id: "driver-24",
    carNumber: 1,
    driverName: "Victor Hayes",
    carName: "Custom Formula X",
    carClass: "am",
    assignedHeat: 3,
    workAssignment: workAssignments[7],
  },
  {
    id: "driver-25",
    carNumber: 500,
    driverName: "Lisa Bennett",
    carName: "Stohr WF1",
    carClass: "bm",
    assignedHeat: 3,
    workAssignment: workAssignments[0],
  },

  // Heat 4 - CAM drivers
  {
    id: "driver-26",
    carNumber: 69,
    driverName: "Jason Moore",
    carName: "1969 Chevrolet Camaro Z28",
    carClass: "cam-t",
    assignedHeat: 4,
    workAssignment: workAssignments[1],
  },
  {
    id: "driver-27",
    carNumber: 70,
    driverName: "Christina Reed",
    carName: "1970 Ford Mustang Boss 302",
    carClass: "cam-t",
    assignedHeat: 4,
    workAssignment: workAssignments[2],
  },
  {
    id: "driver-28",
    carNumber: 427,
    driverName: "Paul Walker",
    carName: "2020 Dodge Challenger Hellcat",
    carClass: "cam-s",
    assignedHeat: 4,
    workAssignment: workAssignments[3],
  },
  {
    id: "driver-29",
    carNumber: 350,
    driverName: "Angela Price",
    carName: "2019 Chevrolet Camaro ZL1",
    carClass: "cam-s",
    assignedHeat: 4,
    workAssignment: workAssignments[4],
  },
  {
    id: "driver-30",
    carNumber: 5,
    driverName: "Robert King",
    carName: "2018 Ford Mustang GT350",
    carClass: "cam-c",
    assignedHeat: 4,
    workAssignment: workAssignments[5],
  },

  // Heat 4 - STREET TOURING additional drivers
  {
    id: "driver-31",
    carNumber: 86,
    driverName: "Michelle Young",
    carName: "2023 Toyota GR86",
    carClass: "stx",
    assignedHeat: 4,
    workAssignment: workAssignments[6],
  },
  {
    id: "driver-32",
    carNumber: 234,
    driverName: "Andrew Scott",
    carName: "2022 Hyundai Veloster N",
    carClass: "sth",
    assignedHeat: 4,
    workAssignment: workAssignments[7],
  },
  {
    id: "driver-33",
    carNumber: 180,
    driverName: "Jennifer Lopez",
    carName: "2021 Volkswagen GTI",
    carClass: "sth",
    assignedHeat: 4,
    workAssignment: workAssignments[0],
  },

  // Additional drivers for variety
  {
    id: "driver-34",
    carNumber: 33,
    driverName: "Thomas Wright",
    carName: "2020 Chevrolet Camaro SS",
    carClass: "fs",
    assignedHeat: 1,
    workAssignment: workAssignments[1],
  },
  {
    id: "driver-35",
    carNumber: 147,
    driverName: "Katie Murphy",
    carName: "2019 Hyundai Genesis Coupe",
    carClass: "gs",
    assignedHeat: 2,
    workAssignment: workAssignments[2],
  },
  {
    id: "driver-36",
    carNumber: 92,
    driverName: "Steven Hall",
    carName: "2022 Honda Civic Sport",
    carClass: "hs",
    assignedHeat: 3,
    workAssignment: workAssignments[3],
  },
  {
    id: "driver-37",
    carNumber: 404,
    driverName: "Laura Green",
    carName: "2023 Lotus Evora GT",
    carClass: "ssl",
    assignedHeat: 2,
    workAssignment: workAssignments[4],
  },
  {
    id: "driver-38",
    carNumber: 18,
    driverName: "James Carter",
    carName: "2021 Audi TT RS",
    carClass: "stu",
    assignedHeat: 1,
    workAssignment: workAssignments[5],
  },
  {
    id: "driver-39",
    carNumber: 76,
    driverName: "Diana Ross",
    carName: "2018 Porsche 718 Boxster S (Modified)",
    carClass: "sml",
    assignedHeat: 3,
    workAssignment: workAssignments[6],
  },
  {
    id: "driver-40",
    carNumber: 12,
    driverName: "Eric Johnson",
    carName: "2017 Nissan 350Z (Prepared)",
    carClass: "dsp",
    assignedHeat: 4,
    workAssignment: workAssignments[7],
  },
  {
    id: "driver-41",
    carNumber: 215,
    driverName: "Monica Bell",
    carName: "2016 Subaru BRZ (Prepared)",
    carClass: "esp",
    assignedHeat: 1,
    workAssignment: workAssignments[0],
  },
  {
    id: "driver-42",
    carNumber: 888,
    driverName: "Charles Wilson",
    carName: "1992 Mazda Miata (Built)",
    carClass: "ep",
    assignedHeat: 2,
    workAssignment: workAssignments[1],
  },
  {
    id: "driver-43",
    carNumber: 321,
    driverName: "Rebecca Taylor",
    carName: "1988 Honda CRX Si (Built)",
    carClass: "fp",
    assignedHeat: 4,
    workAssignment: workAssignments[2],
  },
  {
    id: "driver-44",
    carNumber: 2,
    driverName: "William Davis",
    carName: "Radical SR3",
    carClass: "cm",
    assignedHeat: 3,
    workAssignment: workAssignments[3],
  },
  {
    id: "driver-45",
    carNumber: 747,
    driverName: "Sandra Phillips",
    carName: "Spec Racer Ford",
    carClass: "dm",
    assignedHeat: 4,
    workAssignment: workAssignments[4],
  },
  {
    id: "driver-46",
    carNumber: 101,
    driverName: "George Martinez",
    carName: "Formula Vee",
    carClass: "fm",
    assignedHeat: 1,
    workAssignment: workAssignments[5],
  },
  {
    id: "driver-47",
    carNumber: 50,
    driverName: "Patricia Evans",
    carName: "Shifter Kart",
    carClass: "km",
    assignedHeat: 2,
    workAssignment: workAssignments[6],
  },
  {
    id: "driver-48",
    carNumber: 999,
    driverName: "Frank Robinson",
    carName: "2015 Dodge Viper ACR (Prepared)",
    carClass: "xp",
    assignedHeat: 3,
    workAssignment: workAssignments[7],
  },
  {
    id: "driver-49",
    carNumber: 64,
    driverName: "Donna Campbell",
    carName: "2019 Chevrolet Corvette ZR1 (Prepared)",
    carClass: "ssp",
    assignedHeat: 4,
    workAssignment: workAssignments[0],
  },
  {
    id: "driver-50",
    carNumber: 31,
    driverName: "Henry Morgan",
    carName: "2020 Ford Mustang Shelby GT500 (Prepared)",
    carClass: "fsp",
    assignedHeat: 1,
    workAssignment: workAssignments[1],
  },
];

// ============================================
// Helper to get class by ID
// ============================================

export const getClassById = (classId: string): CarClass | undefined => {
  return carClasses.find((c) => c.id === classId);
};

// ============================================
// Helper to get category by ID
// ============================================

export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find((c) => c.id === categoryId);
};

// ============================================
// Number of heats
// ============================================

export const NUM_HEATS = 4;
