'use client'
import Image from 'next/image';
import PageWrapper from "@/components/PageWrapper";
import HomeButton from '@/components/HomeButton';
import AnimatedButton from '@/components/AnimatedButton';
import Slider from '@/components/LevelSelection/Slider';
import { useRouter } from 'next/navigation';
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function Connections() {
    const router = useRouter();
    const titleRef = useRef<HTMLDivElement | null>(null);
    const slideRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const tl = gsap.timeline({defaults: {ease: 'power2.out', duration: 0.3}});
        tl.fromTo(titleRef.current, {opacity: 0, scale: 0.95}, {opacity: 1, scale: 1})
            .fromTo(slideRef.current, {opacity: 0, scale: 0.95}, {opacity: 1, scale: 1}, '-=0.1')
            .fromTo(buttonRef.current, {opacity: 0, scale: 0.95}, {opacity: 1, scale: 1}, '-=0.1')
    }, [])

    return (
        <PageWrapper>
            <div className="relative flex w-full h-full flex-col justify-between py-15">
                <div ref={titleRef} className='flex flex-col justify-start mx-auto'>
                    <Image src="/images/home/CritterConnections_HorizontalLogo.png" alt="Connections Logo" width={1000} height={500} />
                    <p className='text-3xl font-bold text-[#691B12] text-center mt-5'>Choose any level to begin. We recommend starting with Level1!<br />Or try Free Play to build your own food chains!</p>
                </div>
                <div ref={slideRef}>
                    <Slider />
                </div>
                <div ref={buttonRef} className='mx-auto'>
                    <AnimatedButton onClick={() => router.push('/connections/freeplay')} className='w-[450px] px-8 py-4 mx-auto text-4xl font-corndog font-semibold bg-white text-[#816327] rounded-[20px] shadow-lg cursor-pointer hover:scale-102'>Free Play</AnimatedButton>
                </div>
                <HomeButton />
            </div>
        </PageWrapper>
    )
}