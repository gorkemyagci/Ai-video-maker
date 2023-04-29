import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const { user } = useSelector(state => state.auth);
    const favoritesRef = useRef();
    const router = useRouter();
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    const unSub = user && user.uid && onSnapshot(doc(db, "userVideos", user?.uid), (data) => {
        if (data.exists()) {
            setFavorites(data.data().videos.filter(item => item.liked));
        }
    })

    useEffect(() => {
        return () => {
            unSub && unSub();
        }
    }, []);
    useEffect(() => {
        const isEnd = favoritesRef.current.offsetWidth + favoritesRef.current.scrollLeft == favoritesRef.current.scrollWidth;
        setNext(!isEnd);
        favoritesRef.current.addEventListener('scroll', () => {
            const isEnd = favoritesRef.current.offsetWidth + favoritesRef.current.scrollLeft == favoritesRef.current.scrollWidth;
            const isBeging = favoritesRef.current.scrollLeft == 0;
            setPrev(!isBeging);
            setNext(!isEnd);
        })
    }, [favoritesRef])
    const slideFavoritesNext = () => {
        favoritesRef.current.scrollLeft += favoritesRef.current.offsetWidth - 300;
    }
    const slideFavoritesPrev = () => {
        favoritesRef.current.scrollLeft -= favoritesRef.current.offsetWidth - 300;
    }
    return (
        <div className='mx-auto max-w-7xl my-14'>
            <h2 className='text-3xl text-white font-semibold border-b pb-2 border-alwise border-opacity-75 tracking-wide'>Favorite Videos</h2>
            <div className='relative w-full'>
                {prev && <button onClick={slideFavoritesPrev} className="rounded-full absolute hover:scale-[1.06] -left-14 bg-white bg-opacity-10 z-10 top-1/2 -translate-y-1/2 w-12 h-12 flex justify-center items-center text-white"><HiOutlineArrowLeft /></button>}
                {next && <button onClick={slideFavoritesNext} className="absolute hover:scale-[1.06] -right-14 bg-white bg-opacity-10 z-10 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 flex justify-center items-center text-white"><HiOutlineArrowRight /></button>}
                <ScrollContainer innerRef={favoritesRef} className='flex scrollable overflow-x gap-x-6 mt-10'>
                    {favorites.map((item, index) => {
                        return (
                            <div onClick={() => router.push(`/video-details/${item?.videoId}`)} key={index} className='flex-shrink-0 relative border-2 border-white border-opacity-20 rounded-lg p-2 w-72 cursor-pointer'>
                                <div className='flex flex-col items-start h-full justify-between gap-y-3'>
                                    <h3 className='text-white text-lg font-semibold'>{item.title}</h3>
                                    <p className='text-gray-400 text-sm'>{new Date(item?.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )
                    })}
                </ScrollContainer>
            </div>
        </div>
    )
}

export default Favorites