// app/chatResponses/llm.ts
import { responses as aiResponses } from "../chatResponses/aiResponses";

// Convert aiResponses array to an object for easy lookup
const aiResponsesTyped: Record<string, string> = aiResponses.reduce(
  (acc: Record<string, string>, curr: { question: string; answer: string }) => {
    acc[curr.question.toLowerCase()] = curr.answer;
    return acc;
  },
  {}
);

export async function getLLMResponse(input: string): Promise<string> {
  try {
    const key = input.toLowerCase().trim();

    // Step 1: Check predefined responses
    if (aiResponsesTyped[key]) {
      return aiResponsesTyped[key];
    }

    // Step 2: Fallback → Call API route for OpenAI
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    if (!res.ok) throw new Error("Network error");

    const data = await res.json();
    return data.reply || "Sorry, I don’t have an answer for that.";
  } catch (err) {
    console.error("Fetch error:", err);
    return "Hmm 🤔 something went wrong. Please try again.";
  }
}
