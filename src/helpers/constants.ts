export const repeatOptions = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

export const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export const contactFormInputs = [
  { label: "Name", type: "text", name: "name" },
  { label: "Email", type: "email", name: "email" },
  { label: "Subject", type: "text", name: "subject" },
];

export const cardColors = [
  "#ADF7B6",
  "#A817C0",
  "#FFC09F",
  "#B0FFFA",
  "#FCFF52",
  "#4EFF31",
  "#5BFFD8",
  "#0038FF",
  "#622BFF",
  "#D21DFF",
  "#B92350",
  "#FF0000",
  "#E9E3E8",
  "#554E55",
];

export const darkCardColors = [
  "#468E58", // #ADF7B6
  "#A817C0", // #A817C0
  "#996852", // #FFC09F
  "#569E9B", // #B0FFFA
  "#96992E", // #FCFF52
  "#268014", // #4EFF31
  "#2E8C78", // #5BFFD8
  "#0038FF", // #0038FF
  "#622BFF", // #622BFF
  "#D21DFF", // #D21DFF
  "#B92350", // #B92350
  "#FF0000", // #FF0000
  "#8B8490", // #E9E3E8
  "#554E55", // #554E55
];

export const priorities = [
  { value: -1, label: "low" },
  { value: 0, label: "standard" },
  { value: 1, label: "high" },
];

export const contractRules: Rule[] = [
  {
    id: 1,
    emoji: "🌟",
    content: "Plan tasks.",
  },
  {
    id: 2,
    emoji: "🎯",
    content: "Set goals.",
  },
  {
    id: 3,
    emoji: "🚶",
    content: "Take breaks.",
  },
  {
    id: 4,
    emoji: "💪",
    content: "Move and refresh.",
  },
  {
    id: 5,
    emoji: "🗒️",
    content: "Prioritize.",
  },
  {
    id: 6,
    emoji: "🔍",
    content: "Break tasks down.",
  },
  {
    id: 7,
    emoji: "🚫",
    content: "No multitasking.",
  },
  {
    id: 8,
    emoji: "📵",
    content: "Minimize distractions.",
  },
  {
    id: 9,
    emoji: "⏰",
    content: "Limit social media.",
  },
];
