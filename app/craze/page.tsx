'use client'
import { useState, useRef } from 'react';
import PageWrapper from '@/components/PageWrapper';
import InstructionPanel from '@/components/InstructionPanel';
import AnimalMatchUI,  { AnimalMatchUIRef } from '@/components/AnimalMatchUI';
import Sidebar from '@/components/Sidebar';

export default function CritterCrazePage() {
    const [showInstruction, setShowInstruction] = useState(true);
    const animalRef = useRef<AnimalMatchUIRef>(null);

    const handleCloseInstructions = () => {
        setShowInstruction(false);
    }

    const handleShowInstructions = () => {
        setShowInstruction(true);
    }

    const handleRandomize = () => {
        if(animalRef.current) {
            animalRef.current.handleRandomize();
        }
    };

    return (
        <PageWrapper>
            <div className='flex w-full h-full'>
                <Sidebar onRandomize={handleRandomize} onInstructionClick={handleShowInstructions} />
                <div className='flex-1 flex items-center justify-center p-8'>
                    {showInstruction ? (
                        <InstructionPanel onClose={handleCloseInstructions} />
                    ) : (
                        <AnimalMatchUI ref={animalRef} />
                    )}
                </div>
            </div>
        </PageWrapper>
    )
}