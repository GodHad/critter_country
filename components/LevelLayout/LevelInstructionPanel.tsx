'use client'
import { useRef, useEffect } from "react";
import AnimatedButton from "../AnimatedButton";
import gsap from "gsap";

export default function LevelInstructionPanel({ onClose }: { onClose: () => void }) {
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
        <div ref={ref} className='bg-[#F8A834] rounded-[40px] shadow-xl outline outline-[15px] outline-[#691B12] w-[1108px] h-[825px] flex flex-col justify-center'>
            <div className='relative px-15 pt-10'>
                <AnimatedButton onClick={handleClose} className="absolute left-15 top-0 text-[#ED9D1A] text-6xl bg-white rounded-full px-3">&times;</AnimatedButton>
                <h1 className='text-7xl text-center font-corndog font-extrabold text-[#8B4513] mb-8'>How to Play?</h1>
                <div className='bg-white py-5 px-20 rounded-[30px] text-center text-[#691B12] font-outfit font-semibold leading-loose'>
                    <p className='font-outfit text-[#ED9D1A] mb-2 mt-6 text-3xl'>Tap a Spot</p>
                    <p className='font-outfit text-2xl'>Click on an empty space in the food chain to start.</p>
                    <p className='text-[#ED9D1A] mt-4 mb-2 text-3xl'>Choose an Animal or Plant</p>
                    <p className='font-outfit text-2xl'>Click the animal or plant in the try that you<br />want to place in the selected spot.</p>
                    <p className='text-[#ED9D1A] mt-4 mb-2 text-3xl'>See What Happens!</p>
                    <p className='font-outfit text-2xl'>If it's the right choice, the piece will lock into place<br/>If it's wrong, you'll get a hint to try again!</p>
                    <p className='text-[#ED9D1A] mt-4 mb-4 text-3xl'>Complete the Chain</p>
                    <p className='font-outfit text-2xl mb-6'>Keep filling in the food chain from<br/>plants to predators until it's complete!</p>
                </div>
            </div>
        </div>
    );
}