'use client'
import AnimatedButton from "../AnimatedButton";
import HomeButton from "../HomeButton";
import { useRouter } from "next/navigation";

export default function LevelSidebar({ level, onInstructionClick, hintText }: { level: number; onInstructionClick: () => void; hintText: string }) {
    const router = useRouter();

    return (
        <div className="w-[400px] p-6 flex flex-col justify-between h-full">
            <div>
                <div className="relative">
                    <p className="absolute right-0 px-15 py-4 text-6xl bg-white text-right font-corndog text-[#ED9D1A] rounded-full w-[600px]">Level&nbsp;{level}</p>
                </div>
                {hintText && (
                    <div className="bg-white rounded-[20px] p-6 mt-40 text-2xl font-medium">
                        <span className="text-3xl font-bold text-[#691B12]">HINT:&nbsp;</span> {hintText}
                    </div>
                )}
            </div>
            <div className="space-y-4">
                <AnimatedButton onClick={onInstructionClick} className='px-8 py-4 text-3xl w-full font-outfit font-semibold bg-white text-[#691B12] rounded-full shadow-lg cursor-pointer hover:scale-102'>Instructions</AnimatedButton>
                <div className='flex items-center gap-2 w-full justify-between'>
                    <AnimatedButton onClick={() => router.push('/connections')} className='px-8 py-4 w-full text-3xl font-outfit font-semibold bg-white text-[#691B12] rounded-full shadow-lg cursor-pointer hover:scale-102'>Levels</AnimatedButton>
                    <div className='relative'>
                        <HomeButton className='left-0 top-0'/>
                    </div>
                </div>
            </div>
        </div>
    )
}