import Image from 'next/image'
import React from 'react'
import { MdDone } from 'react-icons/md';

const Alwise = () => {
    return (
        <div className='flex flex-col items-center gap-y-20 mt-40 pt-10 pb-10 bg-gradient-to-r w-full from-[#000000] to-[#2f2f2f]'>
            <h2 className='font-semibold text-4xl py-2.5 text-center leading-[55px]'>The answers you are <br /> looking for are with you alwise</h2>
            <div className='bg-white rounded-lg pt-5 pb-16 px-5 flex flex-col gap-y-10 items-center w-[30rem]'>
                <h5 className='text-black text-2xl font-medium'>Alwise AI video creation</h5>
                <Image
                    src={'https://assets-global.website-files.com/61dc0796f359b6145bc06ea6/64187ae0a9d873a30a0bf0a6_Group%20448.png'}
                    alt="Alwise Logo"
                    width={400}
                    height={400}
                />
                <ul className='flex flex-col w-full items-start gap-y-5'>
                    <li className='flex items-start gap-x-2'>
                        <MdDone size={22} className='text-green-600' />
                        <span className='text-black text-lg'><b>Affordable</b> plans starting at just $4,99/month</span>
                    </li>
                    <li className='flex items-start gap-x-2'>
                        <MdDone size={22} className='text-green-600' />
                        <span className='text-black text-lg'>Create your own AI avatar and voice</span>
                    </li>
                    <li className='flex items-start gap-x-2'>
                        <MdDone size={22} className='text-green-600' />
                        <span className='text-black text-lg'>Create your own AI avatar and voice for your business</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Alwise