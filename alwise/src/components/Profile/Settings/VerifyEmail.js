import { auth } from '@/firebase';
import { sendEmailVerification } from 'firebase/auth';
import React from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const VerifyEmail = () => {
    const { user } = useSelector((state) => state.auth);
    const emailVerify = () => {
        sendEmailVerification(auth.currentUser).then(() => {
            toast.success('Verification email sent')
        }).catch(err => {
            toast.error('Verification email failed to send')
            console.log(err);
        })
    }
    return (
        <>
            {!user?.emailVerified &&
                <div className='bg-yellow-400 flex w-96 py-1 rounded-sm px-3 mt-5'>
                    <div className='flex justify-between w-full h-10 items-center'>
                        <p className='text-red-500 font-semibold text-xl'>Email not verified</p>
                        <button onClick={emailVerify} className='h-full px-3 rounded-md text-white font-semibold bg-black'>Verify</button>
                    </div>
                </div>
            }
        </>
    )
}

export default VerifyEmail