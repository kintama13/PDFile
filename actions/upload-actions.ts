'use server'

import {generateSummaryFromMetaLlamaAI } from "@/lib/metallamaai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromGroxAI } from "@/lib/groxai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { getDbConnection } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
    userId?:string, 
    fileUrl:string, 
    summary:string, 
    title:string, 
    fileName:string
}

export async function generatePdfSummary({fileUrl, fileName}:{fileUrl: string, fileName: string}) {
    if (!fileUrl) {
        return {
            success: false,
            message: 'Upload File Gagal',
            data: null
        }
    }

    if (!fileUrl) {
        return {
            success: false,
            message: 'Upload File Gagal',
            data: null
        }
    }

    try {
        const pdfText = await fetchAndExtractPdfText(fileUrl)
        console.log({pdfText})

        let summary
        try {
            summary = await generateSummaryFromMetaLlamaAI(pdfText)
            console.log({summary})
        } catch (error) {
            console.log({error})
            if (error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED') {
                try {
                    summary = await generateSummaryFromGroxAI(pdfText)
                } catch (groxError) {
                    console.error(
                        'API Grox gagal setelah quota Meta-Llama sudah melebihi batas',
                        groxError
                    )
                    throw new Error(
                        'Gagal membuat rangkuman dari beberapa ai yang digunakan'
                    )
                }
            }
        }

        if (!summary) {
            return {
                success: false,
                message: 'tidak dapat membuat rangkuman',
                data: null
            }
        }

        const formatedFileName = formatFileNameAsTitle(fileName)

        return{
            success: true,
            message: 'Rangkuman Berhasil Dibuat',
            data: {
                title: fileName,
                summary
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

async function savePdfSummary({userId,fileUrl,summary,title,fileName}:PdfSummaryType) {
    // sql memasukkan rangkuman PDF
    try {
        const sql = await getDbConnection()
        const [savedSummary] = await sql`INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
        ) VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        ${title},
        ${fileName}
        ) RETURNING id, summary_text;`
         return savedSummary
    } catch (error) {
        console.error('error menyimpan rangkuman PDF', error)
        throw error
    }
}

export async function storePdfSummaryAction({
    fileUrl,
    summary,
    title,
    fileName
}: PdfSummaryType) {
    // user sudah login dan memiliki userId
    // simpan rangkuman pdf
    // savePdfSummary()

    let savedSummary: any
    try {
        const { userId } = await auth()
        if (!userId) {
            return {
                success: false,
                message: 'User tidak ditemukan'
            }
        }
        savedSummary = await savePdfSummary({
            userId,
            fileUrl,
            summary,
            title,
            fileName
        })

        if (!savedSummary) {
            return{
                success: false,
                message: 'Gagal menyimpan rangkuman PDF, tolong coba lagi.....'
            }
        }

    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Error menyimpan rangkuman PDF'
        }
    }

    // validasi ulang cache
    revalidatePath(`/summaries/${savedSummary.id}`)

    return {
        success: true,
        message: 'Rangkuman PDF berhasil disimpan',
        data: {
            id: savedSummary.id
        }
    }
}