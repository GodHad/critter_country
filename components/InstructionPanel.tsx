'use client'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function InstructionPanel({ onClose }: { onClose: () => void }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current,{ x: 500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 });
  }, []);

  const handleClose = () => {
    gsap.to(ref.current, {
      x: 500,
      opacity: 0,
      duration: 0.5,
      onComplete: onClose
    });
  };

  return (
    <div ref={ref} className='bg-[#F8A834] rounded-[40px] shadow-xl outline outline-[15px] outline-[#5A2D10]/70 w-[1108px] h-[825px] flex flex-col justify-between'>
      <div className='flex overflow-hidden'>
        <button className='w-[306px] text-[#F8A834] border-b-2 border-r-2 border-[#5A2D10] rounded-tl-[35px] bg-white text-6xl leading-none shadow-md transition-transform cursor-pointer'>
          <FontAwesomeIcon 
            icon={faCaretUp}
          />
        </button>
        <button className='w-[316px] text-[#F8A834] border-b-2 border-[#5A2D10] bg-white text-6xl leading-none shadow-md transition-transform cursor-pointer'>
          <FontAwesomeIcon 
            icon={faCaretUp}
          />
        </button>
        <button className='w-[486px] text-[#F8A834] border-b-2 border-l-2 border-[#5A2D10] rounded-tr-[35px] bg-white text-6xl leading-none shadow-md transition-transform cursor-pointer'>
          <FontAwesomeIcon 
            icon={faCaretUp}
          />
        </button>
      </div>

      <div className='relative p-15'>
        <button onClick={handleClose} className='absolute top-3 left-15 pt-1 pb-2 px-4 rounded-full bg-white text-orange-500 text-3xl font-semibold shadow-md hover:scale-105 transition-transform cursor-pointer'>&times;</button>
        <h1 className='text-7xl text-center !font-alfa font-extrabold text-[#8B4513] mb-6'>How to Play?</h1>
        <div className='bg-white py-6 px-20 rounded-[30px] text-center text-black font-outfit font-semibold leading-loose'>
          <p className='font-outfit text-orange-600 mb-2 text-3xl'>Mix it up!</p>
          <p className='font-outfit text-2xl'>Use the up and down arrows to swap animal <br /> parts and build your own wild critter.</p>
          <p className='text-orange-600 mt-4 mb-2 text-3xl'>Try a Surprise Combo!</p>
          <p className='font-outfit text-2xl'>Click <span className='font-outfit font-extrabold'>RANDOM ANIMAL GENERATOR</span><br /> to create a surprise combo!</p>
          <p className='text-orange-600 mt-4 mb-2 text-3xl'>Want to learn more?</p>
          <p className='font-outfit text-2xl'>Click <span className='font-outfit font-extrabold'>EXPLORE ANIMALS</span> to discover more facts<br />about the real animals that make up your critters.</p>
        </div>
      </div>

      <div className='flex overflow-hidden'>
        <button className='w-[306px] text-[#F8A834] border-t-2 border-r-2 border-[#5A2D10] rounded-bl-[35px] bg-white text-6xl leadning-none shadow-md transition-transform cursor-pointer overflow-hidden'>
          <FontAwesomeIcon 
            icon={faCaretDown}
          />
        </button>
        <button className='w-[316px] text-[#F8A834] border-t-2 border-[#5A2D10] bg-white text-6xl leading-none shadow-md transition-transform cursor-pointer'>
          <FontAwesomeIcon 
            icon={faCaretDown}
          />
        </button>
        <button className='w-[486px] text-[#F8A834] border-t-2 border-l-2 border-[#5A2D10] rounded-br-[35px] bg-white text-6xl leading-none shadow-md transition-transform cursor-pointer'>
          <FontAwesomeIcon 
            icon={faCaretDown}
          />
        </button>
      </div>

    </div>
  )
}