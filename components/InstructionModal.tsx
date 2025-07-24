'use client'
import { useRef, useEffect } from "react";
import gsap from "gsap";
import AnimatedButton from "./AnimatedButton";

export default function InstructionModal({ onClose }: { onClose: () => void }) {
    const ref = useRef(null);

    useEffect(() => {
        gsap.fromTo(ref.current,{ opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' });
    }, []);

    const handleClose = () => {
        gsap.to(ref.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: onClose
        });
    };

    return (
        <div ref={ref} className='fixed left-1/4 top-1/2 -translate-y-[50%] bg-[#F8A834] rounded-[40px] shadow-xl w-[850px] h-[610px] flex flex-col justify-between'>
            <div className='relative px-10 pt-15'>
                <AnimatedButton onClick={handleClose} className="absolute left-5 top-5 text-[#ED9D1A] text-6xl bg-white rounded-full px-3">&times;</AnimatedButton>
                <h1 className='text-7xl text-center font-corndog font-extrabold text-[#8B4513] mb-6'>How to Play?</h1>
                <div className='bg-white py-5 px-20 rounded-[30px] text-center text-[#691B12] font-outfit font-semibold leading-loose'>
                    <p className='font-outfit text-[#ED9D1A] mb-2 mt-4 text-2xl'>Try creating your own food chain! To get started,<br/>drag a piece onto the board</p>
                    <p className='font-outfit text-2xl'>Click on an empty space in the food chain to start.</p>
                    <p className='text-red-500 mt-4 mb-4 text-2xl'>THIS COPY HASN'T BEEN WRITTEN</p>
                    <p className='text-[#ED9D1A] mt-4 mb-2 text-3xl'>Complete the Chain</p>
                    <p className='font-outfit text-2xl mb-20'>Keep filling in the food chain from<br/>plants to predators until it's complete!</p>
                </div>
            </div>
        </div>
    )
}