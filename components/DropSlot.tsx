'use client'
 
export default function DropSlot({ isHighlighted }: { isHighlighted: boolean }) {
    const strokeColor = isHighlighted ? '#691B12' : 'gray';

    return (
        <div className="w-[122px] h-[122px] relative">
            <svg viewBox="0 0 108 108" className="w-full h-full absolute inset-0">
                <polygon
                    points="4,40 25,11 87,11 101.5,40 101.5 61.5 85,96 20,96 3,61"
                    stroke={strokeColor}
                    strokeWidth="2"
                    fill="transparent"
                    style={{ opacity: isHighlighted ? 1 : 0.2 }}
                />
            </svg>
        </div>
    )
}