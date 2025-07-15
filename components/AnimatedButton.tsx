'use client'
import { useRef } from "react"
import gsap from "gsap"
import { useSoundEffect } from "@/hooks/useSoundEffect"

interface AnimatedButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className: string;
}

export default function AnimatedButton({
    children,
    onClick,
    className = '',
}: AnimatedButtonProps) {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const playClickSound = useSoundEffect('/sounds/button2.mp3');

    const handleClick = () => {
        const btn = buttonRef.current;
        if (!btn) return;
        playClickSound();
        gsap.to(btn, {
        scale: 0.9,
        duration: 0.08,
        ease: 'power1.out',
        onComplete: () => {
            gsap.to(btn, {
            scale: 1,
            duration: 0.15,
            ease: 'back.out(2)',
            onComplete: () => {
                onClick?.();
            },
            });
        },
        });
    };

    return (
        <button
            ref={buttonRef}
            onClick={handleClick}
            className={`${className} transition-transform cursor-pointer`}
        >
            {children}
        </button>
    )
}