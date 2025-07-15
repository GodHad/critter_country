'use client'
import { useState, useRef, useEffect } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { ANIMALS } from '@/data/animals';
import gsap from 'gsap';
import AnimalCard from '@/components/AnimalCard';
import AnimalDetailCard from '@/components/AnimalDetailCard';
import HomeButton from '@/components/HomeButton';
import { useRouter } from 'next/navigation';
import AnimatedButton from '@/components/AnimatedButton';
import { useSoundEffect } from '@/hooks/useSoundEffect';

export default function Explore() {
    const [selectedAnimal, setSelectedAnimal] = useState<null | typeof ANIMALS[0]>(null);
    const [streamText, setStreamText] = useState('');
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const bigCardRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const router= useRouter();

    const playFlipSound =useSoundEffect('/sounds/flip.mp3');

    useEffect(() => {
        if(!selectedAnimal) {
            const validRefs = cardRefs.current.filter(Boolean);
            gsap.fromTo(
                validRefs,
                {opacity: 0, y: 50},
                {opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out'}
            );
        }
        return () => {
            if(intervalRef.current) clearInterval(intervalRef.current);
        }
    }, [selectedAnimal]);

    useEffect(() => {
        if(selectedAnimal && bigCardRef.current) {
            playFlipSound();
            gsap.fromTo(
                bigCardRef.current,
                {scale: 0.7, opacity: 0},
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.inOut',
                }
            );

            gsap.fromTo(
                bigCardRef.current.querySelector('.inner') as HTMLElement,
                {rotationY: 0},
                {
                    rotationY: 180,
                    duration: 0.4,
                    ease: 'power2.inOut',
                    delay: 0.3,
                    onComplete: () => showStreamText(selectedAnimal.intro)
                }
            )
        }
    }, [selectedAnimal]);

    const showStreamText = (text: string) => {
        let i = 0;
        setStreamText('');
        if(intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setStreamText(prev => prev + text[i]);
            i ++;
            if(i >= text.length - 1) {
                if(intervalRef.current) clearInterval(intervalRef.current)
            }
        }, 5);
    };

    const handleSelect = (animal: typeof ANIMALS[0], index: number) => {
        gsap.to(cardRefs.current, {
            opacity: 0,
            scale: 0.7,
            duration: 0.4,
            stagger: 0.05
        });
        setTimeout(() => setSelectedAnimal(animal), 400);
    }

    const handleClose = () => {
        if(!bigCardRef.current) return;
        if(intervalRef.current) clearInterval(intervalRef.current);
        const inner = bigCardRef.current.querySelector('.inner') as HTMLElement;
        if(!inner) return;

        const validRefs = cardRefs.current.filter(Boolean);

        const tl = gsap.timeline({
            onComplete: () => {
                setSelectedAnimal(null);;
                setStreamText('');
            }
        });
        playFlipSound();
        tl.to(inner, {
            rotationY: 0,
            duration: 0.4,
            ease: 'power2.inOut',
        });
        tl.to(bigCardRef.current, {
            scale: 0.7,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
        }, '<0.4');
        tl.to(validRefs, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
        }, '<0.2');
    }

    return (
        <PageWrapper>
            <div className='w-full h-full flex flex-col items-center justify-center'>
                {!selectedAnimal && (
                    <div className='w-full h-full flex flex-col items-center justify-between'>
                        <div className='w-full flex flex-row items-center justify-start gap-5'>
                            <AnimatedButton onClick={() => router.back()} className='px-8 py-4 text-3xl font-outfit font-semibold bg-white text-[#691b14] rounded-full shadow-lg cursor-pointer hover:scale-102'>Back</AnimatedButton>
                            <div className='relative'><HomeButton className='top-0 left-0' /></div>
                        </div>
                        <p className='font-semibold text-5xl'>Touch a card to learn about the animals that make up your critters.</p>
                        <div className='w-full grid grid-cols-5 gap-10'>
                            {ANIMALS.map((animal, index) => (
                                <div
                                    key={animal.name}
                                    ref={el => {
                                        if(el) cardRefs.current[index] = el;
                                    }}
                                >
                                    <AnimalCard animal={animal} onSelect={() => handleSelect(animal, index)} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {selectedAnimal && (
                    <div className='w-full h-full relative'>
                        <HomeButton className='absolute top-0 left-0' />
                        <AnimalDetailCard 
                            ref={bigCardRef} 
                            animal={selectedAnimal} 
                            streamText={streamText} 
                            onClose={handleClose} 
                        />
                    </div>
                )}
            </div>
        </PageWrapper>
    )
}