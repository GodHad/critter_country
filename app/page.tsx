'use client'
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";
import { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { useSoundEffect } from "@/hooks/useSoundEffect";

export default function Home() {
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();
  const playClickSound = useSoundEffect('/sounds/button2.mp3');

  useEffect(() => {
    gsap.fromTo(
      titleRef.current, {opacity: 0, y: -60}, {opacity: 1, y: 0, ease: 'power3.out'}
    )
    gsap.fromTo(
      buttonRef.current, {opacity: 0, scale: 0.9}, {opacity: 1, scale: 1, duration: 0.6, delay: 0.4, ease: 'back.out(1.7)'}
    )
  }, [])

  const handleClick = () => {
    const btn = buttonRef.current;
    playClickSound();
    gsap.to(btn, {
      scale: 0.92,
      duration: 0.1,
      ease: 'power1.out',
      onComplete: () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.15,
          ease: 'back.out(2)'
        })
        setTimeout(() => {
          router.push('/menu');
        }, 200)
      }
    })
  }

  return (
    <PageWrapper>
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="absolute top-6 left-6">
          <Image src="/images/home/home_logo.png" alt="Museum logo" width={140} height={140} />
        </div>

        <div ref={titleRef} className="w-[60%] max-w-[1000px]">
          <Image 
            src="/images/home/main_title.png"
            alt="Critter Country"
            width={1000}
            height={400}
            priority
          />
        </div>

        <button
          ref={buttonRef}
          className="
            mt-20 px-8 py-4 text-2xl font-outfit font-semibold
            bg-white text-[#691b14] rounded-full shadow-lg
            cursor-pointer
          "
          onClick={handleClick}
        >
          Touch to Explore, Create and Connect!
        </button>
      </div>
    </PageWrapper>
  );
}
