'use client';
import { useRef, useEffect, useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import AnimatedButton from "@/components/AnimatedButton";
import HomeButton from "@/components/HomeButton";
import { ANIMALS } from "@/data/levels";
import InstructionModal from "@/components/InstructionModal";

gsap.registerPlugin(Draggable);

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function FreePlayPage() {
    const ref = useRef(null);
    const [animals, setAnimals] = useState<string[]>([]);
    const [showInstructionModal, setShowInstructionModal] = useState(false);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const dropZoneRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        gsap.fromTo(ref.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' });
        setAnimals(shuffleArray(ANIMALS));
    }, []);

    useEffect(() => {
        if(!panelRef.current) return;
        gsap.fromTo(
            panelRef.current.children,
            {y: -300, opacity: 0},
            {y: 0, opacity: 1, stagger: {each: 0.03}, duration: 0.3, ease: 'power2.out'}
        )
    }, [animals]);

    const handleClearBoard = () => {
        if (!panelRef.current) return;
        gsap.to(panelRef.current.children, {
            y: 300,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                if (dropZoneRef.current) {
                    dropZoneRef.current.innerHTML = '';
                }
                setAnimals(shuffleArray(ANIMALS));
            },
        });
    };

    return (
        <PageWrapper>
            <div ref={ref} className='bg-white rounded-[40px] p-10 shadow-xl outline outline-[15px] outline-[#691B12] w-full h-full flex justify-between'>
                <div ref={dropZoneRef} className="flex-1 relative" />
                <div className="w-[950px] h-full flex flex-col justify-between items-center">
                    <div className="relative w-full h-[700px]">
                        <Image src="/images/home/LargeTray_FreePlay.png" alt="Free Play" width={950} height={700} className="absolute left-0 top-0 h-full object-cover" />
                        <div ref={panelRef} className={`w-full h-full grid grid-cols-6 gap-2 pb-15 px-15 pt-20`}>
                            {animals.map((name, index) => (
                                <RightPanelImage key={`${name}-${index}`} name={name} dropZoneRef={dropZoneRef} />
                            ))}
                        </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <div className="flex items-center gap-5">
                            <AnimatedButton onClick={handleClearBoard} className="bg-[#F8A834] rounded-full text-white text-3xl font-medium text-center px-8 py-3">Clear Board</AnimatedButton>
                            <AnimatedButton onClick={() => setShowInstructionModal(true)} className="bg-[#F8A834] rounded-full text-white text-3xl font-medium text-center px-8 py-3">Instructions</AnimatedButton>
                        </div>
                        <div className="flex items-center gap-5">
                            <AnimatedButton onClick={() => router.push('/connections')} className="bg-[#F8A834] rounded-full text-white text-3xl font-medium text-center px-8 py-3">Menu</AnimatedButton>
                            <div className="relative">
                                <HomeButton className="top-0 left-0 !bg-[#F8A834] text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showInstructionModal && (<InstructionModal onClose={() => setShowInstructionModal(false)} />)}
        </PageWrapper>
    );
}

function RightPanelImage({ name, dropZoneRef }: { name: string; dropZoneRef: React.RefObject<HTMLDivElement | null> }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (!ref.current || !imgRef.current || !dropZoneRef.current) return;

        const container = ref.current;
        const img = imgRef.current;
        const bounds = dropZoneRef.current.getBoundingClientRect();

        let draggable: Draggable;

        function resetPosition() {
            gsap.to(container, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    img.src = `/images/animals_rs/${name}_RS.png`;
                }
            });
        }

        draggable = Draggable.create(container, {
            type: "x,y",
            bounds: "body",
            onPress() {
                img.src = `/images/animals_ns/${name}_NS.png`;
            },
            onRelease() {
                const containerBounds = container.getBoundingClientRect();
                const isInside = containerBounds.left > bounds.left && containerBounds.right < bounds.right && containerBounds.top > bounds.top && containerBounds.bottom < bounds.bottom;

                if (isInside) {

                } else {
                    resetPosition();
                }
            }
        })[0];

        return () => {
            draggable.kill();
        };
    }, [name, dropZoneRef]);

    return (
        <div ref={ref} className="w-[120px] h-[120px] relative cursor-grab opacity-0">
            <img ref={imgRef} src={`/images/animals_rs/${name}_RS.png`} alt={name} className="w-full h-full object-contain" />
        </div>
    );
}