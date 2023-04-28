import profilesPhotos from '@/data/profilesPhotos'
import { db } from '@/firebase'
import HomeLayout from '@/layout/HomeLayout'
import { chatGptKey, dIdKey } from '@/utils'
import axios from 'axios'
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FiUser } from 'react-icons/fi'
import { useSelector } from 'react-redux'

const Generate = () => {
    const [title, setTitle] = useState('')
    const [loadingTitle, setLoadingTitle] = useState(false);
    const [generated, setGenerated] = useState(false);
    const [activeProfile, setActiveProfile] = useState(0);
    const [videoId, setVideoId] = useState('');
    const router = useRouter();
    const [loadingGenerate, setLoadingGenerate] = useState(false);
    const { user } = useSelector(state => state.auth)
    const systemPromptForTitle = "how can this question be asked better make this a better question title"
    const systemPromptForGenerate = "Explain to me with text only, don't use words like straight ahead, print the answer immediately";
    const createBetterTitle = async () => {
        setLoadingTitle(true)
        const response = await axios.post(`https://api.openai.com/v1/chat/completions`, {
            "model": "gpt-3.5-turbo",
            "messages": [
                { "role": "system", "content": systemPromptForTitle },
                { "role": "user", "content": title }
            ]
        }, {
            headers: {
                "Authorization": `Bearer ${chatGptKey}`
            }
        }).then(data => {
            setTitle(data.data.choices[0].message.content);
        }).catch(err => {
            toast.error("Something went wrong");
        }).finally(() => {
            setLoadingTitle(false)
        })
    }
    const generateNewVideo = async () => {
        setLoadingGenerate(true)
        const response = await axios.post(`https://api.openai.com/v1/chat/completions`, {
            "model": "gpt-3.5-turbo",
            "messages": [
                { "role": "system", "content": systemPromptForGenerate },
                { "role": "user", "content": title }
            ]
        }, {
            headers: {
                "Authorization": `Bearer ${chatGptKey}`
            }
        }).then(data => {
            console.log(data);
            let result = data.data.choices[0].message.content;
            axios.post('https://api.d-id.com/talks', {
                "script": {
                    "type": "text",
                    "input": result
                },
                "source_url": profilesPhotos[activeProfile],
            }, {
                headers: {
                    "Authorization": `Basic ${dIdKey}`
                }
            }).then(async(data) => {
                setVideoId(data.data.id)
                axios.get(`https://api.d-id.com/talks/${data.data.id}`, {
                    headers: {
                        "Authorization": `Basic ${dIdKey}`
                    }
                }).then(data => {
                    console.log(data);
                    updateDoc(doc(db, "userVideos", user.uid), {
                        videos: arrayUnion({
                            videoId: data.data.id,
                            title: title,
                            presenter: profilesPhotos[activeProfile],
                            createdAt: Timestamp.now()
                        })
                    }).then(() => {
                        setLoading(false);
                        setVideoId(data.data.id)
                        toast.success('Video Generated Successfully')
                    }).catch(err => {
                        console.log(err);
                    }).finally(() => {
                        setLoadingGenerate(false)
                    })
                }).catch(err => {
                    console.log(err);
                    toast.error('Something went wrong')
                    setLoadingGenerate(false)
                })
            })
        }).catch(err => {
            toast.error('Something went wrong')
            console.log(err);
            setLoadingGenerate(false)
        })
    }
    return (
        <HomeLayout>
            <div className='max-w-7xl mx-auto mt-14'>
                <h1 className='text-3xl tracking-wide'>Generate Video</h1>
                <p className='pt-1 font-medium text-blue-300'>Produce and share your videos with AI support, unleash your creativity with ease!</p>
                <div className='create-video mt-20'>
                    <div className='flex flex-col items-start gap-y-5'>
                        <label htmlFor='title' className='text-xl font-semibold'>Vhats your video about ?</label>
                        <div className='flex items-center gap-x-3'>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type='text'
                                className="w-96 h-10 pl-2 rounded-md bg-white bg-opacity-10 outline-none"
                            />
                            <p className='font-medium text-yellow-300 hover:bg-white hover:bg-opacity-10 rounded-full px-2 py-2 cursor-pointer'>
                                {loadingTitle ? <span className='animate-pulse'>Loading..</span> : <span onClick={createBetterTitle}>Better Title</span>}
                            </p>
                        </div>
                    </div>
                    <div className='profiles my-8'>
                        <div className='text-white font-medium flex items-center gap-x-1.5'>
                            <FiUser size={20} />
                            <span>Choose a presenter</span>
                        </div>
                        <div className='flex gap-5 mt-5'>
                            {profilesPhotos.map((url, index) => {
                                return (
                                    <Image
                                        src={url}
                                        width={80}
                                        height={80}
                                        onClick={() => setActiveProfile(index)}
                                        alt='profile'
                                        className='rounded-full'
                                        style={{
                                            border: activeProfile === index ? '3px solid #00B4D8' : 'none'
                                        }}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <button onClick={generateNewVideo} className="px-3 py-1.5 rounded-md mt-5 bg-blue-300 text-black font-medium">
                        {loadingGenerate ? <span className='animate-pulse'>Generating..</span> : <span>Generate</span>}
                    </button>
                </div>
                {
                    generated && <button onClick={() => router.push(`/video-details/${videoId}`)} className="w-40 h-9 rounded-md mt-5 bg-blue-100 text-black font-medium">
                        Go To Video
                    </button>
                }
            </div>
        </HomeLayout>
    )
}

export default Generate