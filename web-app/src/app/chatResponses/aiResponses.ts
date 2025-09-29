import Fuse from "fuse.js";

// Predefined Q&A pairs
export const responses: { question: string; answer: string }[] = [
  { question: "hello", answer: "Hi there 👋, how can I help you?" },
  { question: "hi", answer: "Hey! How are you doing today?" },
  { question: "pricing", answer: "Our pricing details are available on the pricing page." },
  { question: "support", answer: "You can reach support via email or live chat 24/7." },
  { question: "bye", answer: "Goodbye! Have a great day 🌟" },
];

const fuse = new Fuse(responses, { keys: ["question"], threshold: 0.4 });

export function getFuzzyResponse(input: string): string | null {
  const result = fuse.search(input.toLowerCase());
  return result.length ? result[0].item.answer : null;
}
