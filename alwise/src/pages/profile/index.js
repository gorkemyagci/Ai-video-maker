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
    const [subscriptions, setSubscriptions] = React.useState(null);
    const [creditCards, setCreditCards] = React.useState([])
    const CreditCard = () => {
        if (user && user.uid) {
             onSnapshot(doc(db, "creditCards", user?.uid), (data) => {
                if (data.exists()) {
                    setCreditCards(data.data().cards);
                }
            });
        }
    }
    const unSub = user && user.uid && onSnapshot(doc(db, "users", user?.uid), (data) => {
        if (data.exists()) {
            setSubscriptions(data.data().subscriptions);
            setUserName(data.data().username);
        }
        CreditCard && CreditCard();
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
                    {subscriptions !== 'free' ? <div className='h-12 rounded-sm flex items-center justify-between pl-5 pr-2 bg-alwise w-1/2'>
                        <div className='flex items-center gap-x-2'>
                            <p className='font-semibold text-lg text-black capitalize'>{subscriptions}</p>
                            <span className='text-black'>|</span>
                            <p className='font-semibold text-lg text-black'>10 Credit Left</p>
                        </div>
                        <button className='bg-yellow-400 rounded-md px-3 text-black h-10 font-medium text-sm'>Upradge Plan</button>
                    </div> : <div className='h-12 rounded-sm flex items-center justify-between pl-5 pr-2 bg-alwise w-1/2'>
                        <p className='font-semibold text-lg text-black'>Your subscriptions is free</p>
                        <button className='bg-yellow-400 rounded-md px-3 text-black h-10 font-medium text-sm'>Upradge Plan</button>
                    </div>}
                </div>
                {creditCards.length !== 0 ? <CreditCardPage creditCards={creditCards} /> : <AddCreditCard subscriptions={subscriptions} creditCards={creditCards} />}
            </div>
        </HomeLayout>
    )
}

export default Profile