'use client'
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { useSoundEffect } from '@/hooks/useSoundEffect';

interface HomeButtonProps {
    className?: string
}

export default function HomeButton({ className = 'absolute top-15 left-15' }: HomeButtonProps) {
    const router = useRouter();
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const playClickSound = useSoundEffect('/sounds/button2.mp3');

    const handleClick = () => {
        const btn = buttonRef.current;
        if(!btn) return;
        playClickSound();
        
        gsap.timeline()
        .to(btn, {
            scale: 0.85,
            duration: 0.12,
            ease: 'power1.out',
        })
        .to(btn, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
            onComplete: () => {
                router.push('/');
            },
        });
    }

    return (
        <button
            ref={buttonRef}
            onClick={handleClick}
            className={`${className} z-50 p-4 rounded-full bg-white text-[#691b14] text-3xl shadow-md transition-transform cursor-pointer`}
            aria-label='Go to home'
        >
            <FontAwesomeIcon icon={faHouse} />
        </button>
    )
}