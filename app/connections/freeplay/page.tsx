'use client';
import { useRef, useEffect, useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import AnimatedButton from '@/components/AnimatedButton';
import HomeButton from '@/components/HomeButton';
import { ANIMALS } from '@/data/levels';
import InstructionModal from '@/components/InstructionModal';
import DropSlot from '@/components/DropSlot';
import { useSoundEffect } from '@/hooks/useSoundEffect';

gsap.registerPlugin(Draggable);

function sortArrayAlphabetically<T extends string>(array: T[]): T[] {
  return [...array].sort((a, b) => a.localeCompare(b));
}

export default function FreePlayPage() {
  const ref = useRef(null);
  const [animals, setAnimals] = useState(() => sortArrayAlphabetically(ANIMALS));
  const [renderKey, setRenderKey] = useState(0);
  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const dropZoneRef = useRef<HTMLDivElement | null>(null);
  const dropSlotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [highlightedSlots, setHighlightedSlots] = useState<Set<number>>(new Set());
  const [imageSlotMap, setImageSlotMap] = useState({});
  const router = useRouter();
  const playClatterSound = useSoundEffect('/sounds/clatter.mp3');
  const [editButton, setEditButton] = useState(false);
  const [show, setShow] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    const audioInstance = new Audio('/sounds/clatter.mp3');
    setAudio(audioInstance);
  }, []);

  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' });
  }, []);

  useEffect(() => {
    const element = document.getElementById('clatter');
    if (editButton && element) {
      element.click();
    }
  }, [editButton]);

  useEffect(() => {
    if (!panelRef.current) return;
    setTimeout(() => {
      setEditButton(true);
    }, 100);
    gsap.fromTo(
      panelRef.current.children,
      { y: -300, opacity: 0 },
      { y: 0, opacity: 1, stagger: { each: 0.03 }, duration: 0.3, ease: 'power2.out' }
    );
  }, [animals, renderKey]);

  const handleClearBoard = () => {
      setHighlightedSlots(new Set());
      setImageSlotMap({});
      playClatterSound();
    setAnimals(sortArrayAlphabetically(ANIMALS));
    setRenderKey(prev => prev + 1);
  };

  const handlePlaySound = () => {
    audio!.play().catch(err => console.warn('Autoplay failed:', err));
    setShow(true);
  };

  return (
    <PageWrapper>
      <div ref={ref} className='bg-white rounded-[40px] p-10 shadow-xl outline outline-[15px] outline-[#691B12] w-full h-full flex justify-between'>
        <div className='flex-1 relative pr-10'>
          <div ref={dropZoneRef} className='grid grid-cols-5 gap-4 w-full h-full'>
            {Array.from({ length: ANIMALS.length + 1 }).map((_, index) => (
              <div
                key={index}
                ref={el => {dropSlotRefs.current[index] = el}}
                className='relative h-[120px]'
              >
                <DropSlot isHighlighted={highlightedSlots.has(index)} />
              </div>
            ))}
          </div>
        </div>

        <div className='w-[950px] h-full flex flex-col justify-between items-center'>
          <button id="clatter" onClick={handlePlaySound} className="invisible absolute">
          Play
        </button>
          <div className='relative w-full h-[700px]'>
            <Image src='/images/home/LargeTray_FreePlay.png' alt='Free Play' width={950} height={700} className='absolute left-0 top-0 h-full object-cover' />
            <div ref={panelRef} className='w-full h-full grid grid-cols-6 gap-2 pb-15 px-15 pt-20'>
              {animals.map((name, index) => (
                <DraggableImage
                  key={`${name}-${index}-${renderKey}`}
                  name={name}
                  dropZoneRef={dropZoneRef}
                  dropSlotRefs={dropSlotRefs}
                  setHighlightedSlots={setHighlightedSlots}
                  imageSlotMap={imageSlotMap}
                  setImageSlotMap={setImageSlotMap}
                />
              ))}
            </div>
          </div>

          <div className='w-full flex justify-between items-center'>
            <div className='flex items-center gap-5'>
              <AnimatedButton onClick={handleClearBoard} className='bg-[#F8A834] rounded-full text-white text-3xl font-medium text-center px-8 py-3'>Clear Board</AnimatedButton>
              <AnimatedButton onClick={() => setShowInstructionModal(true)} className='bg-[#F8A834] rounded-full text-white text-3xl font-medium text-center px-8 py-3'>Instructions</AnimatedButton>
            </div>
            <div className='flex items-center gap-5'>
              <AnimatedButton onClick={() => router.push('/connections')} className='bg-[#F8A834] rounded-full text-white text-3xl font-medium text-center px-8 py-3'>Levels</AnimatedButton>
              <div className='relative'>
                <HomeButton className='top-0 left-0 !bg-[#F8A834] text-white' />
              </div>
            </div>
          </div>
        </div>

        {showInstructionModal && <InstructionModal visible={showInstructionModal} onClose={() => setShowInstructionModal(false)} />}
      </div>
    </PageWrapper>
  );
}

