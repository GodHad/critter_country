'use client'
import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useSoundEffect } from '@/hooks/useSoundEffect';
import gsap from 'gsap';

interface ArrowButtonProps {
    direction: 'left' | 'right';
    onClick: () => void;
    className: string;
}

export default function ArrowButton( { direction, onClick, className }: ArrowButtonProps ) {
    const arrowButtonRef = useRef<HTMLButtonElement | null>(null);
    const playClickSound = useSoundEffect('/sounds/button2.mp3');

    const handleClick = () => {
        playClickSound();
        gsap.to(arrowButtonRef.current, {
        scale: 0.9,
        duration: 0.08,
        ease: 'power1.out',
        onComplete: () => {
            gsap.to(arrowButtonRef.current, {
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
        <button
            ref={arrowButtonRef}
            className={`${className} absolute w-16 h-16 flex items-center justify-center bg-[#691B12] text-white text-6xl leading-none rounded-full px-3 shadow-md transition-transform cursor-pointer`}
            onClick={handleClick}
        >
            {
                direction == 'left' ? (
                    <FontAwesomeIcon 
                        icon={faCaretLeft}
                    />
                ) : (
                    <FontAwesomeIcon 
                        icon={faCaretRight}
                    />
                )
            }
        </button>
    )
}