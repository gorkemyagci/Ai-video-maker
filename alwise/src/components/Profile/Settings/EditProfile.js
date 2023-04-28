import { auth, db } from '@/firebase';
import { updateEmail, updateProfile } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import avatar_photo from '../../../../public/avatar.png'
import { RiEditBoxLine } from 'react-icons/ri'
import { GiCancel } from 'react-icons/gi'
import { toast } from 'react-hot-toast';

const EditProfile = () => {
    const { user } = useSelector((state) => state.auth);
    console.log(user);
    const [avatar, setAvatar] = useState(avatar_photo)
    const [email, setEmail] = useState(user?.email)
    const [emailError, setEmailError] = useState("")
    const [enable, setEnable] = useState(false);
    const [username, setUsername] = useState('');
    const unSub = user && user.uid && onSnapshot(doc(db, "users", user?.uid), (data) => {
        if (!enable) {
            if (data.exists()) {
                setUsername(data.data().username);
            }
        }
    })
    const inputChangeHandler = (e) => {
        const value = e.target.value;
        setEmail(e.target.value);
        if (
            !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
                value
            )
        ) {
            setEmailError("Please enter a valid email address")
        } else {
            setEmailError("")
        }
    }
    useEffect(() => {
        unSub && unSub();
    }, [])
    const handleEdit = () => {
        if (!username || !email) {
            toast.error('Please fill all fields')
        } else {
            if (!user.emailVerified) {
                toast.error('You have to verify email to edit!');
            } else {
                if (username.length < 6) {
                    toast.error('Username must be at least 6 characters')
                }
                if (emailError) {
                    toast.error('Email is not valid')
                }
                if (username.length >= 6 && !emailError) {
                    if (email === user?.email) {
                        updateDoc(doc(db, "users", user?.uid), {
                            username: username
                        }).then(data => {
                            toast.success('Update success')
                        }).catch(err => {
                            toast.error("Update failed")
                        })
                    }
                    else {
                        updateEmail(auth.currentUser, email).then(data => {
                            updateDoc(doc(db, "users", user?.uid), {
                                username: username,
                                email: email
                            }).then(data => {
                                toast.success('Update success')
                            }).catch(err => {
                                toast.error("Update failed")
                            })
                        }).catch(err => {
                            toast.error("Try again later")
                        })
                    }
                    setEnable(false)
                }
            }
        }
    }
    return (
        <div className='user-information w-full flex flex-col gap-y-14 justify-center items-center'>
            <div className='image-photo'>
                <Image
                    src={avatar}
                    alt='avatar'
                    width={150}
                    height={150}
                />
            </div>
            <div className='flex relative flex-col w-80 items-end gap-y-6'>
                <span className='absolute flex items-center gap-x-1.5 cursor-pointer right-0 -top-10'>
                    <RiEditBoxLine onClick={() => {
                        setEnable(true)
                    }} size={25} />
                    <GiCancel onClick={() => {
                        setEnable(false)
                        setEmail(user?.email);
                    }} style={{
                        display: enable ? 'inline-block' : 'none'
                    }} size={25} className='text-red-400' />
                </span>

                <div className='w-full'>
                    <input
                        type='text'
                        value={username}
                        disabled={!enable}
                        onClick={() => setUsername("")}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='User name'
                        className='w-full h-12 disabled:text-gray-400 rounded-md outline-none bg-white bg-opacity-10 pl-2'
                    />
                </div>
                <div className='w-full'>
                    <input
                        type='text'
                        value={email}
                        disabled={!enable}
                        onClick={() => setEmail("")}
                        onChange={(e) => inputChangeHandler(e)}
                        placeholder='Email'
                        className='w-full h-12 disabled:text-gray-400 rounded-md outline-none bg-white bg-opacity-10 pl-2'
                    />
                    <p className='text-sm pt-1 text-red-400 font-medium'>{emailError && enable && emailError}</p>
                    {!user?.emailVerified && <div className='flex flex-col items-end'>
                        <p className='text-sm text-right pt-2 text-yellow-400 font-medium'>You have to verify email to edit!</p>
                        <span className='pt-1 text-xs font-medium'>If you have verified the email, sign in again</span>
                        </div>}
                </div>
                <button style={{
                    opacity: enable ? '100' : '0'
                }} onClick={handleEdit} className='bg-alwise transition-all duration-150 cursor-pointer px-6 rounded-sm text-black font-semibold text-right py-2'>Save</button>
            </div>
        </div>
    )
}

export default EditProfile