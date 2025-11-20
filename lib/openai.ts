import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
})

export async function generateSummaryFromOpenAI(pdfText: string) {
  try {
    const response = await openai.responses.create({
      // Ikuti rekomendasi di docs (boleh diganti ke 'gpt-4o-mini' kalau mau)
      model: 'gpt-4o-mini',
      input: [
        {
          role: 'system',
          content: SUMMARY_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          // pakai template literal supaya pdfText benar‑benar terinterpolasi
          content: `Berikut adalah teks PDF yang perlu diringkas:\n\n${pdfText}`,
        },
      ],
      temperature: 0.3,
      max_output_tokens: 1500,
    })

    // Sesuai contoh di docs: ambil teks dari output pertama
    const summary = response.output[0].content[0].text
    return summary
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error('RATE_LIMIT_ERROR')
    }
    throw error
  }
}