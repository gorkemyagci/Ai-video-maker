import { chatGptKey } from '@/utils';
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

const VideoInformation = ({ template, setTemplate, templates, setForm }) => {
    const [loadingTitle, setLoadingTitle] = useState(false);
    const [value, setValue] = useState('how do rabbits spend their day');
    let enable = value && template
    const systemPromptForTitle = "how can this question be asked better make this a better question title"
    const createBetterTitle = async () => {
        setLoadingTitle(true)
        const response = await axios.post(`https://api.openai.com/v1/chat/completions`, {
            "model": "gpt-3.5-turbo",
            "messages": [
                { "role": "system", "content": systemPromptForTitle },
                { "role": "user", "content": value }
            ]
        }, {
            headers: {
                "Authorization": `Bearer ${chatGptKey}`
            }
        }).then(data => {
            setValue(data.data.choices[0].message.content);
        }).catch(err => {
            toast.error("Something went wrong");
        }).finally(() => {
            setLoadingTitle(false)
        })
    }
    return (
        <div className='flex flex-col items-start gap-y-14'>
            <div className='flex flex-col items-start gap-y-1'>
                <h1 className='text-4xl font-semibold'>Create a free AI video</h1>
                <p className='text-gray-300 font-medium text-sm'>Select a template & edit your script. Political, sexual and discriminatory content will not be approved.</p>
            </div>
            <div className='template'>
                <div className='flex items-center gap-x-3'>
                    <span className='w-10 h-10 items-center justify-center flex rounded-full bg-white bg-opacity-10'>1</span>
                    <h2 className='font-semibold'>Select Template</h2>
                </div>
                <div className='templates flex items-center my-7 flex-wrap gap-x-4 w-80'>
                    {templates?.map((item, index) => {
                        return (
                            <>
                                <div key={index} onClick={() => {
                                    setTemplate(item.name)
                                }} className='px-3 py-1.5 cursor-pointer rounded-full bg-alwise' style={{
                                    background: item.name === template ? 'rgb(202,232,255)' : '#1F2937',
                                    color: item.name === template ? '#000' : 'white'
                                }}>
                                    <p className='font-medium'>{item.name}</p>
                                </div >
                            </>
                        )
                    })}
                </div>
            </div>
            <div className='ask-question'>
                <div className='flex items-center gap-x-3'>
                    <span className='w-10 h-10 items-center justify-center flex rounded-full bg-white bg-opacity-10'>2</span>
                    <h2 className='font-semibold'>What's your question?</h2>
                </div>
                <div className='flex items-center gap-x-5 my-7'>
                    <input
                        type='text'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className='w-80 h-10 rounded-lg px-3 bg-white bg-opacity-10 outline-none'
                    />
                    <p className='font-medium text-yellow-300 hover:bg-white hover:bg-opacity-10 rounded-full px-2 py-2 cursor-pointer'>
                        {loadingTitle ? <span className='animate-pulse'>Loading..</span> : <span onClick={createBetterTitle}>Better Title</span>}
                    </p>
                </div>
                <button onClick={() => setForm(true)} className='w-full bg-alwise py-2 font-semibold rounded-full text-black disabled:bg-opacity-50' disabled={!enable}>Next</button>
            </div>
        </div>
    )
}

export default VideoInformation