'use client'
import { useRef } from 'react';
import Image from 'next/image';
import { LEVELS } from '@/data/levels';
import { useSoundEffect } from '@/hooks/useSoundEffect';
import gsap from 'gsap';

const ImagePosition = [
    {
        width: 190,
        height: 130,
        className: 'bottom-[-20px] right-[40px]'
    },
    {
        width: 200,
        height: 130,
        className: 'bottom-[-10px] right-[20px] rotate-15'
    },
    {
        width: 260,
        height: 150,
        className: 'bottom-0 right-[80px]'
    },
    {
        width: 220,
        height: 140,
        className: 'bottom-[-40px] right-[-10px] rotate-15'
    },
    {
        width: 220,
        height: 150,
        className: 'bottom-[-75px] right-[-10px] rotate-35'
    },
    {
        width: 270,
        height: 180,
        className: 'bottom-[-70px] right-[20px]'
    }
];

export default function LevelCard({ level, onClick }: { level: number, onClick: () => void }) {
    const playClickSound = useSoundEffect('/sounds/button2.mp3');
    const cardRef = useRef<HTMLDivElement | null>(null);

    const handleClick = () => {
        playClickSound();
        gsap.to(cardRef.current, {
        scale: 0.9,
        duration: 0.08,
        ease: 'power1.out',
        onComplete: () => {
            gsap.to(cardRef.current, {
            scale: 1,
            duration: 0.15,
            ease: 'back.out(2)',
            onComplete: () => {
                onClick();
            },
            });
        },
        });
    }

    return (
        <div
            ref={cardRef}
            className='relative w-[450px] h-[240px] bg-white rounded-[20px] shadow-md transition-transform cursor-pointer overflow-hidden'
            onClick={handleClick}
        >
            <p className='text-center text-3xl font-bold text-[#ED9D1A] pt-5'>Press to Begin</p>
            <p className='font-corndog text-center text-7xl text-[#ED9D1A]'>Level {level}</p>
            <Image src={LEVELS[level-1].level_image} alt={`level ${level}`} width={ImagePosition[level-1].width} height={ImagePosition[level-1].height} className={`absolute ${ImagePosition[level-1].className}`} />
        </div>
    )
}