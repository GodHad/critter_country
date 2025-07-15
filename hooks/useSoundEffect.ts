import { useEffect, useRef, useState } from 'react';

export function useSoundEffect(src: string) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const audio = new Audio(src);
        audio.load();
        audioRef.current = audio;
    }, [src]);

    const play = () => {
        if(!isClient || !audioRef.current) return;
        const sound = audioRef.current.cloneNode() as HTMLAudioElement;
        sound.currentTime = 0;
        sound.play();
    };

    return play;
}