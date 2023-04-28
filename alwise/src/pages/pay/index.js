import Icon from '@/Icon';
import Credit from '@/components/pay/Credit';
import TotalPrice from '@/components/pay/TotalPrice';
import { useRouter } from 'next/router'
import React from 'react'

const Pay = () => {
    const router = useRouter();
    console.log(router);
    return (
        <div className='w-full h-screen overflow-y-auto bg-white text-black'>
            <div onClick={() => router.back()} className='absolute top-10 left-10 flex items-center gap-x-2 cursor-pointer'>
                <svg class="InlineSVG Icon Header-backArrow mr2 Icon--sm" focusable="false" width="15" height="15" viewBox="0 0 16 16"><path d="M3.417 7H15a1 1 0 0 1 0 2H3.417l4.591 4.591a1 1 0 0 1-1.415 1.416l-6.3-6.3a1 1 0 0 1 0-1.414l6.3-6.3A1 1 0 0 1 8.008 2.41z" fill-rule="evenodd"></path></svg>
                <p className='font-medium'>Alwise</p>
            </div>
            <div className='w-full mx-auto h-full flex justify-between gap-x-14'>
                <TotalPrice />
                <Credit />
            </div>
        </div>
    )
}

export default Pay