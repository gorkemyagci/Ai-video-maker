import HomeLayout from '@/layout/HomeLayout'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import contact from '../../../public/contact.png'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const Contact = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const handleSend = (e) => {
        e.preventDefault();
        setLoading(true);
        if (fullName && email && message && !error) {
            const ref = doc(db, "contact", email);
            setDoc(ref, {
                email: email,
                fullName: fullName,
                message: message,
                createdAt: Timestamp.now(),
            });
            toast.success("Message sent successfully");
            setEmail('');
            setFullName('');
            setMessage('');
        } else {
            if(fullName && email && message){
                toast.error("Something went wrong")
            } else {            
                toast.error("Please fill all the fields")
            }
        }
        setLoading(false);
    }
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
        <>
            <HomeLayout>
                <div className='w-full h-80 flex items-center justify-center'>
                    <div className='flex flex-col items-center gap-y-5'>
                        <p className='font-medium text-gray-400'>Home <span className='text-white'> / </span><span className='text-white text-lg font-semibold'>Contact</span></p>
                        <h1 className='text-6xl'>Contact</h1>
                    </div>
                </div>
                <div className='bg-white w-full'>
                    <div className='flex items-end w-5/6 ml-auto justify-between flex-row-reverse'>
                        <Image
                            src={contact}
                            alt="Contact"
                            width={620}
                            height={620}
                        />
                        <form onSubmit={handleSend} className='py-10'>
                            <div className='flex flex-col items-start gap-y-2'>
                                <h1 className='font-semibold text-3xl text-black'>Send Message</h1>
                                <p className='text-gray-400 text-sm font-medium'>Sitemiz hakkında herhangi bir sorunuz, öneriniz veya geri bildiriminiz mi var? Lütfen aşağıdaki formu doldurarak bizimle iletişime geçin. Size en kısa sürede geri dönüş yapacağız.</p>
                            </div>
                            <div className='flex flex-col items-start gap-y-2 mt-5'>
                                <label className='text-gray-400 text-sm font-medium'>Full Name</label>
                                <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} className='w-96 text-black font-medium h-10 border-2 border-gray-300 rounded-md px-2' />
                            </div>
                            <div className='flex flex-col items-start gap-y-2 mt-5'>
                                <label className='text-gray-400 text-sm font-medium'>Email</label>
                                <input type='text' value={email} onChange={(e) => inputChangeHandler(e)} className='w-96 text-black font-medium h-10 border-2 border-gray-300 rounded-md px-2' />
                                <span className='text-red-400'>{error && error}</span>
                            </div>
                            <div className='flex flex-col items-start gap-y-2 mt-5'>
                                <label className='text-gray-400 text-sm font-medium'>Message</label>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className='w-96 h-40 text-black font-medium border-2 border-gray-300 rounded-md px-2' />
                            </div>
                            <button type='submit' className='bg-alwise text-black px-5 py-2 font-medium rounded-md mt-5'>Send</button>
                        </form>
                    </div>
                </div>
            </HomeLayout>
        </>
    )
}


export default Contact
