'use client';
import { useRef, useEffect, useState } from 'react';
import AnswerItem from './AnswerItem';
import Image from 'next/image';
import gsap from 'gsap';

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function AnswerPanel({
  levelData,
  onCorrect,
  hasSelectedTarget,
}: any) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [shuffledItems, setShuffledItems] = useState<(string | string[])[]>(() => shuffleArray(levelData.items));
  const [hiddenPairs, setHiddenPairs] = useState<Record<number, boolean>>({});

  const isLevel6 = levelData.layout === 'or-group';
  
  useEffect(() => {
    const items = panelRef.current?.querySelectorAll(
      '.answer-item'
    ) as NodeListOf<HTMLDivElement>;
    if (!items || items.length === 0) return;

    gsap.set(items, { y: -300, opacity: 0 });

    requestAnimationFrame(() => {
      gsap.to(items, {
          y: 0,
          opacity: 1,
          stagger: { each: 0.03, from:'end' },
          duration: 0.5,
          ease: 'power2.out'
      });
    });
  }, []);

  const hidePair = (index: number) => {
    setHiddenPairs((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="w-[480px] h-full relative">
      <Image
        src="/images/home/SmallTray_Levels.png"
        alt="AnswerPanel"
        width={480}
        height={800}
        className="absolute top-0 left-0 h-full object-cover"
      />
      <div
        ref={panelRef}
        className="relative z-10 pt-20 pb-20 w-full h-full flex justify-center items-center"
      >
        {isLevel6 ? (
          <div className="flex flex-col gap-x-6 gap-y-3 items-center justify-center">
            {shuffledItems.map(
              (item: string | string[], index: number, array) =>
                Array.isArray(item) && (
                  <div
                    key={index}
                    className={`flex items-center gap-6 ${index < array.length -1 ? 'border-b border-black' : '' } pb-3 transition-opacity duration-300 ${hiddenPairs[index] ? 'opacity-0 pointer-events-none' : ''}`}
                  >
                    <AnswerItem
                      item={item[0]}
                      onCorrect={onCorrect}
                      hasSelectedTarget={hasSelectedTarget}
                      level={levelData.level}
                      hidePaired={() => hidePair(index)}
                      disabled={hiddenPairs[index]}
                    />
                    <span className="font-bold text-2xl">OR</span>
                    <AnswerItem
                      item={item[1]}
                      onCorrect={onCorrect}
                      hasSelectedTarget={hasSelectedTarget}
                      level={levelData.level}
                      hidePaired={() => hidePair(index)}
                      disabled={hiddenPairs[index]}
                    />
                  </div>
                )
            )}
          </div>
        ) : (
          <div className="flex gap-12 justify-center items-center w-full h-full">
            <div className="flex flex-col items-center justify-center gap-6 h-[75%]">
              {shuffledItems
                .filter((_, i) => i % 2 === 0)
                .map(
                  (item, idx) =>
                    !Array.isArray(item) && (
                      <AnswerItem
                        key={`left-${idx}`}
                        item={item}
                        onCorrect={hasSelectedTarget ? onCorrect : () => {}}
                        hasSelectedTarget={hasSelectedTarget}
                        level={levelData.level}
                      />
                    )
                )}
            </div>
            <div className="flex flex-col items-center justify-center gap-6 h-[75%]">
              {shuffledItems
                .filter((_, i) => i % 2 !== 0)
                .map(
                  (item, idx) =>
                    !Array.isArray(item) && (
                      <AnswerItem
                        key={`right-${idx}`}
                        item={item}
                        onCorrect={hasSelectedTarget ? onCorrect : () => {}}
                        hasSelectedTarget={hasSelectedTarget}
                        level={levelData.level}
                      />
                    )
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
