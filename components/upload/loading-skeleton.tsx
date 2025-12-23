export default function LoadingSkeleton() {
  return (
    <div className="w-full rounded-xl border bg-white p-4 space-y-4 animate-pulse">
      {/* Judul */}
      <div className="h-6 w-1/3 rounded bg-gray-200" />

      {/* Garis pemisah */}
      <div className="h-px w-full bg-gray-100" />

      {/* Isi ringkasan */}
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-11/12 rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
      </div>
    </div>
  )
}
