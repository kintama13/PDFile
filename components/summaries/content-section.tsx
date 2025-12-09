export default function ContentSection({
    title,
    points
}: {
    title: string
    points: string[]
}) {
    return(
        <div className="space-y-4">
            {/* Menampilkan title */}
            {title && (
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
            )}
            
            {/* Menampilkan points */}
            {points.length > 0 ? (
                <div className="space-y-3">
                    {points.map((point, index) => (
                        <p key={`${point}-${index}`} className="text-gray-700">
                            {point}
                        </p>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Tidak ada konten</p>
            )}
        </div>
    )
}