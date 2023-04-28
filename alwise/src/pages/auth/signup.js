import { auth, db } from '@/firebase'
import HomeLayout from '@/layout/HomeLayout'
import { login } from '@/stores/auth'
import axios from 'axios'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from 'firebase/auth'
import { Timestamp, doc, setDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { FcGoogle } from 'react-icons/fc'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();
    let enable = email && password.length >= 6 && confirmPassword.length >= 6 && username;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match")
        } else {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            if (user) {
                try {
                    const ref = doc(db, "users", user.uid);
                    setDoc(ref, {
                        uid: user.uid,
                        email: user.email,
                        username: username,
                        creditLeft: 0,
                        subscriptions: 'free',
                        createdAt: Timestamp.now(),
                    });
                    await setDoc(doc(db, "userVideos", user.uid), {});
                    await setDoc(doc(db, "creditCards", user.uid), {
                        cards: []
                    });
                    toast.success("Account created successfully")
                    router.push('/auth/login')
                } catch (err) {
                    toast.error("Something went wrong")
                    console.log(err.message);
                }
            } else {
                toast.error("Something went wrong")
            }
        }
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

    const signInWithGoogle = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        auth.languageCode = 'tr'
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
                if (result.user) {
                    router.push(`/pay?email=${result.user.email}`);
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <HomeLayout>
            <div className='flex w-full justify-center mt-20 items-center'>
                <div className='max-w-lg w-96'>
                    <h1 className='text-3xl font-semibold text-center'>Sign up,</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center pt-14 gap-y-14 w-full'>
                        <div className='flex flex-col gap-y-5 w-full'>
                            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='User name' className='outline-none bg-white bg-opacity-10 rounded-md pl-2 h-12 placeholder:font-medium placeholder:text-sm w-full' />
                            <input type='text' value={email} onChange={(e) => inputChangeHandler(e)} placeholder='Email' className='outline-none bg-white bg-opacity-10 rounded-md pl-2 h-12 placeholder:font-medium placeholder:text-sm w-full' />
                            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='outline-none bg-white bg-opacity-10 rounded-md pl-2 h-12 placeholder:font-medium placeholder:text-sm w-full' />
                            <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm password' className='outline-none bg-white bg-opacity-10 h-12 rounded-md pl-2 placeholder:font-medium placeholder:text-sm w-full' />
                            <div className='flex flex-col gap-y-1'>
                                <span className='text-xs text-gray-300 text-right'>Şifre minumum 6 karakter olmalıdır.</span>
                                <span className='text-sm text-right text-red-400 font-medium'>{error && error}</span>
                            </div>
                        </div>
                        <button type='submit' disabled={!enable} className='bg-blue-300 cursor-pointer rounded-full w-full font-semibold disabled:pointer-events-none text-black py-2'>
                            Sign up
                        </button>
                    </form>
                    <button onClick={signInWithGoogle} className='bg-white mt-2 w-full text-[15px] border border-black py-2.5 rounded-full flex justify-center items-center gap-x-3'>
                        <FcGoogle size={22} />
                        <span className='font-semibold text-black text-opacity-60 text-sm'>Google ile devam edin</span>
                    </button>
                    <p className='text-center pt-4 text-sm text-white text-opacity-80'>Already have an account? <span className='text-white pl-2 cursor-pointer underline' onClick={() => router.push('/auth/login')}>Login</span></p>
                </div>
            </div>
        </HomeLayout>
    )
}

export default SignUp