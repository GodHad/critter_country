'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HomeButton from '@/components/HomeButton';
import PageWrapper from '@/components/PageWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';

export default function MenuPage() {
    const router = useRouter();

    return(
        <PageWrapper>
            <div className="relative w-full h-full flex items-center justify-center">
                <HomeButton />

                <div className="flex gap-20 px-20">
                    <div 
                        className="bg-white rounded-[40px] w-[550px] shadow-xl outline outline-[15px] outline-[#5A2D10]/70 flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden"
                    >
                        <Image 
                            src="/images/home/CritterConnectionsLogo.png"
                            alt="Critter Connections"
                            width={450}
                            height={250}
                            className='mt-5 mx-auto'
                        />
                        <p className="font-outfit font-semibold text-2xl mt-5 mx-5 text-center text-black">Build food chains and discover how nature fits together</p>
                        <div className='relative bg-[#F8A834] h-[400px] mt-10 flex items-center justify-center'>
                            <FontAwesomeIcon 
                                icon={faArrowTurnDown}
                                width={40}
                                className="absolute left-[25%] bottom-[25%] text-[#5A2D10] text-4xl rotate-270 scale-x-[-1]"
                            />
                            <FontAwesomeIcon 
                                icon={faArrowTurnDown}
                                width={40}
                                className="absolute right-[25%] top-[58%] text-[#5A2D10] text-4xl rotate-180 scale-x-[-1]"
                            />
                            <div className="absolute bottom-[40%] left-[8%]">
                                <Image src="/images/home/Grass_YS.png" alt="Gras" width={160} height={160} />
                            </div>
                            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2">
                                <Image src="/images/home/Mouse_YS.png" alt="Mouse" width={160} height={160} />
                            </div>
                            <div className="absolute bottom-[50%] right-[10%]">
                                <Image src="/images/home/Snake_YS.png" alt="Snake" width={160} height={160} />
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-white rounded-[40px] w-[550px] shadow-xl outline outline-[15px] outline-[#5A2D10]/70 flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden"
                        onClick={() => router.push('/craze')}
                    >
                        <Image 
                            src="/images/home/CritterCrazeLogo.png"
                            alt="Critter Craze"
                            width={330}
                            height={150}
                            className='mt-5 mx-auto'
                        />
                        <p className="font-outfit font-semibold text-2xl mt-5 mx-5 text-center text-black">Mix, match, and create wild new critters</p>
                        <div className="relative bg-[#835430] flex justify-center items-center h-[400px] mt-10">
                            <div className="absolute bottom-[10%] left-1/2 -translate-x-[175%] rotate-355">
                                <Image src="/images/home/mount.jpg" alt="Mount" width={120} height={150} />
                            </div>
                            <div className="absolute left-1/2 -translate-x-[75%] bottom-[18%]">
                                <Image src="/images/home/to.jpg" alt="TO" width={120} height={150} />
                            </div>
                            <div className='absolute left-1/2 translate-x-[15%] bottom-[10%] rotate-10'>
                                <Image src="/images/home/LLO.jpg" alt="LLO" width={180} height={200} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}