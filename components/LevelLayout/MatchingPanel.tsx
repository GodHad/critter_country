'use client'
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import TargetGroup from './TargetGroup';
import AnswerPanel from './AnswerPanel';
import CompletionModal from './CompletionModal';
import { TargetSlotRef } from './TargetSlot';
import { LEVELS } from '@/data/levels';

export default function MatchingPanel({level, onPlayAgain}: {level: number; onPlayAgain: () => void;}) {
    const router = useRouter();
    const mainref = useRef(null);
    const refs = useRef<(TargetSlotRef | null)[]>([]);
    const [completed, setCompleted] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [hasSelectedTarget, setHasSelectedTarget] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const levelData = LEVELS[level - 1];

    const handleSelectSlot = (index: number) => {
        if(refs.current[index]?.isCorrect()) return;
        if(selectedIndex != null && selectedIndex != index) {
            refs.current[selectedIndex]?.setEmpty();
        }
        refs.current[index]?.setSelected();
        setSelectedIndex(index);
        setHasSelectedTarget(true);
    }

    const flatSlots: { validAnswers: string[] }[] = [];

    levelData.slots.forEach((slot, idx) => {
    if ('group' in slot && slot.group) {
        slot.group.forEach(() => {
        flatSlots.push({ validAnswers: slot.group });
        });
    } else {
        const answers = Array.isArray(slot.answer) ? slot.answer : [slot.answer];
        answers.forEach(() => {
        flatSlots.push({ validAnswers: answers });
        });
    }
    });

    const handleCorrect = (answer: string) => {
        if(selectedIndex == null) return false;

        const validAnswers = flatSlots[selectedIndex].validAnswers;
        const isCorrect = refs.current[selectedIndex]?.checkAnswer(answer, validAnswers) ?? false;

        if(isCorrect) {
            const totalTargets = flatSlots.length;
            setCorrectCount(prev => {
                const newCount = prev + 1;
                if((level == 6 && newCount == totalTargets / 2) || (newCount == totalTargets)) {
                    setTimeout(() => setCompleted(true), 500);
                }
                setSelectedIndex(null);
                setHasSelectedTarget(false);
                return newCount;
            });
        } else {
            if(selectedIndex != null) {
                setTimeout(() => {
                    refs.current[selectedIndex]?.reset();
                }, 200)
            }
            setSelectedIndex(null);
            setHasSelectedTarget(false);
        }
        return isCorrect;
    };

    return (
        <div ref={mainref} className='bg-white p-6 rounded-[40px] shadow-xl outline outline-[15px] outline-[#691B12] w-[1108px] h-[825px] flex justify-between'>
            <TargetGroup refs={refs} slots={levelData.slots} onSelectTarget={handleSelectSlot} />
            <AnswerPanel levelData={levelData} onCorrect={handleCorrect} hasSelectedTarget={hasSelectedTarget} />
            {completed && <CompletionModal level={level} onClose={() => router.push('/connections')} onPlayAgain={onPlayAgain} />}
        </div>
    )
}