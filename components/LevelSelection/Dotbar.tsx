'use client'

export default function Dotbar( { currentIndex, total }: { currentIndex: number, total: number } ) {
    return (
        <div className="flex gap-2 mt-6 justify-center bg-[#691B12] text-white rounded-xl p-2">
            {Array.from({length: total}).map((_, index) => (
                <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${currentIndex == index ? 'bg-[#ED9D1A]' : 'bg-white'}`}
                />
            ))}
        </div>
    )
}