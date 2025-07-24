'use client'
import { useRef, useEffect } from "react"
import gsap from "gsap";
import LevelCard from "./LevelCard";
import ArrowButton from "./ArrowButton";
import Dotbar from "./Dotbar";
import { useSlider } from "@/hooks/useSlider";
import { useRouter } from "next/navigation";

export default function Slider() {
    const {index, goNext, goPrev} = useSlider(6);
    const slideRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        gsap.to(slideRef.current, {
            x: -index * 470,
            duration: 0.6,
            ease: 'power2.out'
        })
    })

    return (
        <div className="relative flex flex-col items-center justify-center w-full">
            <div className="relative w-[450px] flex items-center justify-center">
                <ArrowButton direction="left" onClick={goPrev} className="left-[-35px] z-10" />
                <div className="w-[450px] overflow-hidden relative">
                    <div ref={slideRef} className="flex space-x-5">
                        {[1,2,3,4,5,6].map((level) => (
                            <div key={level} className="w-[450px] flex-shink-0">
                                <LevelCard level={level} onClick={() => router.push(`/connections/level/${level}`)} />
                            </div>
                        ))}
                    </div>
                </div>
                <ArrowButton direction="right" onClick={goNext} className="right-[-35px]" />
            </div>
            <Dotbar currentIndex={index} total={6} />
        </div>
    )
}