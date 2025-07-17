'use client'
import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const ref = useRef(null);
    const router = useRouter();
    const pathname = usePathname();

    useLayoutEffect(() => {
        if(!ref.current) return
        gsap.fromTo(ref.current, {opacity: 0}, {opacity: 1, duration: 0.6, ease: 'power2.out'})
    }, [])

    useEffect(() => {
        if(pathname == '/') return;
        const timer = setTimeout(() => {
            router.push('/');
        }, 5 * 60 * 1000);

        return () => clearTimeout(timer);
    }, [pathname, router]);

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