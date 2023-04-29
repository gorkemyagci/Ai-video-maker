import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'
import brand from '../../../public/alwise_logo.png'

const Header = () => {
    const router = useRouter();
    return (
        <div className='w-full px-20 py-5 items-center flex justify-between'>
            <div onClick={() => router.push('/')} className='cursor-pointer relative flex items-center'>
                <Image
                    src={brand}
                    alt="Alwise Logo"
                    width={100}
                    height={100}
                />
                <h1 className='absolute -right-9 font-medium text-2xl'>Alwise</h1>
            </div>
        </div>
    )
}

export default Header