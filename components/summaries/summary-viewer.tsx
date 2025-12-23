'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { parseSection } from "@/utils/summary-helpers"

export function SummaryViewer({ summary }: { summary: string }) {
  const sections = summary
    .split('\n#')
    .map((section, idx) =>
      idx === 0 ? section.trim() : '#' + section.trim()
    )
    .filter(Boolean)
    .map(parseSection)

  const current = sections[0]

  return (
    <Card className="h-[500px] w-full max-w-xl mx-auto">
      
      {/* HEADER (TINGGI TETAP) */}
      <CardHeader>
        <CardTitle className="text-center text-xl">
          {current?.title || "Judul"}
        </CardTitle>
      </CardHeader>

      {/* CONTENT (SCROLL DI SINI) */}
      <CardContent className="flex-1 overflow-y-auto">
        {current?.points?.length ? (
          <div className="space-y-3">
            {current.points.map((point, index) => (
              <p
                key={index}
                className="text-gray-700 leading-relaxed"
              >
                {point}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Tidak ada konten
          </p>
        )}
      </CardContent>
    </Card>
  )
}
