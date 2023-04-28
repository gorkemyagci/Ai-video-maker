import { auth } from '@/firebase';
import HomeLayout from '@/layout/HomeLayout'
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ChangePassword = () => {
    const { user } = useSelector(state => state.auth)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const auth = getAuth();

    const resetPassword = () => {
        if (!password || !confirmPassword) {
            toast.error("Please fill all fields")
        } else {
            if (!user.emailVerified) {
                toast.error('You have to verify email to edit!');
            } else {
                if (password.length < 6) {
                    toast.error("Password must be at least 6 characters")
                } else {
                    if (password !== confirmPassword) {
                        toast.error("Password and confirm password must be the same")
                    } else {
                        updatePassword(user, password).then(data => {
                            toast.success("Update password success")
                            setPassword("")
                            setConfirmPassword("")
                        }
                        ).catch(err => {
                            toast.error("Update password failed")
                        }
                        )
                    }
                }
            }
        }
    }
    return (
        <HomeLayout>
            <div className='flex w-full justify-center items-center flex-col gap-y-14 mt-10'>
                <h2 className='text-alwise text-2xl font-semibold'>Update Password</h2>
                <div className='flex flex-col items-end w-96 gap-y-5'>
                    <div className='flex items-start w-full gap-y-5 flex-col'>
                        <label className='font-medium' htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='w-full h-10 rounded-lg px-3 bg-white bg-opacity-10 outline-none' name="password" id="password" />
                    </div>
                    <div className='flex items-start w-full gap-y-3 flex-col'>
                        <label className='font-medium' htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className='w-full h-10 rounded-lg px-3 bg-white bg-opacity-10 outline-none' name="confirmPassword" id="confirmPassword" />
                    </div>
                    <button onClick={resetPassword} className='bg-alwise transition-all duration-150 cursor-pointer w-full flex justify-center items-center mt-8 rounded-sm text-black font-semibold text-right py-2'>Save</button>
                    {!user?.emailVerified && <div className='flex flex-col items-end'>
                        <p className='text-sm text-right pt-2 text-yellow-400 font-medium'>You have to verify email to edit!</p>
                        <span className='pt-1 text-xs font-medium'>If you have verified the email, sign in again</span>
                    </div>}
                </div>
            </div>
        </HomeLayout>
    )
}

export default ChangePassword