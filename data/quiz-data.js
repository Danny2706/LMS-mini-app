export const puzzleQuizzes = [
  {
    id: 1,
    type: "pattern",
    title: "Pattern Detective",
    instruction: "What comes next in this pattern?",
    emoji: "🔍",
    data: {
      pattern: ["🌟", "🌙", "🌟", "🌙", "🌟"],
      options: ["🌟", "🌙", "☀️", "🌍"],
    },
    correct: "🌙",
    explanation: "The pattern alternates between star and moon! 🌟🌙",
  },
  {
    id: 2,
    type: "color",
    title: "Color Harmony",
    instruction: "Which color completes this rainbow sequence?",
    emoji: "🌈",
    data: {
      colors: ["#10b981", "#059669", "#047857", "#065f46"],
      options: ["#064e3b", "#022c22", "#15803d", "#166534"],
    },
    correct: "#064e3b",
    explanation: "Following the green gradient pattern! 💚",
  },
  {
    id: 3,
    type: "math",
    title: "Quick Math",
    instruction: "Solve this fun equation:",
    emoji: "🧮",
    data: {
      equation: "12 + 8 = ?",
      options: [18, 19, 20, 21],
    },
    correct: 20,
    explanation: "12 + 8 = 20! Math can be fun when you break it down! ✨",
  },
  {
    id: 4,
    type: "sequence",
    title: "Number Detective",
    instruction: "What's the next number in this sequence?",
    emoji: "🔢",
    data: {
      sequence: [3, 6, 9, 12],
      options: [14, 15, 16, 18],
    },
    correct: 15,
    explanation: "It's counting by 3s! 3, 6, 9, 12, 15... Multiples of 3! 🎯",
  },
  {
    id: 5,
    type: "visual",
    title: "Shape Spotter",
    instruction: "Which shape completes the pattern?",
    emoji: "🔺",
    data: {
      shapes: [
        { type: "circle", color: "#10b981" },
        { type: "square", color: "#059669" },
        { type: "circle", color: "#10b981" },
        { type: "square", color: "#059669" },
      ],
      options: [
        { type: "circle", color: "#10b981" },
        { type: "square", color: "#059669" },
        { type: "triangle", color: "#047857" },
        { type: "circle", color: "#065f46" },
      ],
    },
    correct: { type: "circle", color: "#10b981" },
    explanation:
      "The pattern alternates: green circle, darker green square! 🎨",
  },
];
