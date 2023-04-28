import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GiExitDoor } from 'react-icons/gi';
import { logout } from '@/stores/auth';
import { toast } from 'react-hot-toast';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import Image from 'next/image';
import brand from '../../../public/alwise_logo.png'
import Link from 'next/link';
import { RiArrowDropDownLine } from 'react-icons/ri';

const Header = () => {
  const router = useRouter();
  const [username, setUserName] = useState('');
  const { user } = useSelector(state => state.auth)
  const [profileDetail, setProfileDetail] = useState(false);
  const unSub = user && user.uid && onSnapshot(doc(db, "users", user?.uid), (data) => {
    if (data.exists()) {
      setUserName(data.data().username);
    }
  })
  useEffect(() => {
    return () => {
      unSub && unSub();
    }
  }, []);
  const dispatch = useDispatch();
  return (
    <div className='w-full px-20 py-5 items-center flex justify-between' style={{
      borderBottom: user ? '1px solid #ffffff20' : 'none'
    }}>
      <div onClick={() => router.push('/')} className='cursor-pointer relative flex items-center'>
        <Image
          src={brand}
          alt="Alwise Logo"
          width={100}
          height={100}
        />
        <h1 className='absolute -right-9 font-medium text-2xl'>Alwise</h1>
      </div>
      {
        user ? <>
          <div className='relative flex items-center'>
            <button onClick={() => setProfileDetail(!profileDetail)} className='text-white px-5 gap-x-2 font-medium py-1 flex items-center justify-center rounded-full'>
              <span>{username}</span>
              <RiArrowDropDownLine size={22} className={`${profileDetail ? 'rotate-180' : ''}`} />
            </button>
            <div style={{
              display: profileDetail ? 'block' : 'none'
            }} className='absolute top-full bg-[#333333] w-52 z-50 right-0 mt-4 rounded-md'>
              <ul className='flex flex-col items-start pl-2.5 gap-y-2 text-base text-white font-medium py-2'>
                <li onClick={() => router.push('/profile')} className='cursor-pointer hover:ml-2 text-base transition-all duration-150 ease-in-out'>
                  Profile
                </li>
                <li onClick={() => router.push('/settings')} className='cursor-pointer hover:ml-2 text-base transition-all duration-150 ease-in-out'>
                  Settings
                </li>
                <li onClick={() => {
                  dispatch(logout());
                  toast.success("Logged out successfully!");
                  router.push('/');
                }} className='text-red-400 font-medium group duration-200 cursor-pointer flex items-center gap-x-2'>
                  <GiExitDoor size={20} />
                  <span className='group-hover:ml-2 transition-all duration-200'>Çıkış Yap</span>
                </li>
              </ul>
            </div>
          </div>
        </> :
          <>
            <ul className='flex items-center gap-x-5'>
              <li onClick={() => router.push('/pricing')} className='cursor-pointer transition-all duration-150 ease-in-out text-lg'>
                Pricing
              </li>
              <span className='text-gray-500'>|</span>
              <li onClick={() => router.push('/about')} className='cursor-pointer transition-all duration-150 ease-in-out text-lg'>
                About Us
              </li>
              <span className='text-gray-500'>|</span>
              <li onClick={() => router.push('/contact')} className='cursor-pointer transition-all duration-150 ease-in-out text-lg'>
                Contact
              </li>
            </ul>
            <div className='flex items-center justify-between gap-x-20'>
              <div className='flex items-center gap-x-5'>
                <button onClick={() => router.push('/auth/login')} className='border-2 border-[#CAE8FF] px-5 hover:bg-[#CAE8FF] hover:text-black hover:font-medium transition-all duration-200 cursor-pointer py-1 rounded-full'>
                  Log in
                </button>
                <button onClick={() => router.push('/auth/signup')} className='border-2 border-[#CAE8FF] px-5 hover:bg-[#CAE8FF] hover:text-black hover:font-medium transition-all duration-200 cursor-pointer py-1 rounded-full'>
                  Create Account
                </button>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default Header