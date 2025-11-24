import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";

const metallama = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.LLAMA_API_KEY
});

export async function generateSummaryFromMetaLlamaAI(pdfText: string) {
  try {
    const result = await metallama.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct:free",
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
