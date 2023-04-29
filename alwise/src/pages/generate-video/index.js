import VoiceId from '@/data/VoiceId'
import profilesPhotos from '@/data/profilesPhotos'
import { db } from '@/firebase'
import HomeLayout from '@/layout/HomeLayout'
import { apiKey, chatGptKey, dIdKey } from '@/utils'
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
    const [videoId, setVideoId] = useState('');
    const [activeLanguage, setActiveLanguage] = useState('Turkish');
    const [actorId, setActorId] = useState('');
    const [voiceId, setVoiceId] = useState('');
    const { user } = useSelector(state => state.auth);
    const router = useRouter();
    const [loadingGenerate, setLoadingGenerate] = useState(false);
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
            let result = data.data.choices[0].message.content;
            console.log(actorId);
            axios.post('https://api.synthesia.io/v2/videos', {
                "test": true,
                "title": title,
                "description": title,
                "visibility": "public",
                "ctaSettings": { "label": "Click me!", "url": "https://www.synthesia.io" },
                "callbackId": "email@example.com",
                "input": [{
                    "scriptText": result,
                    "avatar": actorId,
                    "avatarSettings": {
                        "voice": voiceId,
                        "horizontalAlign": "center",
                        "scale": 1.0, "style": "rectangular"
                    },
                    "background": "off_white"
                }],
                "soundtrack": "urban"
            }, {
                headers: {
                    'Authorization': `${apiKey}`
                }
            }).then(data => {
                console.log(data);
                updateDoc(doc(db, "userVideos", user.uid), {
                    videos: arrayUnion({
                        videoId: data.data.id,
                        title: title,
                        presenter: actorId,
                        language: activeLanguage,
                        liked: false,
                        createdAt: Timestamp.now()
                    })
                })
                toast.success('Video started generating');
                router.push('/')
            }).catch(err => {
                console.log(err);
                toast.error('Something went wrong')
            }).finally(() => {
                setLoadingGenerate(false)
            })
        }).catch(err => {
            toast.error('Something went wrong')
            console.log(err);
            setLoadingGenerate(false)
        })
    }

    const originalArray = VoiceId.map(item => item.country);
    const uniqueArray = originalArray.filter((item, index, self) => self.indexOf(item) === index);

    const filteredVoices = VoiceId.filter(item => item.country === activeLanguage);

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
                            {profilesPhotos.map((item, index) => {
                                return (
                                    <p
                                        onClick={() => setActorId(item.actorId)}
                                        className='rounded-full px-5 py-1 cursor-pointer'
                                        style={{
                                            border: actorId === item.actorId ? '3px solid #00B4D8' : 'none'
                                        }}
                                    >{item.name}</p>
                                )
                            })}
                        </div>
                    </div>
                    <div className='voices my-8'>
                        <div className='text-white font-medium flex items-center gap-x-1.5'>
                            <FiUser size={20} />
                            <span>Choose a voice</span>
                        </div>
                        <div className='flex gap-5 mt-5'>
                            {uniqueArray.map(item => {
                                return (
                                    <p onClick={() => {
                                        setActiveLanguage(item);
                                    }} className='px-3 py-2 rounded-md bg-white bg-opacity-10 cursor-pointer' style={{
                                        border: activeLanguage === item ? '3px solid #00B4D8' : 'none'
                                    }}>{item}</p>
                                )
                            })}
                        </div>
                        <div className='flex gap-5 mt-5'>
                            {filteredVoices.map(item => {
                                return (
                                    <p onClick={() => {
                                        setVoiceId(item.voiceId);
                                    }} className='px-3 py-1 rounded-md cursor-pointer' style={{
                                        background: voiceId === item.voiceId ? '#fff' : 'none',
                                        color: voiceId === item.voiceId ? '#000' : '#fff'
                                    }}>{item.title}</p>
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