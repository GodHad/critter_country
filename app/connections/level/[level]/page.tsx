'use client'
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import PageWrapper from "@/components/PageWrapper";
import LevelSidebar from "@/components/LevelLayout/LevelSidebar";
import LevelInstructionPanel from "@/components/LevelLayout/LevelInstructionPanel";
import MatchingPanel from "@/components/LevelLayout/MatchingPanel";
import { LEVELS } from "@/data/levels";

export default function LevelPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const isPlayAgain = searchParams.get('play') == 'true';
    const level = params.level as string;
    const levelNumber = parseInt(level);
    const [state, setState] = useState<'instruction' | 'play' | 'complete'>(isPlayAgain ? 'play' : 'instruction');
    const [remountKey, setRemountKey] = useState(0);

    useEffect(() => {
        if(isPlayAgain) setState('play');
    }, [isPlayAgain])

    const handleShowInstruction = () => {
        setState('instruction');
    }

    const handleCloseInstruction = () => {
        setState('play');
    }

    return (
        <PageWrapper>
            <div className="flex w-full h-full">
                <LevelSidebar level={levelNumber} onInstructionClick={handleShowInstruction} hintText={LEVELS[levelNumber-1].hintText} />
                <div className='flex-1 flex items-center justify-center p-8'>
                    {state == 'instruction' ? (
                        <LevelInstructionPanel onClose={handleCloseInstruction} />
                    ) : (
                        <MatchingPanel key={remountKey} level={levelNumber} onPlayAgain={() => setRemountKey((prev) => prev + 1)} />
                    )}
                </div>
            </div>
        </PageWrapper>
    )
}