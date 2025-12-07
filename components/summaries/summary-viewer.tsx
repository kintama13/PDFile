'use client'

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { parseSection } from "@/utils/summary-helpers";

export function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = summary
    .split('\n#')
    .map((section, idx) => (idx === 0 ? section.trim() : '#' + section.trim()))
    .filter(Boolean)
    .map(parseSection);

  const current = sections[currentSection];

  return (
    <Card className="p-6 h-[500px] w-full max-w-xl mx-auto">
      
      {/* Judul */}
      <h2 className="text-xl font-bold text-center mb-6">
        {current?.title || 'Judul'}
      </h2>

      {/* Konten */}
      <div className="h-[calc(100%-60px)] overflow-y-auto">
        {current?.points && current.points.length > 0 ? (
          <div className="space-y-3">
            {current.points.map((point, index) => (
              <p key={index} className="text-gray-700">
                {point}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">Tidak ada konten</p>
        )}
      </div>

      {/* Navigasi Sederhana */}
      {sections.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => setCurrentSection(p => Math.max(0, p - 1))}
            className="px-3 py-1 text-sm border rounded"
            disabled={currentSection === 0}
          >
            Sebelumnya
          </button>
          
          <span className="text-sm">
            {currentSection + 1} dari {sections.length}
          </span>
          
          <button
            onClick={() => setCurrentSection(p => Math.min(sections.length - 1, p + 1))}
            className="px-3 py-1 text-sm border rounded"
            disabled={currentSection === sections.length - 1}
          >
            Selanjutnya
          </button>
        </div>
      )}
    </Card>
  );
}