'use client'
import Image from 'next/image';
import HomeButton from './HomeButton';
import { useRouter } from 'next/navigation';

export default function Sidebar({ onInstructionClick, onRandomize }: { onInstructionClick: () => void, onRandomize: () => void } ) {
        const router = useRouter();

    return (
        <div className="w-[400px] p-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
                <Image src="/images/home/CritterCrazeLogo.png" alt="Critter Craze" className='w-full mb-4' width={300} height={200} />
                <button onClick={() => router.push('/craze/explore')} className='px-8 py-4 text-3xl w-full font-outfit font-semibold bg-white text-[#691b14] rounded-full shadow-lg cursor-pointer hover:scale-102'>Explore Animals</button>
                <div className='flex items-center gap-2 w-full justify-between'>
                    <div className='relative'>
                        <HomeButton className='left-0 top-0'/>
                    </div>
                    <button onClick={onInstructionClick} className='px-8 py-4 w-full text-3xl font-outfit font-semibold bg-white text-[#691b14] rounded-full shadow-lg cursor-pointer hover:scale-102'>Instructions</button>
                </div>
            </div>
            <button onClick={onRandomize} className='px-8 py-4 text-4xl font-alfa bg-white text-orange-400 rounded-[20px] shadow-lg cursor-pointer hover:scale-102'>Random Animal Generator</button>
        </div>
    );
}