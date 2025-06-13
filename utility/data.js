export let role = "admin";
export const dummyUsers = [
  {
    id: 1,
    name: "Abebe Bekele",
    email: "abebe@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    name: "Tigist Alemu",
    email: "tigist@example.com",
    role: "trainer",
    status: "inactive",
  },
  {
    id: 3,
    name: "Kebede Tesfaye",
    email: "kebede@example.com",
    role: "student",
    status: "active",
  },
  {
    id: 4,
    name: "Mekdes Tadesse",
    email: "mekdes@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: 5,
    name: "Getachew Fikre",
    email: "getachew@example.com",
    role: "trainer",
    status: "active",
  },
  {
    id: 6,
    name: "Hirut Lemma",
    email: "hirut@example.com",
    role: "student",
    status: "inactive",
  },
  {
    id: 7,
    name: "Biruk Desta",
    email: "biruk@example.com",
    role: "student",
    status: "active",
  },
  {
    id: 8,
    name: "Selam Fikadu",
    email: "selam@example.com",
    role: "admin",
    status: "inactive",
  },
  {
    id: 9,
    name: "Tadesse Mulu",
    email: "tadesse@example.com",
    role: "student",
    status: "active",
  },
  {
    id: 10,
    name: "Liyu Assefa",
    email: "liyu@example.com",
    role: "trainer",
    status: "active",
  },
];

export const dummyUserDetails = {
  1: {
    joined: "2023-01-15",
    registeredCourses: [
      { name: "Digital Governance", progress: 80 },
      { name: "AI in Public Services", progress: 45 },
    ],
    completedCourses: ["Leadership in Tech"],
    certificates: [{ title: "E-Government Expert", issuedDate: "2024-03-10" }],
  },
  2: {
    joined: "2022-09-22",
    registeredCourses: [
      { name: "Modern Pedagogy", progress: 60 },
      { name: "Curriculum Design", progress: 30 },
    ],
    completedCourses: [],
    certificates: [],
  },
  3: {
    joined: "2023-05-11",
    registeredCourses: [
      { name: "Python Programming", progress: 100 },
      { name: "HTML & CSS Basics", progress: 100 },
    ],
    completedCourses: ["Python Programming", "HTML & CSS Basics"],
    certificates: [
      { title: "Foundations of Web Development", issuedDate: "2024-02-01" },
    ],
  },
  4: {
    joined: "2024-01-10",
    registeredCourses: [{ name: "Cybersecurity Fundamentals", progress: 70 }],
    completedCourses: [],
    certificates: [],
  },
  5: {
    joined: "2023-10-05",
    registeredCourses: [
      { name: "Advanced JavaScript", progress: 100 },
      { name: "Backend with Node.js", progress: 85 },
    ],
    completedCourses: ["Advanced JavaScript"],
    certificates: [
      { title: "Certified JavaScript Trainer", issuedDate: "2024-04-22" },
    ],
  },
  6: {
    joined: "2022-12-20",
    registeredCourses: [],
    completedCourses: [],
    certificates: [],
  },
  7: {
    joined: "2023-03-30",
    registeredCourses: [
      { name: "Database Management", progress: 95 },
      { name: "Software Quality Assurance", progress: 50 },
    ],
    completedCourses: [],
    certificates: [],
  },
  8: {
    joined: "2023-06-18",
    registeredCourses: [{ name: "Public Sector Leadership", progress: 20 }],
    completedCourses: [],
    certificates: [],
  },
  9: {
    joined: "2024-02-01",
    registeredCourses: [{ name: "Mobile App Development", progress: 60 }],
    completedCourses: [],
    certificates: [],
  },
  10: {
    joined: "2023-08-08",
    registeredCourses: [{ name: "Train the Trainer", progress: 100 }],
    completedCourses: ["Train the Trainer"],
    certificates: [
      { title: "National Trainer Certificate", issuedDate: "2024-05-01" },
    ],
  },
};

export const enrollmentData = [
  { month: "Jan", enrollments: 65 },
  { month: "Feb", enrollments: 85 },
  { month: "Mar", enrollments: 95 },
  { month: "Apr", enrollments: 75 },
  { month: "May", enrollments: 110 },
  { month: "Jun", enrollments: 125 },
  { month: "Jul", enrollments: 145 },
  { month: "Aug", enrollments: 160 },
  { month: "Sep", enrollments: 140 },
  { month: "Oct", enrollments: 130 },
  { month: "Nov", enrollments: 150 },
  { month: "Dec", enrollments: 170 },
];

export const completionData = [
  { name: "Completed", value: 65 },
  { name: "In Progress", value: 25 },
  { name: "Not Started", value: 10 },
];

export const performanceData = [
  { month: "Jan", score: 78 },
  { month: "Feb", score: 82 },
  { month: "Mar", score: 85 },
  { month: "Apr", score: 80 },
  { month: "May", score: 88 },
  { month: "Jun", score: 92 },
  { month: "Jul", score: 90 },
  { month: "Aug", score: 85 },
  { month: "Sep", score: 89 },
  { month: "Oct", score: 93 },
  { month: "Nov", score: 91 },
  { month: "Dec", score: 95 },
];

export const notifications = [
  {
    id: 1,
    title: "Assessment Due",
    message: "React assessment is due tomorrow!",
    read: false,
    priority: "HIGH",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Course Updated",
    message: "The JavaScript course has new content.",
    read: true,
    priority: "MEDIUM",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // yesterday
  },
  {
    id: 3,
    title: "New Announcement",
    message: "Don't miss this week's live session.",
    read: false,
    priority: "LOW",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
  },
];
