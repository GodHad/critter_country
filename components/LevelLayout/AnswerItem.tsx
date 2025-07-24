'use client'
import { useRef, useState } from "react";
import Image from 'next/image';
import gsap from "gsap";

export default function AnswerItem({ item, onCorrect, hasSelectedTarget, level, hidePaired, disabled: parentDisabled }: { item: string, onCorrect: (answer: string) => boolean; hasSelectedTarget: boolean; level: number; hidePaired?: () => void; disabled?: boolean}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [disabled, setDisabled] = useState(false);

    const onClick = () => {
        console.log(hasSelectedTarget, 'answer')
        if(disabled || parentDisabled || !hasSelectedTarget) return;

        const wasCorrect = onCorrect(item);
        if(wasCorrect) {
            gsap.to(ref.current, {y: 20, opacity: 0, duration: 0.3, ease: 'power2.out'});
            setDisabled(true);
            if(hidePaired) hidePaired();
        }
    }

    return (
        <div ref={ref} onClick={onClick} className={`answer-item translate-y-[300px] opacity-0 cursor-pointer transition-all ${level == 6 ? 'w-[110px] h-[110px]' : 'w-[150px] h-[150px]'} flex items-center justify-center ${disabled || parentDisabled ? 'pointer-events-none opacity-0' : ''}`}>
            <Image src={`/images/animals_rs/${item}_RS.png`} alt={item} width={level == 6 ? 110 : 150} height={level == 6 ? 110 : 150} />
        </div>
    )
}