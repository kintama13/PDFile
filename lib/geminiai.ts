import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts'

// Debugging: Cek apakah API Key terbaca (Lihat di terminal server saat dijalankan)
if (!process.env.GEMINI_API_KEY) {
  console.error("FATAL: GEMINI_API_KEY tidak ditemukan di .env");
} else {
  // Jangan print seluruh key demi keamanan, cukup 5 huruf awal
  console.log("API Key loaded:", process.env.GEMINI_API_KEY.substring(0, 5) + "...");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    // Gunakan model yang paling umum dan pasti ada
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      { text: SUMMARY_SYSTEM_PROMPT },
      { text: `Berikut adalah teks PDF yang perlu diringkas:\n\n${pdfText}` }
    ]);

    const response = result.response;
    const text = response.text();

    return text;

  } catch (error) {
    console.error("Error Gemini:", error);
    throw error;
  }
}