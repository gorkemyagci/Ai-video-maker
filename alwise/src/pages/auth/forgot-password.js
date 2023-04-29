import { auth } from '@/firebase';
import HomeLayout from '@/layout/HomeLayout'
import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false);
    const inputChangeHandler = (e) => {
        const value = e.target.value;
        setEmail(e.target.value);
        if (
            !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
                value
            )
        ) {
            setError(true)
        } else {
            setError(false)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (email) {
            if (error) {
                toast.error('Please enter a valid email address')
            } else {
                sendPasswordResetEmail(auth, email)
                    .then((data) => {
                        toast.success('Password reset email sent');
                    })
                    .catch((error) => {
                        if (error.message === 'Firebase: Error (auth/user-not-found).') {
                            toast.error('User not found');
                        } else {
                            toast.error('Something went wrong');
                        }
                    });
            }
        } else {
            toast.error('Please enter your email address')
        }
    }
    return (
        <HomeLayout>
            <div className='w-full h-[100vh-76px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <h1 className='text-white text-3xl text-center'>Forgot Password</h1>
                <form onSubmit={handleSubmit} className='mt-20 max-w-[400px] mx-auto'>
                    <div className='flex flex-col gap-y-10'>
                        <input type='text' value={email} onChange={(e) => inputChangeHandler(e)} placeholder='Email' className='outline-none bg-white bg-opacity-10 rounded-md pl-2 h-12 placeholder:font-medium placeholder:text-sm w-full' />
                        <button type='submit' className={`rounded-full transition-all duration-200 border-2 w-full font-semibold text-white py-3 ${error ? 'border-red-400' : 'border-alwise'}`}>Send</button>
                    </div>
                    <div className='mt-5 w-full text-right'>
                        <Link href={"/auth/login"} className='text-center mt-10 text-lg font-medium underline'>Back to login</Link>
                    </div>
                </form>
            </div>
        </HomeLayout>
    )
}

export default ForgotPassword