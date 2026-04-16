import { streamText, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4.1-mini"),
    system: `
      You are Winstead Global's luxury real estate concierge.
      Help users discover premium Dubai properties.
      Ask budget, location, ROI, and booking intent.
    `,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
