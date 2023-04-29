import { useRouter } from 'next/router';
import React from 'react'

const Video = () => {
    const router = useRouter();
    return (
        <div className='bg-transparent w-full pt-5'>
            <div className='max-w-6xl mx-auto flex items-start gap-x-10 pt-10'>
                <div className='flex flex-col items-start gap-y-5 w-10/12'>
                    <h2 className='text-5xl'>Create your custom AI Avatar & Voice</h2>
                    <p className='text-gray-400'>Alwise is a platform that allows you to create your own AI avatar and voice. You can use it for your social media accounts, your business, or even your own personal use. You can also use it to create your own AI avatar and voice for your business.</p>
                    <button onClick={() => router.push('/create-free-ai-video')} className='border-2 hover:bg-alwise hover:text-black border-alwise transition-all duration-300 bg-transparent text-white font-semibold rounded-md px-6 py-2.5 mt-2'>Create AI video</button>
                </div>
                <div>
                    <video controls className='shadow-lg shadow-white'>
                        <source src='https://synthesia-results.s3.eu-west-1.amazonaws.com/website_demos/Homepage/Hero/q2-23/product_demo.mp4' type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    )
}

export default Video