interface DraggableImageProps {
  name: string;
  dropZoneRef: React.RefObject<HTMLDivElement | null>;
  dropSlotRefs: React.RefObject<(HTMLDivElement | null)[]>;
  setHighlightedSlots: React.Dispatch<React.SetStateAction<Set<number>>>;
  imageSlotMap: Record<string, number | null>;
  setImageSlotMap: React.Dispatch<React.SetStateAction<Record<string, number | null>>>;
}

function DraggableImage({ name, dropZoneRef, dropSlotRefs, setHighlightedSlots, imageSlotMap, setImageSlotMap }: DraggableImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!ref.current || !imgRef.current) return;
    const container = ref.current;
    const img = imgRef.current;
    const originalPosition = { x: 0, y: 0 };

    const draggable = Draggable.create(container, {
      type: 'x,y',
      bounds: 'body',
      onPress() {
        img.src = `/images/animals_ns/${name}_NS.png`;
      },
      onDrag() {
        const box = container.getBoundingClientRect();
        let matchedSlot: number | null = null;

        dropSlotRefs.current.forEach((slot, index) => {
            if (!slot) return;
            const slotBox = slot.getBoundingClientRect();
            const isInside =
            box.left >= slotBox.left -10 &&
            box.right <= slotBox.right + 10 &&
            box.top >= slotBox.top - 10 &&
            box.bottom <= slotBox.bottom + 10;

            if (isInside) matchedSlot = index;
        });

        setImageSlotMap(prev => {
            const updated = { ...prev, [name]: matchedSlot };

            const newHighlighted = new Set(Object.values(updated).filter(val => val !== null));
            setHighlightedSlots(newHighlighted);

            return updated;
        });
        },

      onRelease() {
        const box = container.getBoundingClientRect();
        const zone = dropZoneRef.current!.getBoundingClientRect();
        const isInsideDropzone = box.left >= zone.left-40 && box.right <= zone.right + 40 && box.top >= zone.top - 40 && box.bottom <= zone.bottom + 40;

        if (!isInsideDropzone) {
          gsap.to(container, {
            x: originalPosition.x,
            y: originalPosition.y,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              img.src = `/images/animals_rs/${name}_RS.png`;
              const prevSlot = imageSlotMap[name];
              if (prevSlot !== null) {
                setHighlightedSlots(prev => {
                  const next = new Set(prev);
                  next.delete(prevSlot);
                  return next;
                });
                setImageSlotMap(prev => {
                  const updated = { ...prev };
                  delete updated[name];
                  return updated;
                });
              }
            }
          });
        }
        let closestSlot: number | null = null;
        let closetDistance = Infinity;

        dropSlotRefs.current.forEach((slot, index) => {
          if(!slot) return;
          const slotBox = slot.getBoundingClientRect();
          const dx = (box.left + box.width/2) - (slotBox.left + slotBox.width/2);
          const dy = (box.top + box.height/2) - (slotBox.top + slotBox.height/2);
          const distance = Math.sqrt(dx*dx + dy*dy);
          if(distance < 35 && distance < closetDistance) {
            closetDistance = distance;
            closestSlot = index;
          }
        })

        if(closestSlot != null) {
          const targetSlot = dropSlotRefs.current[closestSlot]!.getBoundingClientRect();
          const deltaX = (targetSlot.left + targetSlot.width/2) - (box.left + box.width/2);
          const deltaY = (targetSlot.top + targetSlot.height/2) - (box.top + box.height/2);
          gsap.to(container, {
            x:`+=${deltaX}`,
            y: `+=${deltaY}`,
            duration: 0.3,
            ease: 'power2.out'
          });
          setImageSlotMap(prev => {
            const updated = { ...prev, [name]: closestSlot };
            const newHighlighted = new Set(Object.values(updated).filter(v => v !== null));
            setHighlightedSlots(newHighlighted);
            return updated;
          });
          img.src = `/images/animals_ns/${name}_NS.png`;
        } else {
          img.src = `/images/animals_ns/${name}_NS.png`;
        }
      }
    })[0];

    return () => {draggable.kill();}
  }, [name]);

  return (
    <div ref={ref} className='w-[110px] h-[110px] relative cursor-grab opacity-0'>
      <img ref={imgRef} src={`/images/animals_rs/${name}_RS.png`} alt={name} className='w-full h-full object-contain' />
    </div>
  );
}
