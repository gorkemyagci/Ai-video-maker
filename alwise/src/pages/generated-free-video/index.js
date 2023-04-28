import HomeLayout from '@/layout/HomeLayout'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const GeneratedFreeVideo = () => {
    const router = useRouter();
    return (
        <HomeLayout>
            <div className='mx-auto max-w-6xl py-14'>
                <div className='flex items-center gap-x-2 justify-center'>
                    <Image
                        src={'https://assets-global.website-files.com/61dc0796f359b6145bc06ea6/6446789efe906220ff032239_Check.svg'}
                        alt="Check"
                        width={20}
                        height={20}
                    />
                    <h2 className='text-lg font-medium'>We sent your created video to your e-mail account.</h2>
                </div>
                <div className='flex justify-center items-center gap-y-7 flex-col my-5'>
                    <p className='font-medium text-3xl'>Want to use Synthesia to speed up your video creation?</p>
                    <button onClick={() => router.push('/pricing')} className='bg-alwise px-5 py-2 rounded-xl font-semibold text-black text-lg'>See pricing</button>
                </div>
            </div>
        </HomeLayout>
    )
}

export default GeneratedFreeVideo