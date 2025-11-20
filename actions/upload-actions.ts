'use server'

import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

export async function generatePdfSummary(uploadResponse: [{
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string;
        }
    }
}]) {
    if (!uploadResponse) {
        return {
            success: false,
            message: 'Upload File Gagal',
            data: null
        }
    }

    const {
        serverData: {
            userId,
            file: {url: pdfUrl, name: fileName}
        }
    } = uploadResponse[0]

    if (!pdfUrl) {
        return {
            success: false,
            message: 'Upload File Gagal',
            data: null
        }
    }

    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl)
        console.log({pdfText})

        let summary
        try{
            summary = await generateSummaryFromOpenAI(pdfText)
            console.log({summary})
        }catch(error){
            console.log(error)
            // memanggil gemini
            if(error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED') {
                try{
                    summary = await generateSummaryFromGemini(pdfText)
                }catch(geminiError){
                    console.error('API Gemini Gagal Setelah Quota Open AI Habis', geminiError)
                    throw new Error('Gagal membuat Rangkuman Menggunakan AI Yang Tersedia')
                }
            }
        }

        if(!summary) {
            return {
                success: false,
                message: 'Gagal Membuat Rangkuman',
                data: null
            }
        }

        return {
            success: true,
            message: 'Rangkuman Telah Dibuat',
            data: {
                summary,
            }
        }
    } catch(err) {
        return {
            success: false,
            message: 'Upload File Gagal',
            data: null
        }
    }
}