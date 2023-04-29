import HomeLayout from '@/layout/HomeLayout'
import Image from 'next/image'
import { useRouter } from 'next/router';
import React from 'react'
import { ImLinkedin } from 'react-icons/im';

const About = () => {
    const router = useRouter();
    return (
        <HomeLayout>
            <div className='w-full h-80 flex items-center justify-center'>
                <div className='flex flex-col items-center gap-y-7'>
                    <p className='font-medium text-gray-400'>Home <span className='text-white'> / </span><span className='text-white text-lg font-semibold'>About Us</span></p>
                    <h1 className='text-5xl'>About Us</h1>
                </div>
            </div>
            <div className='bg-white w-full pt-20 pb-10'>
                <div id='about' className='flex flex-col gap-y-14 items-center max-w-4xl mx-auto border-alwise border-opacity-20'>
                    <div className='flex flex-col items-center gap-y-7'>
                        <div className='font-medium text-[17px] text-black text-center flex items-start gap-x-10'>
                            <p>We have created this site as a team that uses artificial intelligence technology to prepare video answers to questions asked in various fields, in order to expand the limits of knowledge and provide users with a unique experience.</p>
                            <p>We provide video answers using artificial intelligence technology to questions asked in various areas of life such as health, technology, science, art, culture, and education on our website. Users can submit their questions to our site, and we will use natural language processing and image processing algorithms to generate accurate and understandable video answers.</p>
                            <p>Our goal is to make knowledge easily accessible and to make the process of learning more interesting by providing creative and original videos in various fields. Join us on a new journey of knowledge and enjoy the process of learning with us!</p>
                        </div>
                    </div>
                    <div className='team pt-20'>
                        <div className='rounded-full flex items-center gap-x-10 bg-black bg-opacity-80 px-5 py-4'>
                            <div className='flex items-center gap-x-8'>
                                <Image
                                    src={'https://media.licdn.com/dms/image/C4D03AQHXZ37jqrYNAQ/profile-displayphoto-shrink_100_100/0/1656098289106?e=1687392000&v=beta&t=irUTu4O4zv_3gtNupYaX7p8AR5XV9o7neoGWa5HJfa0'}
                                    alt="Profile"
                                    width={60}
                                    height={60}
                                    className='rounded-full'
                                />
                                <div className='flex flex-col gap-y-0.5 items-center'>
                                    <h5 className='text-xl font-medium text-white'>Görkem Yağcı</h5>
                                    <p className='font-normal text-sm text-gray-400'>Founder</p>
                                </div>
                            </div>
                            <ImLinkedin size={20} onClick={() => router.push('https://www.linkedin.com/in/görkem-yağcı-9487b9229/')} className='text-[#0077B5] cursor-pointer' />
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default About