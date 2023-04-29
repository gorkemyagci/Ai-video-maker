import { auth, db } from '@/firebase'
import HomeLayout from '@/layout/HomeLayout'
import { login } from '@/stores/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("");
    const [subscriptions, setSubscriptions] = useState();
    let enable = email && password.length >= 6 && error === "";
    const unSub = (user) => {
        if (user && user.uid) {
            onSnapshot(doc(db, "users", user?.uid), (data) => {
                if (data.exists()) {
                    if (data.data().subscriptions) {
                        dispatch(login(user))
                        toast.success("Logged in successfully")
                        router.push('/')
                    } else {
                        router.push(`/pay?email=${user.email}`)
                    }
                }
            })
        }
    }
    const dispatch = useDispatch();
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { user } = signInWithEmailAndPassword(auth, email, password).then(data => {
            if (data.user) {
                unSub(data.user);
            }
        }).catch(err => {
            toast.error('Something went wrong')
            console.log(err);
        })
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
        <HomeLayout>
            <div className='flex w-full justify-center mt-20 items-center'>
                <div className='max-w-lg w-96 flex flex-col justify-center h-full'>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center pt-14 gap-y-14 w-full'>
                        <h1 className='text-3xl font-semibold text-center'>Login,</h1>
                        <div className='flex flex-col gap-y-6 w-full'>
                            <input type='text' value={email} onChange={(e) => inputChangeHandler(e)} placeholder='Email' className='outline-none bg-white bg-opacity-10 rounded-md pl-2 h-12 placeholder:font-medium placeholder:text-sm w-full' />
                            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='outline-none bg-white bg-opacity-10 rounded-md pl-2 h-12 placeholder:font-medium placeholder:text-sm w-full' />
                            <div className='flex flex-col gap-y-1'>
                                <Link href={"/auth/forgot-password"} className='text-sm pb-1 underline text-white text-right'>Forgot Password</Link>
                                <span className='text-xs text-gray-300 text-right'>Password must be at least 6 characters.</span>
                                <span className='text-sm text-right text-red-400 font-medium'>{error && error}</span>
                            </div>
                        </div>
                        <button type='submit' disabled={!enable} className='bg-blue-300 rounded-full w-full font-semibold disabled:pointer-events-none text-black py-2'>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Login