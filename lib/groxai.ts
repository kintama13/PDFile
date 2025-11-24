import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";

const grox = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.GROX_API_KEY
});

export async function generateSummaryFromGroxAI(pdfText: string) {
  try {
    const result = await grox.chat.completions.create({
      model: "x-ai/grok-4.1-fast:free",
      messages: [
        { role: "system", content: SUMMARY_SYSTEM_PROMPT },
        { role: "user", content: `Ringkaslah teks berikut:\n\n${pdfText}` }
      ],
      temperature: 0.2,  
      max_tokens: 500,    
    });

    return result.choices[0].message.content;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    throw error;
  }
}
