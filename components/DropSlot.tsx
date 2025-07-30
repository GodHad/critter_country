'use client'
 
export default function DropSlot({ isHighlighted }: { isHighlighted: boolean }) {
    const strokeColor = isHighlighted ? '#691B12' : 'gray';

    return (
        <div className="w-[122px] h-[122px] relative">
            <svg viewBox="0 0 108 108" className="w-full h-full absolute inset-0">
                <polygon
                    points="5,40 25,11 88,11 104,40 104 61 87,97 21,97 5,60"
                    stroke={strokeColor}
                    strokeWidth="2"
                    fill="transparent"
                    style={{ opacity: isHighlighted ? 1 : 0.2 }}
                />
            </svg>
        </div>
    )
}