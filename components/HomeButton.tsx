'use client'
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

interface HomeButtonProps {
    className?: string
}

export default function HomeButton({ className = 'absolute top-15 left-15' }: HomeButtonProps) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push('/')}
            className={`${className} z-50 p-4 rounded-full bg-white text-[#691b14] text-3xl shadow-md hover:scale-105 transition-transform cursor-pointer`}
            aria-label='Go to home'
        >
            <FontAwesomeIcon icon={faHouse} />
        </button>
    )
}