import React, { useState } from 'react'

const Form = ({ setForm }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    let enable = !error && fullName && email;
    const inputChangeHandler = (e) => {
        const value = e.target.value;
        setEmail(e.target.value);
        if (
            !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
                value
            )
        ) {
            setError("Please enter a valid email address")
        } else {
            setError("")
        }
    }
    return (
        <div>
            <div className='flex flex-col gap-y-1'>
                <h2 className='font-semibold text-3xl'>You'll get your video via email in minutes</h2>
                <p className='text-sm font-medium text-gray-300'>Please note: political, sexual, criminal and discriminatory content will not be tolerated or approved</p>
            </div>
            <div className='flex flex-col gap-y-5 my-10'>
                <input
                    type='text'
                    placeholder='Full Name'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className='w-96 h-12 rounded-lg px-3 bg-white bg-opacity-10 outline-none'
                />
                <input
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => inputChangeHandler(e)}
                    className='w-96 h-12 rounded-lg px-3 bg-white bg-opacity-10 outline-none'
                />
                <p className='text-sm font-medium text-red-400'>{error && error}</p>
                <div className='flex flex-col gap-y-3 my-5'>
                    <label className='text-white block font-semibold text-xl mb-2' htmlFor="how-did-you-hear-about-alwise">How did you hear about Alwise?</label>
                    <div class="relative inline-block w-96 text-white">
                        <select className='block appearance-none w-full bg-white bg-opacity-10 border border-alwise text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none' id="how-did-you-hear-about-alwise" name="how-did-you-hear-about-alwise">
                            <option value="friend">From a friend</option>
                            <option value="tiktok">LinkedIn</option>
                            <option value="instagram">Instagram</option>
                            <option value="instagram">Youtube</option>
                            <option value="other">Other</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                            <svg class="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M10 12l-5-5 1.41-1.41L10 9.18l4.59-4.59L15 7l-5 5z" /></svg>
                        </div>
                    </div>
                </div>
                <div className='w-96 flex items-center justify-between'>
                    <button onClick={() => setForm(false)} className='border-2 border-alwise text-white px-3 rounded-full py-2 font-semibold'>Go back</button>
                    <button disabled={!enable} className='border-2 bg-alwise border-alwise text-black px-3 rounded-full py-2 font-semibold'>Generate Video</button>
                </div>
            </div>
        </div>
    )
}

export default Form