'use client'
import Image from 'next/image';

export default function AnimalCard({ animal, onSelect }: { animal: any; onSelect: () => void }) {
    return (
        <div
            onClick={onSelect}
            className='small-card bg-white rounded-2xl shadow-lg cursor-pointer p-4 flex flex-col justify-center transition-all h-[250px] flex-1'
        >
            <h3 className='text-2xl font-bold mb-5 mx-auto text-[#691B12]'>{animal.name}</h3>
            <Image src={animal.image} alt={animal.name} width={ animal.name == 'Bison' ? 150 : 210 } height={animal.name == 'Bison' ? 150 : 210} className='mx-auto' />
        </div>
    )
}