'use client'

import { Button } from "@/components/ui/button"
import { DownloadCloud } from "lucide-react"

export function DownloadSummaryButton({
    title,
    summaryText,
    fileName,
    createdAt
}: {
    title: string
    summaryText: string
    fileName: string
    createdAt: string
}) {
    const handleDownload = () => {
        const summaryContent = `
# ${title}
Dibuat Pada: ${new Date(createdAt).toLocaleDateString()}

${summaryText}

File Original: ${fileName}
Dibuat Oleh PDFile
        `

        const blob = new Blob([summaryContent], {type: 'text/plain'})
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = `Rangkuman-${title.replace(/[^a-z0-9]/gi,'_')}.txt`
        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    return(
        <Button
            size={'sm'}
            className="h-8 px-3 bg-rose-100 text-rose-600
            hover:text-rose-700 hover:bg-rose-50"
            onClick={handleDownload}
        >
            <DownloadCloud className="h-4 w-4 mr-1"/>
            Download rangkuman
        </Button>
    )
}