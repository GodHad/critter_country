'use client'
import { useRef, useEffect } from "react";
import gsap from "gsap";
import AnimatedButton from "./AnimatedButton";

export default function InstructionModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
    if(!visible) return;
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
        <div ref={ref} className='fixed px-15 py-10 left-1/2 top-1/2 -translate-y-[50%] -translate-x-1/2 bg-[#F8A834] rounded-[40px] shadow-xl w-[1150px] h-[800px] flex flex-col justify-between z-[9999]'>
            <h1 className='text-7xl text-center font-corndog font-extrabold text-[#8B4513] mb-8'>How to Play?</h1>
            <div className='bg-white py-10 px-20 rounded-[30px] text-center text-[#691B12] font-outfit font-semibold leading-loose'>
                <p className='font-outfit text-[#ED9D1A] mb-2 text-3xl'>Try Creating your own food chain!<br/>*Drag a Piece*</p>
                <p className='font-outfit text-2xl'>Grab an animal or plant and drag it onto the board to get started.</p>
                <p className='text-[#ED9D1A] mt-4 mb-2 text-3xl'>Build a Chain</p>
                <p className='font-outfit text-2xl'>Use the grid to help line up your food chain.<br/>Add more pieces to show who eats what, filling in the food chain from plants to predators.</p>
                <p className='text-[#ED9D1A] mt-4 mb-2 text-3xl'>Explore and Experiment</p>
                <p className='font-outfit text-2xl mb-8'>Try out different combinations and discover how energy can flow in many ways through a food chain.</p>
            </div>
            <AnimatedButton onClick={handleClose} className='bg-[#691B12] text-white py-5 px-10 mt-8 font-corndog text-5xl text-center font-semibold mb-5 mx-auto rounded-[20px]'>Play Now!</AnimatedButton>
        </div>
    )
}