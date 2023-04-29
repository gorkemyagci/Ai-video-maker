import { db } from '@/firebase'
import { arrayUnion, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineHeart } from 'react-icons/ai'
import axios from 'axios'
import { apiKey } from '@/utils'
import { toast } from 'react-hot-toast'
import LikeVideo from './LikeVideo'

const GeneratedVideos = () => {
    const router = useRouter()
    const [videos, setVideos] = useState([]);
    const { user } = useSelector(state => state.auth)
    const unSub = user && user.uid && onSnapshot(doc(db, "userVideos", user?.uid), (data) => {
        if (data.exists()) {
            setVideos(data.data().videos);
        }
    })

    useEffect(() => {
        return () => {
            unSub && unSub();
        }
    }, []);
    return (
        <div className='max-w-7xl mx-auto mt-20'>
            <button onClick={() => router.push('/generate-video')} className='border-2 border-alwise text-white hover:bg-alwise hover:text-black transition-all duration-200 font-medium rounded-full absolute right-10 px-4 py-2'>
                Generate a Video
            </button>
            <h1 className='text-3xl tracking-wide'>Generated Videos</h1>
            <div className='flex flex-col gap-y-10 mt-14'>
                {videos?.map((item, index) => {
                    return (
                        <div key={index} className='flex w-7/12 gap-x-5 items-start justify-between gap-y-5'>
                            <div onClick={() => router.push(`/video-details/${item?.videoId}`)} className='flex items-start gap-x-5 cursor-pointer '>
                                <div className='flex gap-x-5'>
                                    <div className='flex flex-col gap-y-1'>
                                        <p className='text-lg font-semibold text-white'>{item?.title.replace(/(^"|"$)/g, '')}</p>
                                        <p className='text-sm text-gray-400 font-medium'>
                                            {new Date(item?.createdAt?.seconds * 1000).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <LikeVideo obj={item} />
                        </div>
                    )
                })}
                {!videos &&
                    <div>
                        <p className='text-lg font-semibold'>You have not generated any videos yet.</p>
                        <p className='text-sm text-gray-400 font-medium'>
                            Click on the button above to generate a video.
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}

export default GeneratedVideos