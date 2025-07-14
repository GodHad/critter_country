'use client'
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const ref = useRef(null);

    useLayoutEffect(() => {
        if(!ref.current) return
        gsap.fromTo(ref.current, {opacity: 0}, {opacity: 1, duration: 0.6, ease: 'power2.out'})
    }, [])

    return (
        <div className='w-screen h-screen flex items-center justify-center overflow-hidden'>
            <Image 
                src='/images/home/Background.jpg'
                alt="backgrond"
                fill
                priority
                className="absolute z-0 object-cover w-full h-full"
            />
            <div ref={ref} className='relative z-10 aspect-[16/9] w-full max-w-[1920px] overflow-hidden px-25 py-25'>
                {children}
            </div>
        </div>
    )
}