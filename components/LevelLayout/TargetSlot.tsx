'use client';
import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useSoundEffect } from '@/hooks/useSoundEffect';

export interface TargetSlotRef {
    checkAnswer: (answer: string, validAnswers?: string[]) => boolean;
    setSelected: () => void;
    setEmpty: () => void;
    isCorrect: () => boolean;
    reset: () => void;
}

const TargetSlot = forwardRef<TargetSlotRef, { answer: string; isGroupSlot?: boolean }>(({ answer, isGroupSlot = false }, ref) => {
    const [status, setStatus] = useState<'empty' | 'selected' | 'correct' | 'wrong'>('empty');
    const [filledAnswer, setFilledAnswer] = useState<string | null>(answer ?? null);
    const refDiv = useRef<HTMLDivElement | null>(null);
    const playCorrectSound = useSoundEffect('/sounds/correct.mp3');
    const playIncorrectSound = useSoundEffect('/sounds/incorrect.mp3');

    useImperativeHandle(ref, () => ({
        checkAnswer: (selected: string, validAnswers: string[] = []) => {
            if(status == 'correct') return false;
            
            const isCorrect = validAnswers.includes(selected);
            if(isCorrect) {
                setFilledAnswer(selected);
                playCorrectSound();
                setStatus('correct');
                return true;
            } else {
                playIncorrectSound();
                setStatus('wrong');
                gsap.fromTo(refDiv.current, { x: -5 }, { x: 5, repeat: 5, yoyo: true, duration: 0.05 });
                return false;
            }
        },
        setSelected: () => {
            if (status === 'empty') setStatus('selected');
        },
        setEmpty: () => {
            if (status === 'selected') setStatus('empty');
        },
        isCorrect: () => status == 'correct',
        reset: () => {
            gsap.killTweensOf(refDiv.current);
            setFilledAnswer(null);
            setStatus('empty');
        }
    }));

    const strokeColor = {
        empty: '#691B12',
        selected: '#ED9D1A',
        correct: '#756b1a',
        wrong: '#691B12',
    }[status];

    return (
        <div className="flex flex-col items-center gap-2">
            <div ref={refDiv} className={`relative w-[120px] aspect-[1/1] flex items-center justify-center ${status == 'correct' ? 'pointer-events-none' : 'cursor-pointer'}`}>
                <svg viewBox="0 0 108 108" className="w-full h-full absolute inset-0">
                    <polygon
                        points="5,40 25,11 88,11 104,40 104 61 87,97 21,97 5,60"
                        stroke={strokeColor}
                        strokeWidth="4"
                        fill="transparent"
                    />
                </svg>

                {status === 'correct' && filledAnswer && (
                    <Image
                        src={`/images/animals_ns/${filledAnswer}_NS.png`}
                        alt={filledAnswer}
                        width={100}
                        height={100}
                        className="absolute w-[90%] h-[90%] object-contain"
                    />
                )}
            </div>
        </div>
    );
});

TargetSlot.displayName = 'TargetSlot';
export default TargetSlot;
