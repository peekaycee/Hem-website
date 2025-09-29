// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { responses as aiResponses } from "../../chatResponses/aiResponses";
import OpenAI from "openai";

// Convert aiResponses array to a Record<string, string>
const typedAiResponses: Record<string, string> = Object.fromEntries(
  aiResponses.map(({ question, answer }) => [question.toLowerCase(), answer])
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message: string = body?.message || "";
    const normalized = message.toLowerCase().trim();

    // ✅ Step 1: Check for keyword matches in predefined responses
    for (const key of Object.keys(typedAiResponses)) {
      if (normalized.includes(key)) {
        return NextResponse.json({
          role: "assistant",
          content: typedAiResponses[key],
        });
      }
    }

    // ✅ Step 2: Fallback → call OpenAI
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful support assistant." },
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({
      role: "assistant",
      content:
        res.choices[0].message?.content ??
        "Sorry, I couldn’t generate a response.",
    });
  } catch (err) {
    console.error("API error:", err);

    // ✅ Step 3: Mock fallback if OpenAI quota/network fails
    return NextResponse.json({
      role: "assistant",
      content: "🤖 Mock reply: I received your message.",
    });
  }
}
