'use client';
import { RefObject } from 'react';
import TargetSlot, { TargetSlotRef } from './TargetSlot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function TargetGroup({
  refs,
  slots,
  onSelectTarget,
}: {
  refs: RefObject<(TargetSlotRef | null)[]>;
  slots: any[];
  onSelectTarget: (index: number) => void;
}) {
  const flatIndexes: { key: string; group: boolean; answer: string }[] = [];

  slots.forEach((slot, idx) => {
    if (slot.group) {
      slot.group.forEach((answer: string) => {
        flatIndexes.push({ key: `${idx}-${answer}`, group: true, answer });
      });
    } else {
      const answers = Array.isArray(slot.answer) ? slot.answer : [slot.answer];
      answers.forEach((answer: string) => {
        flatIndexes.push({ key: `${idx}-${answer}`, group: false, answer });
      });
    }
  });

  return (
    <div className="flex flex-col gap-8 justify-center flex-1">
      {slots.map((slot, slotIdx, array) => {
        const currentIndexes = flatIndexes.filter((f) => f.key.startsWith(`${slotIdx}`));
        const isVisualGroup = !!slot.group;

        return (
          <div key={`slot-${slotIdx}`} className="flex flex-col items-center relative">
            {isVisualGroup ? (
              <div className={`w-full relative h-[120px] ${slot.position === 'center' ? 'flex justify-center' : ''}`}>
                <div
                  className="absolute flex gap-5 px-10 py-1 outline outline-[3px] outline-[#691B12] rounded-full"
                  style={{
                    right: slot.position === 'left' ? '50%' : '',
                    left: slot.position === 'right' ? '50%' : '',
                    transform:
                      slot.position === 'left'
                        ? 'translateX(calc(25% + var(--spacing) * 4))'
                        : slot.position === 'right'
                        ? 'translateX(calc(-25% - var(--spacing) * 4))'
                        : '',
                    justifyContent: 'center',
                  }}
                >
                  {currentIndexes.map((refData) => {
                    const refIndex = flatIndexes.findIndex((x) => x.key === refData.key);
                    return (
                      <div key={refData.key} onClick={() => {
                        if(!refs.current[refIndex]?.isCorrect()) {
                          onSelectTarget(refIndex)
                        }
                        }}>
                        <TargetSlot
                          ref={(el) => {refs.current[refIndex] = el;}}
                          isGroupSlot
                          answer={refData.answer}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div
                key={`single-${slotIdx}`}
                onClick={() => {
                  const refIndex = flatIndexes.findIndex((x) => x.key.startsWith(`${slotIdx}`));
                  if(!refs.current[refIndex]?.isCorrect()) {
                    console.log('click')
                    onSelectTarget(refIndex);
                  }
                }}
              >
                <TargetSlot
                  ref={(el) => {refs.current[flatIndexes.findIndex((x) => x.key.startsWith(`${slotIdx}`))] = el;}}
                  answer={currentIndexes[0].answer}
                />
              </div>
            )}
            {slotIdx < array.length - 1 && (
              <FontAwesomeIcon
                icon={faCaretDown}
                className="absolute bottom-[-45px] text-6xl leading-loose text-[#691B12] z-10"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
