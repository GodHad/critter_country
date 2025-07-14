'use client'
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const ANIMALS = ['Armadillo', 'BaldEagle', 'Bison', 'BlackBear', 'HornedToad', 'JackRabbit', 'MountainLion', 'PrairieDog', 'RoadRunner', 'Salamander'];

export interface AnimalMatchUIRef {
    handleRandomize: () => void;
}

const AnimalMatchUI = forwardRef<AnimalMatchUIRef>((_, ref) => {
    const [headIndex, setHeadIndex] = useState(0);
    const [bodyIndex, setBodyIndex] = useState(0);
    const [tailIndex, setTailIndex] = useState(0);

    const headRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const tailRef = useRef<HTMLDivElement>(null);

    const animalStep = async (
        ref: React.RefObject<HTMLDivElement | null>,
        setter: (callback: (prev: number) => number) => void,
        part: '01' | '02' | '03',
        direction: 'up' | 'down' = 'up'
    ) => {
        setter(prevIndex => {
            let nextIndex = direction == 'up' ? prevIndex - 1 : prevIndex + 1;
            if(nextIndex < 0) nextIndex = ANIMALS.length - 1;
            if(nextIndex >= ANIMALS.length) nextIndex = 0;
    
            gsap.fromTo(
                ref.current,
                {y: direction == 'up' ? -300 : 300, opacity: 0},
                {y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)'}
            );
            return nextIndex
        })
    };

    const getThreeUniqueIndexes = () => {
        const indices = Array.from({ length: ANIMALS.length }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        return indices.slice(0, 3);
    };

    const handleRandomize = async () => {
        let localHead = headIndex;
        let localBody = bodyIndex;
        let localTail = tailIndex;

        for(let i = 0;  i < 10; i ++) {
            const [newHead, newBody, newTail] = getThreeUniqueIndexes();

            localHead = newHead;
            localBody = newBody;
            localTail = newTail;

            setHeadIndex(localHead);
            setBodyIndex(localBody);
            setTailIndex(localTail);

            const isLast = i == 9;

            gsap.fromTo(headRef.current, {y: -300, opacity: 0}, {y: isLast ? 0 : 300, opacity: 1, duration: 0.8, ease: 'back.out(1.7)'});
            gsap.fromTo(bodyRef.current, {y: -300, opacity: 0}, {y: isLast ? 0 : 300, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.1});
            gsap.fromTo(tailRef.current, {y: -300, opacity: 0}, {y: isLast ? 0 : 300, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.2});

            await new Promise(res => setTimeout(res, 150));
        }
    };

    useImperativeHandle(ref, () => ({
        handleRandomize,
    }));

    useEffect(() => {
        handleRandomize();
    }, []);

    return (
        <div className='bg-[#F8A834] rounded-[40px] shadow-xl outline outline-[15px] outline-[#5A2D10]/70 w-[1108px] h-[825px] flex flex-col justify-between'>
            <div className='flex overflow-hidden'>
                <button onClick={() => animalStep(headRef, setHeadIndex, '01', 'up')} className='w-[306px] text-[#F8A834] border-b-2 border-r-2 border-[#5A2D10] rounded-tl-[35px] bg-white text-6xl leading-none shadow-md transition-transform cursor-pointer'>
                    <FontAwesomeIcon 
                        icon={faCaretUp}
                    />
                </button>
                <button onClick={() => animalStep(bodyRef, setBodyIndex, '02', 'up')} className='w-[316px] text-[#F8A834] border-b-2 border-[#5A2D10] bg-white text-6xl leading-none shadow-md transition-transform cursor-pointer'>
                    <FontAwesomeIcon 
                        icon={faCaretUp}
                    />
                </button>
                <button onClick={() => animalStep(tailRef, setTailIndex, '03', 'up')} className='w-[486px] text-[#F8A834] border-b-2 border-l-2 border-[#5A2D10] rounded-tr-[35px] bg-white text-6xl leading-none shadow-md transition-transform cursor-pointer'>
                    <FontAwesomeIcon 
                        icon={faCaretUp}
                    />
                </button>
            </div>

            <div className='flex flex-1 overflow-hidden'>
                <div ref={headRef} className='w-[306px] h-full flexitems-center justify-center overflow-hidden'>
                    <Image src={`/images/animal_part/${ANIMALS[headIndex]}-01.jpg`} alt="head" width={306} height={700} />
                </div>
                <div ref={bodyRef} className='w-[316px] h-full flexitems-center justify-center overflow-hidden'>
                    <Image src={`/images/animal_part/${ANIMALS[bodyIndex]}-02.jpg`} alt="body" width={316} height={700} />
                </div>
                <div ref={tailRef} className='w-[486px] h-full flexitems-center justify-center overflow-hidden'>
                    <Image src={`/images/animal_part/${ANIMALS[tailIndex]}-03.jpg`} alt="tail" width={486} height={700} />
                </div>
            </div>

            <div className='flex overflow-hidden'>
                <button onClick={() => animalStep(headRef, setHeadIndex, '01', 'down')} className='w-[306px] text-[#F8A834] border-t-2 border-r-2 border-[#5A2D10] rounded-bl-[35px] bg-white text-6xl leadning-none shadow-md transition-transform cursor-pointer overflow-hidden'>
                    <FontAwesomeIcon 
                        icon={faCaretDown}
                    />
                </button>
                <button onClick={() => animalStep(bodyRef, setBodyIndex, '02', 'down')} className='w-[316px] text-[#F8A834] border-t-2 border-[#5A2D10] bg-white text-6xl leading-none shadow-md transition-transform cursor-pointer'>
                    <FontAwesomeIcon 
                        icon={faCaretDown}
                    />
                </button>
                <button onClick={() => animalStep(tailRef, setTailIndex, '03', 'down')} className='w-[486px] text-[#F8A834] border-t-2 border-l-2 border-[#5A2D10] rounded-br-[35px] bg-white text-6xl leading-none shadow-md transition-transform cursor-pointer'>
                    <FontAwesomeIcon 
                        icon={faCaretDown}
                    />
                </button>
            </div>
        </div>
    )
});

AnimalMatchUI.displayName = 'AnimalMatchUI';
export default AnimalMatchUI;