export const learningHabitsQuestions = [
  {
    id: 1,
    type: "time",
    category: "Learning Schedule",
    emoji: "⏰",
    question: "When do you feel most focused and ready to learn?",
    description:
      "Understanding your peak learning hours helps optimize your study schedule",
    options: [
      {
        emoji: "🌅",
        text: "Early Morning (6-9 AM)",
        description: "I'm a morning person and love starting fresh",
        value: "morning",
      },
      {
        emoji: "☀️",
        text: "Mid-Day (10 AM-2 PM)",
        description: "I hit my stride during regular work hours",
        value: "midday",
      },
      {
        emoji: "🌆",
        text: "Evening (6-9 PM)",
        description: "I prefer learning after work/school",
        value: "evening",
      },
      {
        emoji: "🌙",
        text: "Night Owl (9 PM-12 AM)",
        description: "I'm most creative and focused late at night",
        value: "night",
      },
    ],
  },
  {
    id: 2,
    type: "style",
    category: "Learning Style",
    emoji: "🎯",
    question: "How do you prefer to absorb new information?",
    description: "Different learning styles work better for different people",
    options: [
      {
        emoji: "👀",
        text: "Visual Learning",
        description: "Charts, diagrams, and visual aids help me understand",
        value: "visual",
      },
      {
        emoji: "👂",
        text: "Auditory Learning",
        description: "I learn best through listening and discussion",
        value: "auditory",
      },
      {
        emoji: "✋",
        text: "Hands-on Practice",
        description: "I need to do it myself to really understand",
        value: "kinesthetic",
      },
      {
        emoji: "📚",
        text: "Reading & Writing",
        description: "I prefer text-based learning and taking notes",
        value: "reading",
      },
    ],
  },
  {
    id: 3,
    type: "social",
    category: "Social Learning",
    emoji: "👥",
    question: "Do you prefer learning alone or with others?",
    description: "Some people thrive in groups while others prefer solo study",
    options: [
      {
        emoji: "🧘",
        text: "Solo Learner",
        description: "I focus better when studying alone",
        value: "solo",
      },
      {
        emoji: "👫",
        text: "Small Groups (2-4 people)",
        description: "I like intimate study groups with close friends",
        value: "small_group",
      },
      {
        emoji: "👥",
        text: "Large Groups/Classes",
        description: "I enjoy the energy of bigger learning environments",
        value: "large_group",
      },
      {
        emoji: "🔄",
        text: "Mix of Both",
        description: "I like to switch between solo and group learning",
        value: "mixed",
      },
    ],
  },
  {
    id: 4,
    type: "goal",
    category: "Learning Goals",
    emoji: "🎯",
    question: "What motivates you most when learning something new?",
    description:
      "Understanding your motivation helps create better learning experiences",
    options: [
      {
        emoji: "🏆",
        text: "Achieving Mastery",
        description: "I want to become an expert in my field",
        value: "mastery",
      },
      {
        emoji: "💼",
        text: "Career Advancement",
        description: "I'm learning to get a better job or promotion",
        value: "career",
      },
      {
        emoji: "🎨",
        text: "Creative Expression",
        description: "I want to build cool projects and express creativity",
        value: "creativity",
      },
      {
        emoji: "🌱",
        text: "Personal Growth",
        description: "I enjoy learning for the sake of self-improvement",
        value: "growth",
      },
    ],
  },
  {
    id: 5,
    type: "pace",
    category: "Learning Pace",
    emoji: "⚡",
    question: "What's your preferred learning pace?",
    description:
      "Everyone learns at their own speed - what works best for you?",
    options: [
      {
        emoji: "🐌",
        text: "Slow & Steady",
        description:
          "I like to take my time and really understand each concept",
        value: "slow",
      },
      {
        emoji: "🚶",
        text: "Moderate Pace",
        description: "I prefer a balanced approach with regular progress",
        value: "moderate",
      },
      {
        emoji: "🏃",
        text: "Fast & Intensive",
        description: "I like to dive deep and learn quickly",
        value: "fast",
      },
      {
        emoji: "🔄",
        text: "Variable Pace",
        description: "It depends on the topic and my schedule",
        value: "variable",
      },
    ],
  },
];
