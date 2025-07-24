'use client'
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faRedo } from '@fortawesome/free-solid-svg-icons';
import HomeButton from "../HomeButton";
import AnimatedButton from "../AnimatedButton";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function CompletionModal({ level, onPlayAgain, onClose }: { level: number; onPlayAgain: () => void; onClose: () => void }) {
    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(
            modalRef.current,
            {y: -100, opacity: 0, scale: 0.95},
            {y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)'}
        );
    }, []);

    const handleClose = () => {
        gsap.to(modalRef.current, {
            y: 100,
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.inOut',
            onComplete: () => {
                onClose?.();
            }
        });
    }

    const handlePlayAgain = () => {
        gsap.to(modalRef.current, {
            y: 100,
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.inOut',
            onComplete: () => {
                onPlayAgain?.();
            }
        });
    }

    return (
        <div ref={modalRef} className="fixed bg-[#F8A834] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 items-center justify-between z-50 rounded-[30px] shadow-xl outline outline-[10px] outline-white w-[600px] h-[400px] py-5">
            <div className="flex flex-col items-center">
                <p className="text-6xl font-corndog text-center text-[#8B4513] leading-none">Great Work</p>
                <p className="text-5xl font-corndog text-center text-white">Level Complete!</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
                {level < 6 && (
                    <AnimatedButton onClick={() => router.push(`/connections/level/${level+1}`)} className="bg-white text-4xl text-[#756b1a] font-medium py-3 px-8 w-[400px] rounded-full mx-auto flex items-center justify-center gap-2">
                        Next Level
                        <FontAwesomeIcon 
                            icon={faCaretRight}
                            className="text-5xl leading-none"
                        />
                    </AnimatedButton>
                )}
                <AnimatedButton onClick={handlePlayAgain} className="bg-white text-4xl text-[#ED9D1A] font-medium py-3 px-8 w-[400px] rounded-full mx-auto flex items-center justify-center gap-2">
                    Play Level Again
                    <FontAwesomeIcon 
                        icon={faRedo}
                        className="rotate-40"
                    />
                </AnimatedButton>
                <div className="flex justify-between items-center gap-5 w-[400px] mx-auto">
                    <AnimatedButton onClick={handleClose} className="bg-white w-full text-4xl text-[#691B12] font-medium rounded-full py-3 px-8">Menu</AnimatedButton>
                    <div className="relative">
                        <HomeButton className="top-0 left-0" />
                    </div>
                </div>
            </div>
        </div>
    )
}