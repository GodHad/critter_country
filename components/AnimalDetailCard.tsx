'use client';
import { forwardRef } from 'react';
import Image from 'next/image';

const AnimalDetailCard = forwardRef<HTMLDivElement, {
    animal: any;
    streamText: string;
    onClose: () => void;
}>(({ animal, streamText, onClose }, ref) => {
    return (
        <div ref={ref} className="relative top-1/2 left-1/2 aspect-square h-full -translate-x-1/2 -translate-y-1/2 rounded-[40px] shadow-2xl flex items-center justify-center"
            style={{ perspective: '1000px' }}
        >
            <div className="inner relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute w-full h-full backface-hidden bg-white rounded-[40px] flex items-center justify-center">
                    <h2 className="text-5xl font-bold text-pink-900"></h2>
                </div>
                <div className="absolute w-full h-full backface-hidden bg-white rounded-[40px] p-10 flex flex-col justify-start items-center"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <h2 className="text-5xl font-bold mb-10 mt-10 text-[#691b14] w-5/6 text-start">{animal.name}</h2>
                    <Image src={animal.image} alt={animal.name} width={400} height={300} />
                    <p className="mt-4 text-xl leading-relaxed w-5/6 mx-auto overflow-hidden mt-10 mb-10">{streamText}</p>
                    <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FFBAB3] text-3xl flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105">&times;</button>
                </div>
            </div>
        </div>
    );
});

AnimalDetailCard.displayName = 'AnimalDetailCard';
export default AnimalDetailCard;
