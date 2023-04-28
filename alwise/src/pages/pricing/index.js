import HomeLayout from '@/layout/HomeLayout'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'

const Pricing = () => {
    const router = useRouter();
    const [plans, setPlans] = useState([
        { title: "Package Price", price: 14.99, features: ["120 AI Avatar", "20+ AI Voice", "Unlimited Video per month"] }
    ])
    return (
        <HomeLayout>
            <div className='bg-gradient-to-b from-[#000000ed] to-alwise pt-10 pb-5 h-full absolute w-full inset-0'>
                <MdOutlineKeyboardBackspace onClick={() => router.back()} size={40} className='absolute top-6 left-6 cursor-pointer'/>
                <div className='h-[calc(100vh-111px)] bottom-0 absolute w-full'>
                    <header className='flex flex-col items-center gap-y-5'>
                        <h1 className='text-4xl font-semibold'>Pricing</h1>
                        <p className='text-2xl'>More than 1500 people use it to create professional videos.</p>
                        <p className='text-2xl'>Pay once, use for life</p>
                    </header>
                    <div className='max-w-5xl mx-auto flex items-center mt-20 justify-center'>
                        {plans.map((plan, index) => {
                            return (
                                <div key={index} className='bg-white hover:-translate-y-6 transition-all duration-200 text-black w-80 px-3 py-3 rounded-lg'>
                                    <h2 className='text-2xl font-semibold'>{plan.title}</h2>
                                    <p className='text-2xl font-semibold'>${plan.price}</p>
                                    <ul className='flex flex-col gap-y-2 pt-5'>
                                        {plan.features.map((feature, index) => {
                                            return (
                                                <li key={index} className='flex items-center gap-x-2'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>{feature}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <button onClick={() => router.push('/auth/signup')} className='w-full bg-alwise rounded-md py-1.5 font-semibold mt-5'>Choose Plan</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Pricing