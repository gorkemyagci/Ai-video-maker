import Favorites from '@/components/FavoriteVideos/Favorites';
import AddCreditCard from '@/components/Profile/AddCreditCard';
import CreditCardPage from '@/components/Profile/CreditCard';
import { db } from '@/firebase';
import HomeLayout from '@/layout/HomeLayout'
import { doc, onSnapshot } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {
    const { user } = useSelector(state => state.auth);
    const [userName, setUserName] = React.useState("");
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
    return (
        <HomeLayout>
            <div className='py-10 max-w-7xl mx-auto'>
                <div className='flex flex-col items-start gap-y-5'>
                    <h2 className='text-3xl font-semibold'>Merhaba, <span className='text-alwise'>{userName}</span><span className='pl-4'>👋🏻</span></h2>
                </div>
            </div>
            <Favorites/>
        </HomeLayout>
    )
}

export default Profile