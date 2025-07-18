'use client'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import AnimatedButton from './AnimatedButton';
import { useSoundEffect } from '@/hooks/useSoundEffect';

export default function InstructionPanel({ onClose }: { onClose: () => void }) {
  const ref = useRef(null);
  const playClickSound = useSoundEffect('/sounds/button2.mp3');

  useEffect(() => {
    gsap.fromTo(ref.current,{ opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' });
  }, []);

  const handleClose = () => {
    playClickSound();
    gsap.to(ref.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose
    });
  };

  return (
    <div ref={ref} className='bg-[#F8A834] rounded-[40px] shadow-xl outline outline-[15px] outline-[#691B12] w-[1108px] h-[825px] flex flex-col justify-between'>
      <div className='flex overflow-hidden'>
        <button onClick={handleClose} className='w-[306px] text-[#F8A834] border-b-2 border-r-2 border-[#691B12] rounded-tl-[35px] bg-white text-6xl leading-none shadow-md transition-transform cursor-pointer'>
          <FontAwesomeIcon 
            icon={faCaretUp}
          />
        </button>
        <button onClick={handleClose} className='w-[316px] text-[#F8A834] border-b-2 border-[#691B12] bg-white text-6xl leading-none shadow-md transition-transform cursor-pointer'>
          <FontAwesomeIcon 
            icon={faCaretUp}
          />
        </button>
        <button onClick={handleClose} className='w-[486px] text-[#F8A834] border-b-2 border-l-2 border-[#691B12] rounded-tr-[35px] bg-white text-6xl leading-none shadow-md transition-transform cursor-pointer'>
          <FontAwesomeIcon 
            icon={faCaretUp}
          />
        </button>
      </div>

      <div className='relative px-15 pt-10'>
        <h1 className='text-7xl text-center font-corndog font-extrabold text-[#8B4513] mb-6'>How to Play?</h1>
        <div className='bg-white py-6 px-20 rounded-[30px] text-center text-[#691B12] font-outfit font-semibold leading-loose'>
          <p className='font-outfit text-[#ED9D1A] mb-2 text-3xl'>Mix it up!</p>
          <p className='font-outfit text-2xl'>Use the up and down arrows to swap animal <br /> parts and build your own wild critter.</p>
          <p className='text-[#ED9D1A] mt-4 mb-2 text-3xl'>Want to learn more?</p>
          <p className='font-outfit text-2xl'>Click <span className='font-outfit font-extrabold'>EXPLORE ANIMALS</span> to discover more facts<br />about the real animals that make up your critters.</p>
          <p className='text-[#ED9D1A] mt-4 mb-2 text-3xl'>Try a Surprise Combo!</p>
          <p className='font-outfit text-2xl'>Click <span className='font-outfit font-extrabold'>RANDOM ANIMAL GENERATOR</span><br /> to create a surprise combo!</p>
        </div>
      </div>

      <AnimatedButton onClick={handleClose} className='bg-[#691B12] text-white py-5 px-10 mt-8 font-corndog text-5xl text-center font-semibold mb-10 mx-auto rounded-[20px]'>Play Now!</AnimatedButton>

      <div className='flex overflow-hidden'>
        <button onClick={handleClose} className='w-[306px] text-[#F8A834] border-t-2 border-r-2 border-[#691B12] rounded-bl-[35px] bg-white text-6xl leadning-none shadow-md transition-transform cursor-pointer overflow-hidden'>
          <FontAwesomeIcon 
            icon={faCaretDown}
          />
        </button>
        <button onClick={handleClose} className='w-[316px] text-[#F8A834] border-t-2 border-[#691B12] bg-white text-6xl leading-none shadow-md transition-transform cursor-pointer'>
          <FontAwesomeIcon 
            icon={faCaretDown}
          />
        </button>
        <button onClick={handleClose} className='w-[486px] text-[#F8A834] border-t-2 border-l-2 border-[#691B12] rounded-br-[35px] bg-white text-6xl leading-none shadow-md transition-transform cursor-pointer'>
          <FontAwesomeIcon 
            icon={faCaretDown}
          />
        </button>
      </div>

    </div>
  )
}